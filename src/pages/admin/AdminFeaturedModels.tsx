import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Trash2, Upload, X, AlertTriangle, ImageIcon, RefreshCw,
  ChevronDown, ChevronUp, Users, Download,
} from "lucide-react";

// Static location images
import b1 from "@/assets/b1.jpg"; import b2 from "@/assets/b2.jpg"; import b3 from "@/assets/b3.jpg"; import b4 from "@/assets/b4.jpg";
import b5 from "@/assets/b5.jpg"; import b6 from "@/assets/b6.jpg"; import b7 from "@/assets/b7.jpg"; import b8 from "@/assets/b8.jpg";
import c1 from "@/assets/c1.jpg"; import c2 from "@/assets/c2.jpg"; import c3 from "@/assets/c3.jpg"; import c4 from "@/assets/c4.jpg";
import c5 from "@/assets/c5.jpg"; import c6 from "@/assets/c6.jpg"; import c7 from "@/assets/c7.jpg"; import c8 from "@/assets/c8.jpg";
import h1 from "@/assets/h1.jpg"; import h2 from "@/assets/h2.jpg";

const STATIC_CITY_IMAGES: Record<string, string[]> = {
  Bangalore: [b1, b2, b3, b4, b5, b6, b7, b8],
  Chennai: [c1, c2, c3, c4, c5, c6, c7, c8],
  Hyderabad: [h1, h2],
  Mumbai: [],
  Nashik: [],
};

type FeaturedModel = {
  id: string;
  city: string;
  location_name: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
};

const CITIES = ["Bangalore", "Chennai", "Hyderabad", "Mumbai", "Nashik"];

const FEATURED_BUCKET = "featured-models";

const extractStoragePath = (publicUrl: string, bucket: string) => {
  try {
    const url = new URL(publicUrl);
    const marker = `/object/public/${bucket}/`;
    const idx = url.pathname.indexOf(marker);
    if (idx === -1) return null;
    return decodeURIComponent(url.pathname.slice(idx + marker.length));
  } catch {
    return null;
  }
};

