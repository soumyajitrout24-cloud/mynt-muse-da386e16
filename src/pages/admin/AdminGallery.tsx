import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Upload, Eye, EyeOff, ArrowUp, ArrowDown, ImageIcon, RefreshCw } from "lucide-react";

type GalleryImage = {
  id: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
};

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchImages = async () => {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order");
    setImages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchImages(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    let count = 0;
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage.from("gallery").upload(path, file);
      if (uploadError) { toast.error(`Failed: ${file.name}`); continue; }

      const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);

      await supabase.from("gallery_images").insert({
        image_url: urlData.publicUrl,
        display_order: images.length + count + 1,
      });
      count++;
    }

    toast.success(`${count} image${count > 1 ? "s" : ""} uploaded!`);
    await fetchImages();
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (img: GalleryImage) => {
    if (!confirm("Delete this image permanently?")) return;
    setDeleting(img.id);
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
    if (!confirm("Delete ALL gallery images? This cannot be undone.")) return;
    const paths = images.map((img) => {
      const parts = img.image_url.split("/gallery/");
      return parts[1] ? decodeURIComponent(parts[1]) : null;
    }).filter(Boolean) as string[];

    if (paths.length) await supabase.storage.from("gallery").remove(paths);
    
    for (const img of images) {
      await supabase.from("gallery_images").delete().eq("id", img.id);
    }
    toast.success("All images deleted");
    fetchImages();
  };

  if (loading) return <p className="text-primary/50 text-center py-8 text-sm">Loading gallery...</p>;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg sm:text-xl text-primary tracking-wider">Gallery</h2>
          <p className="text-xs text-primary/40 font-body">{images.length} images · {images.filter(i => i.is_active).length} visible on website</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button onClick={fetchImages} variant="outline" size="sm" className="border-primary/20 text-primary/60 text-xs">
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
          </Button>
          <label className="cursor-pointer flex-1 sm:flex-none">
            <Button disabled={uploading} className="bg-gold text-emerald-dark hover:bg-gold/90 w-full sm:w-auto text-xs sm:text-sm">
              <Upload className="w-4 h-4 mr-1.5" />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
          {images.length > 0 && (
            <Button onClick={deleteAll} variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs sm:text-sm">
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-gold/5 border border-gold/20 rounded-lg px-3 py-2 text-[10px] sm:text-xs text-primary/50 font-body">
        💡 Changes appear on the website within 30 seconds. Upload, reorder, hide or delete images here.
      </div>

      {images.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-primary/20 rounded-xl">
          <ImageIcon className="w-10 h-10 text-primary/20 mx-auto mb-3" />
          <p className="text-primary/40 font-elegant text-sm">No images yet. Upload some to get started.</p>
          <p className="text-primary/25 font-body text-[10px] mt-1">The website will show fallback images until you upload here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {images.map((img, idx) => (
            <div key={img.id} className={`relative group rounded-xl overflow-hidden border transition-all ${
              img.is_active ? "border-primary/20" : "border-red-500/30 opacity-60"
            } ${deleting === img.id ? "opacity-30 pointer-events-none" : ""}`}>
              <img src={img.image_url} alt="" className="w-full aspect-[3/4] object-cover pointer-events-auto" loading="lazy" />
              
              {/* Always visible mobile controls */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 flex items-end justify-between sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  <button onClick={() => moveOrder(img, "up")} disabled={idx === 0} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white disabled:opacity-30">
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button onClick={() => moveOrder(img, "down")} disabled={idx === images.length - 1} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white disabled:opacity-30">
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => toggleActive(img)} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                    {img.is_active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </button>
                  <button onClick={() => handleDelete(img)} className="w-7 h-7 rounded-full bg-red-500/30 flex items-center justify-center text-red-300">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Hidden badge */}
              {!img.is_active && (
                <div className="absolute top-2 left-2 bg-red-500/80 text-white text-[9px] px-1.5 py-0.5 rounded font-body tracking-wider uppercase">
                  Hidden
                </div>
              )}

              {/* Order number */}
              <div className="absolute top-2 right-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded font-body">
                #{idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
