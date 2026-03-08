import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Trash2, Upload, Eye, EyeOff, ArrowUp, ArrowDown,
  ImageIcon, RefreshCw, X, AlertTriangle, GripVertical,
} from "lucide-react";

type GalleryImage = {
  id: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
};

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadCurrent, setUploadCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<GalleryImage | null>(null);
  const [clearConfirm, setClearConfirm] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<{ file: File; url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = useCallback(async () => {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order");
    setImages(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      ["image/jpeg", "image/png", "image/webp"].includes(f.type)
    );
    if (files.length) addToPreview(files);
    else toast.error("Only JPG, PNG, WEBP images are supported");
  };

  const addToPreview = (files: File[]) => {
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviewFiles((prev) => [...prev, ...newPreviews]);
  };

  const removePreview = (index: number) => {
    setPreviewFiles((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) addToPreview(files);
    e.target.value = "";
  };

  const uploadPreviewed = async () => {
    if (!previewFiles.length) return;
    setUploading(true);
    setUploadTotal(previewFiles.length);
    setUploadCurrent(0);
    setUploadProgress(0);

    let count = 0;
    for (let i = 0; i < previewFiles.length; i++) {
      const { file } = previewFiles[i];
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      setUploadCurrent(i + 1);
      setUploadProgress(Math.round(((i) / previewFiles.length) * 100));

      const { error: uploadError } = await supabase.storage.from("gallery").upload(path, file);
      if (uploadError) { toast.error(`Failed: ${file.name}`); continue; }

      const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);
      await supabase.from("gallery_images").insert({
        image_url: urlData.publicUrl,
        display_order: images.length + count + 1,
      });
      count++;
      setUploadProgress(Math.round(((i + 1) / previewFiles.length) * 100));
    }

    toast.success(`${count} image${count > 1 ? "s" : ""} uploaded!`);
    previewFiles.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviewFiles([]);
    await fetchImages();
    setUploading(false);
    setUploadProgress(0);
  };

  const handleDelete = async (img: GalleryImage) => {
    setDeleting(img.id);
    setDeleteConfirm(null);
    const urlParts = img.image_url.split("/gallery/");
    if (urlParts[1]) {
      await supabase.storage.from("gallery").remove([decodeURIComponent(urlParts[1])]);
    }
    await supabase.from("gallery_images").delete().eq("id", img.id);
    toast.success("Image deleted");
    setDeleting(null);
    fetchImages();
  };

  const toggleActive = async (img: GalleryImage) => {
    await supabase.from("gallery_images").update({ is_active: !img.is_active }).eq("id", img.id);
    toast.success(img.is_active ? "Image hidden" : "Image visible");
    fetchImages();
  };

  const moveOrder = async (img: GalleryImage, direction: "up" | "down") => {
    const idx = images.findIndex((i) => i.id === img.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= images.length) return;
    const other = images[swapIdx];
    await Promise.all([
      supabase.from("gallery_images").update({ display_order: other.display_order }).eq("id", img.id),
      supabase.from("gallery_images").update({ display_order: img.display_order }).eq("id", other.id),
    ]);
    fetchImages();
  };

  const deleteAll = async () => {
    setClearConfirm(false);
    const paths = images
      .map((img) => {
        const parts = img.image_url.split("/gallery/");
        return parts[1] ? decodeURIComponent(parts[1]) : null;
      })
      .filter(Boolean) as string[];
    if (paths.length) await supabase.storage.from("gallery").remove(paths);
    for (const img of images) {
      await supabase.from("gallery_images").delete().eq("id", img.id);
    }
    toast.success("All images deleted");
    fetchImages();
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-gold animate-bounce" />
          <span className="w-2 h-2 rounded-full bg-gold animate-bounce delay-150" />
          <span className="w-2 h-2 rounded-full bg-gold animate-bounce delay-300" />
        </div>
      </div>
    );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg sm:text-xl text-primary tracking-wider">Gallery Management</h2>
          <p className="text-xs text-primary/40 font-body mt-0.5">
            {images.length} images · {images.filter((i) => i.is_active).length} visible on website
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={fetchImages} variant="outline" size="sm" className="border-primary/20 text-primary/60 text-xs">
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
          </Button>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            size="sm"
            className="bg-gold text-emerald-dark hover:bg-gold/90 text-xs flex-1 sm:flex-none"
          >
            <Upload className="w-3.5 h-3.5 mr-1.5" /> Add Images
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileSelect}
          />
          {images.length > 0 && (
            <Button
              onClick={() => setClearConfirm(true)}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Drag & drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
          dragOver
            ? "border-gold bg-gold/10 scale-[1.01]"
            : "border-primary/20 hover:border-primary/40"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className={`w-8 h-8 mx-auto mb-2 transition-colors ${dragOver ? "text-gold" : "text-primary/30"}`} />
        <p className="text-sm text-primary/50 font-body">
          Drag & drop images here, or <span className="text-gold underline">browse</span>
        </p>
        <p className="text-[10px] text-primary/30 font-body mt-1">Supports JPG, PNG, WEBP</p>
      </div>

      {/* Preview staged files */}
      {previewFiles.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-body text-primary/70">
              Ready to upload ({previewFiles.length} image{previewFiles.length > 1 ? "s" : ""})
            </h3>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  previewFiles.forEach((p) => URL.revokeObjectURL(p.url));
                  setPreviewFiles([]);
                }}
                variant="ghost"
                size="sm"
                className="text-primary/40 text-xs"
              >
                Cancel
              </Button>
              <Button
                onClick={uploadPreviewed}
                disabled={uploading}
                size="sm"
                className="bg-gold text-emerald-dark hover:bg-gold/90 text-xs"
              >
                <Upload className="w-3.5 h-3.5 mr-1" />
                {uploading ? "Uploading..." : "Upload All"}
              </Button>
            </div>
          </div>

          {/* Upload progress */}
          {uploading && (
            <div className="space-y-1.5">
              <Progress value={uploadProgress} className="h-2 bg-primary/10" />
              <p className="text-[10px] text-primary/40 font-body text-center">
                Uploading {uploadCurrent} of {uploadTotal} ({uploadProgress}%)
              </p>
            </div>
          )}

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
            {previewFiles.map((pf, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden border border-gold/30 aspect-[3/4]">
                <img src={pf.url} alt="" className="w-full h-full object-cover" />
                {!uploading && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removePreview(i); }}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500/80 flex items-center justify-center text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <div className="absolute bottom-0 inset-x-0 bg-black/60 px-1.5 py-0.5">
                  <p className="text-[8px] text-white/80 truncate font-body">{pf.file.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Existing images grid */}
      {images.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-primary/20 rounded-xl">
          <ImageIcon className="w-10 h-10 text-primary/20 mx-auto mb-3" />
          <p className="text-primary/40 font-elegant text-sm">No images yet. Upload some to get started.</p>
          <p className="text-primary/25 font-body text-[10px] mt-1">The website shows fallback images until you upload here.</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-body text-primary/60">Current Gallery</h3>
            <span className="text-[10px] text-primary/30 font-body">· Changes sync to website within 30s</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className={`relative group rounded-xl overflow-hidden border transition-all ${
                  img.is_active ? "border-primary/20" : "border-red-500/30 opacity-60"
                } ${deleting === img.id ? "opacity-30 pointer-events-none animate-pulse" : ""}`}
              >
                <img
                  src={img.image_url}
                  alt={`Gallery #${idx + 1}`}
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                />

                {/* Controls overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 flex items-end justify-between sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-1">
                    <button
                      onClick={() => moveOrder(img, "up")}
                      disabled={idx === 0}
                      className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/20 transition"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => moveOrder(img, "down")}
                      disabled={idx === images.length - 1}
                      className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/20 transition"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleActive(img)}
                      className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition"
                    >
                      {img.is_active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(img)}
                      className="w-7 h-7 rounded-full bg-red-500/30 backdrop-blur-sm flex items-center justify-center text-red-300 hover:bg-red-500/50 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Badges */}
                {!img.is_active && (
                  <div className="absolute top-2 left-2 bg-red-500/80 text-white text-[9px] px-1.5 py-0.5 rounded font-body tracking-wider uppercase">
                    Hidden
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[9px] px-1.5 py-0.5 rounded font-body">
                  #{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete single confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-card border border-primary/20 rounded-2xl p-5 sm:p-6 max-w-sm w-full space-y-4 shadow-luxury" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-display text-base text-primary">Delete Image?</h3>
                <p className="text-xs text-primary/50 font-body mt-1">This will permanently remove this image from the gallery and website.</p>
              </div>
            </div>
            <div className="flex justify-center">
              <img src={deleteConfirm.image_url} alt="" className="w-20 h-28 object-cover rounded-lg border border-primary/20" />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setDeleteConfirm(null)} variant="outline" size="sm" className="flex-1 border-primary/20 text-primary/60 text-xs">
                Cancel
              </Button>
              <Button onClick={() => handleDelete(deleteConfirm)} size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs">
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Clear all confirmation modal */}
      {clearConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setClearConfirm(false)}>
          <div className="bg-card border border-primary/20 rounded-2xl p-5 sm:p-6 max-w-sm w-full space-y-4 shadow-luxury" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-display text-base text-primary">Delete All Images?</h3>
                <p className="text-xs text-primary/50 font-body mt-1">
                  This will permanently remove all {images.length} images. This cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setClearConfirm(false)} variant="outline" size="sm" className="flex-1 border-primary/20 text-primary/60 text-xs">
                Cancel
              </Button>
              <Button onClick={deleteAll} size="sm" className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs">
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
