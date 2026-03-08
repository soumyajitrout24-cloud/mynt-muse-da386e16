import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Trash2, Upload, GripVertical } from "lucide-react";

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
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage.from("gallery").upload(path, file);
      if (uploadError) { toast.error(`Failed to upload ${file.name}`); continue; }

      const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);

      await supabase.from("gallery_images").insert({
        image_url: urlData.publicUrl,
        display_order: images.length + 1,
      });
    }

    toast.success("Images uploaded!");
    await fetchImages();
    setUploading(false);
  };

  const handleDelete = async (img: GalleryImage) => {
    // Extract path from URL
    const urlParts = img.image_url.split("/gallery/");
    if (urlParts[1]) {
      await supabase.storage.from("gallery").remove([urlParts[1]]);
    }
    await supabase.from("gallery_images").delete().eq("id", img.id);
    toast.success("Image deleted");
    fetchImages();
  };

  const toggleActive = async (img: GalleryImage) => {
    await supabase.from("gallery_images").update({ is_active: !img.is_active }).eq("id", img.id);
    fetchImages();
  };

  if (loading) return <p className="text-primary/50 text-center py-8">Loading gallery...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-primary tracking-wider">Gallery Management</h2>
        <label className="cursor-pointer">
          <Button disabled={uploading} className="bg-gold text-emerald-dark hover:bg-gold/90">
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Uploading..." : "Upload Images"}
          </Button>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>

      {images.length === 0 ? (
        <p className="text-primary/40 text-center py-12 font-elegant">No images yet. Upload some to get started.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((img) => (
            <div key={img.id} className={`relative group rounded-xl overflow-hidden border ${img.is_active ? "border-primary/20" : "border-red-500/30 opacity-50"}`}>
              <img src={img.image_url} alt="" className="w-full aspect-[3/4] object-cover pointer-events-auto" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="sm" variant="ghost" onClick={() => toggleActive(img)} className="text-white text-xs">
                  {img.is_active ? "Hide" : "Show"}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(img)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