const AdminFeaturedModels = () => {
  const [models, setModels] = useState<FeaturedModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadCity, setUploadCity] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadTotal, setUploadTotal] = useState(0);
  const [uploadCurrent, setUploadCurrent] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<FeaturedModel | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [expandedCities, setExpandedCities] = useState<Record<string, boolean>>({});
  const [previewFiles, setPreviewFiles] = useState<{ file: File; url: string }[]>([]);
  const [dragOverCity, setDragOverCity] = useState<string | null>(null);
  const [seedingCity, setSeedingCity] = useState<string | null>(null);
  const [seedProgress, setSeedProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchModels = useCallback(async () => {
    const { data } = await supabase
      .from("featured_models")
      .select("*")
      .order("location_name")
      .order("display_order");
    setModels(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchModels(); }, [fetchModels]);

  useEffect(() => {
    const expanded: Record<string, boolean> = {};
    CITIES.forEach((c) => { expanded[c] = true; });
    setExpandedCities(expanded);
  }, []);

  const toggleCity = (city: string) => {
    setExpandedCities((prev) => ({ ...prev, [city]: !prev[city] }));
  };

  const handleDragOver = (e: React.DragEvent, city: string) => {
    e.preventDefault();
    setDragOverCity(city);
  };
  const handleDragLeave = () => setDragOverCity(null);
  const handleDrop = (e: React.DragEvent, city: string) => {
    e.preventDefault();
    setDragOverCity(null);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      ["image/jpeg", "image/png", "image/webp"].includes(f.type)
    );
    if (files.length) {
      setUploadCity(city);
      addToPreview(files);
    } else {
      toast.error("Only JPG, PNG, WEBP images are supported");
    }
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

  const openUploadFor = (city: string) => {
    setUploadCity(city);
    setPreviewFiles([]);
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) addToPreview(files);
    e.target.value = "";
  };

  const uploadPreviewed = async () => {
    if (!previewFiles.length || !uploadCity) return;
    setUploading(true);
    setUploadTotal(previewFiles.length);
    setUploadCurrent(0);
    setUploadProgress(0);

    const cityModels = models.filter((m) => m.location_name.toLowerCase() === uploadCity.toLowerCase());
    let count = 0;

    for (let i = 0; i < previewFiles.length; i++) {
      const { file } = previewFiles[i];
      const ext = file.name.split(".").pop();
      const path = `${uploadCity.toLowerCase()}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      setUploadCurrent(i + 1);
      setUploadProgress(Math.round((i / previewFiles.length) * 100));

      const { error } = await supabase.storage.from(FEATURED_BUCKET).upload(path, file);
      if (error) { toast.error(`Failed: ${file.name}`); continue; }

      const { data: urlData } = supabase.storage.from(FEATURED_BUCKET).getPublicUrl(path);
      await supabase.from("featured_models").insert({
        city: uploadCity,
        location_name: uploadCity,
        image_url: urlData.publicUrl,
        display_order: cityModels.length + count + 1,
      });
      count++;
      setUploadProgress(Math.round(((i + 1) / previewFiles.length) * 100));
    }

    toast.success(`${count} model image${count > 1 ? "s" : ""} added to ${uploadCity}!`);
    previewFiles.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviewFiles([]);
    setUploadCity(null);
    await fetchModels();
    setUploading(false);
    setUploadProgress(0);
  };

  const handleDelete = async (model: FeaturedModel) => {
    setDeleting(model.id);
    setDeleteConfirm(null);
    const storagePath = extractStoragePath(model.image_url, FEATURED_BUCKET);
    if (storagePath) {
      await supabase.storage.from(FEATURED_BUCKET).remove([storagePath]);
    }
    await supabase.from("featured_models").delete().eq("id", model.id);
    toast.success("Model image deleted");
    setDeleting(null);
    fetchModels();
  };

  const seedCityImages = async (city: string) => {
    const staticImages = STATIC_CITY_IMAGES[city] || [];
    if (!staticImages.length) { toast.error(`No static images available for ${city}`); return; }
    setSeedingCity(city);
    setSeedProgress(0);
    let count = 0;
    for (let i = 0; i < staticImages.length; i++) {
      try {
        const response = await fetch(staticImages[i]);
        const blob = await response.blob();
        const path = `${city.toLowerCase()}/seed-${Date.now()}-${i}.jpg`;
        const { error } = await supabase.storage.from(FEATURED_BUCKET).upload(path, blob, {
          contentType: "image/jpeg",
        });
        if (error) { console.error("Upload error:", error); continue; }
        const { data: urlData } = supabase.storage.from(FEATURED_BUCKET).getPublicUrl(path);
        await supabase.from("featured_models").insert({
          city,
          location_name: city,
          image_url: urlData.publicUrl,
          display_order: i + 1,
        });
        count++;
      } catch (err) {
        console.error("Seed error:", err);
      }
      setSeedProgress(i + 1);
    }
    toast.success(`${count} model images imported for ${city}!`);
    setSeedingCity(null);
    await fetchModels();
  };

  const grouped = CITIES.reduce((acc, city) => {
    acc[city] = models.filter((m) => m.location_name.toLowerCase() === city.toLowerCase());
    return acc;
  }, {} as Record<string, FeaturedModel[]>);

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
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg sm:text-xl text-primary tracking-wider">Featured Models</h2>
          <p className="text-xs text-primary/40 font-body mt-0.5">
            {models.length} model images across {CITIES.length} cities · Shown on location pages
          </p>
        </div>
        <Button onClick={fetchModels} variant="outline" size="sm" className="border-primary/20 text-primary/60 text-xs">
          <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
        </Button>
      </div>

      <div className="bg-gold/5 border border-gold/20 rounded-lg px-3 py-2 text-[10px] sm:text-xs text-primary/50 font-body">
        💡 Upload model images for each city. These appear in the "Featured Models" section on each location page. 6 random images are shown per visit.
      </div>

      {/* Preview staged files */}
      {previewFiles.length > 0 && uploadCity && (
        <div className="gold-border-card rounded-xl bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-body text-primary/70">
              Upload to <span className="text-gold font-display">{uploadCity}</span> ({previewFiles.length} image{previewFiles.length > 1 ? "s" : ""})
            </h3>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  previewFiles.forEach((p) => URL.revokeObjectURL(p.url));
                  setPreviewFiles([]);
                  setUploadCity(null);
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

          {uploading && (
            <div className="space-y-1.5">
              <Progress value={uploadProgress} className="h-2 bg-primary/10" />
              <p className="text-[10px] text-primary/40 font-body text-center">
                Uploading {uploadCurrent} of {uploadTotal} ({uploadProgress}%)
              </p>
            </div>
          )}

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {previewFiles.map((pf, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden border border-gold/30 aspect-[3/4]">
                <img src={pf.url} alt="" className="w-full h-full object-cover" />
                {!uploading && (
                  <button
                    onClick={() => removePreview(i)}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500/80 flex items-center justify-center text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cities */}
      {CITIES.map((city) => {
        const cityModels = grouped[city] || [];
        const isExpanded = expandedCities[city] !== false;

        return (
          <div key={city} className="gold-border-card rounded-xl bg-card overflow-hidden">
            {/* City header */}
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-primary/5 transition-colors"
              onClick={() => toggleCity(city)}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gold" />
                <h3 className="font-display text-sm sm:text-base text-primary">{city}</h3>
                <span className="text-[10px] bg-primary/10 text-primary/50 px-1.5 py-0.5 rounded font-body">
                  {cityModels.length} model{cityModels.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); openUploadFor(city); }}
                  className="text-[10px] text-gold/70 hover:text-gold font-body tracking-wider uppercase"
                >
                  + Upload
                </button>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-primary/30" /> : <ChevronDown className="w-4 h-4 text-primary/30" />}
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-primary/10">
                {/* Drop zone */}
                <div
                  onDragOver={(e) => handleDragOver(e, city)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, city)}
                  className={`mx-3 mt-3 border-2 border-dashed rounded-lg p-3 text-center transition-all cursor-pointer ${
                    dragOverCity === city
                      ? "border-gold bg-gold/10"
                      : "border-primary/15 hover:border-primary/30"
                  }`}
                  onClick={() => openUploadFor(city)}
                >
                  <Upload className={`w-5 h-5 mx-auto mb-1 ${dragOverCity === city ? "text-gold" : "text-primary/20"}`} />
                  <p className="text-[10px] text-primary/40 font-body">
                    Drag & drop model images or <span className="text-gold underline">browse</span>
                  </p>
                </div>

                {cityModels.length === 0 ? (
                  <div className="px-4 py-6 text-center space-y-2">
                    <ImageIcon className="w-6 h-6 text-primary/15 mx-auto mb-1" />
                    <p className="text-[11px] text-primary/30 font-body">No model images yet for {city}</p>
                    {(STATIC_CITY_IMAGES[city]?.length || 0) > 0 && (
                      <Button
                        onClick={() => seedCityImages(city)}
                        disabled={seedingCity === city}
                        size="sm"
                        className="bg-gold text-emerald-dark hover:bg-gold/90 text-[10px] h-7"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        {seedingCity === city
                          ? `Importing... (${seedProgress}/${STATIC_CITY_IMAGES[city].length})`
                          : `Import ${STATIC_CITY_IMAGES[city].length} Static Images`}
                      </Button>
                    )}
                    {seedingCity === city && (
                      <Progress value={(seedProgress / (STATIC_CITY_IMAGES[city]?.length || 1)) * 100} className="h-1.5 bg-primary/10 max-w-xs mx-auto" />
                    )}
                  </div>
                ) : (
                  <div className="p-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                    {cityModels.map((model) => (
                      <div
                        key={model.id}
                        className={`relative group rounded-lg overflow-hidden border border-primary/15 aspect-[3/4] ${
                          deleting === model.id ? "opacity-30 animate-pulse" : ""
                        }`}
                      >
                        <img
                          src={model.image_url}
                          alt="Model"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <button
                          onClick={() => setDeleteConfirm(model)}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-card border border-primary/20 rounded-2xl p-5 sm:p-6 max-w-sm w-full space-y-4 shadow-luxury" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-display text-base text-primary">Delete Model Image?</h3>
                <p className="text-xs text-primary/50 font-body mt-1">This will remove this image from the {deleteConfirm.location_name} featured models section.</p>
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
    </div>
  );
};

export default AdminFeaturedModels;
