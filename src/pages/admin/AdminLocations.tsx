import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Plus, Trash2, Save, Edit2, Eye, EyeOff, MapPin,
  Upload, Image as ImageIcon, AlertTriangle, X, ChevronDown, ChevronUp,
} from "lucide-react";

type Location = {
  id: string;
  city: string;
  area_name: string;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
};

const CITIES = ["Bangalore", "Chennai", "Hyderabad", "Mumbai", "Nashik"];

const AdminLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [editing, setEditing] = useState<Location | null>(null);
  const [newCity, setNewCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: "area" | "city"; id?: string; city?: string } | null>(null);
  const [expandedCities, setExpandedCities] = useState<Record<string, boolean>>({});
  const [previewFile, setPreviewFile] = useState<{ file: File; url: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchLocations = useCallback(async () => {
    const { data } = await supabase.from("locations").select("*").order("city").order("display_order");
    setLocations(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchLocations(); }, [fetchLocations]);

  const cities = [...new Set([...CITIES, ...locations.map((l) => l.city)])].sort();

  // Initialize all cities expanded
  useEffect(() => {
    const expanded: Record<string, boolean> = {};
    cities.forEach((c) => { expanded[c] = true; });
    setExpandedCities(expanded);
  }, [locations.length]);

  const toggleCity = (city: string) => {
    setExpandedCities((prev) => ({ ...prev, [city]: !prev[city] }));
  };

  const startNew = (city?: string) => {
    setEditing({ id: "", city: city || "", area_name: "", image_url: "", display_order: 0, is_active: true });
    setNewCity("");
    setPreviewFile(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Show preview first
    setPreviewFile({ file, url: URL.createObjectURL(file) });
    e.target.value = "";
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploading(true);
    setUploadProgress(0);
    const ext = file.name.split(".").pop();
    const path = `locations/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    
    setUploadProgress(30);
    const { error } = await supabase.storage.from("gallery").upload(path, file);
    if (error) {
      toast.error("Upload failed");
      setUploading(false);
      return null;
    }
    setUploadProgress(80);
    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);
    setUploadProgress(100);
    setUploading(false);
    return urlData.publicUrl;
  };

  const handleSave = async () => {
    if (!editing) return;
    const finalCity = (editing.city || newCity).trim();
    const areaName = editing.area_name.trim();

    if (!finalCity || !areaName) {
      toast.error("City and area name are required");
      return;
    }

    let imageUrl = editing.image_url;

    if (previewFile) {
      const url = await uploadImage(previewFile.file);
      if (url) imageUrl = url;
      URL.revokeObjectURL(previewFile.url);
      setPreviewFile(null);
    }

    if (editing.id) {
      const { error } = await supabase
        .from("locations")
        .update({ city: finalCity, area_name: areaName, image_url: imageUrl || null, is_active: editing.is_active })
        .eq("id", editing.id);
      if (error) {
        toast.error("Failed to update area");
        return;
      }
      toast.success("Area updated");
    } else {
      const cityAreas = locations.filter((loc) => loc.city.toLowerCase() === finalCity.toLowerCase());
      const nextOrder = (cityAreas.reduce((max, loc) => Math.max(max, loc.display_order), 0) || 0) + 1;

      const { error } = await supabase.from("locations").insert({
        city: finalCity,
        area_name: areaName,
        image_url: imageUrl || null,
        is_active: true,
        display_order: nextOrder,
      });
      if (error) {
        toast.error("Failed to add area");
        return;
      }
      toast.success("Area added");
    }

    setEditing(null);
    await fetchLocations();
  };

  const handleDeleteArea = async (id: string) => {
    setDeleteConfirm(null);
    await supabase.from("locations").delete().eq("id", id);
    toast.success("Area deleted");
    fetchLocations();
  };

  const handleDeleteCity = async (city: string) => {
    setDeleteConfirm(null);
    const cityLocs = locations.filter((l) => l.city === city);
    // Delete storage images
    for (const loc of cityLocs) {
      if (loc.image_url) {
        const parts = loc.image_url.split("/gallery/");
        if (parts[1]) await supabase.storage.from("gallery").remove([decodeURIComponent(parts[1])]);
      }
      await supabase.from("locations").delete().eq("id", loc.id);
    }
    toast.success(`All areas in ${city} deleted`);
    fetchLocations();
  };

  const toggleActive = async (loc: Location) => {
    await supabase.from("locations").update({ is_active: !loc.is_active }).eq("id", loc.id);
    toast.success(loc.is_active ? "Area hidden" : "Area visible");
    fetchLocations();
  };

  const removeAreaImage = async (loc: Location) => {
    if (loc.image_url) {
      const parts = loc.image_url.split("/gallery/");
      if (parts[1]) await supabase.storage.from("gallery").remove([decodeURIComponent(parts[1])]);
    }
    await supabase.from("locations").update({ image_url: null }).eq("id", loc.id);
    toast.success("Image removed");
    fetchLocations();
  };

  const grouped = cities.reduce((acc, city) => {
    acc[city] = locations.filter((l) => l.city.toLowerCase() === city.toLowerCase());
    return acc;
  }, {} as Record<string, Location[]>);

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
          <h2 className="font-display text-lg sm:text-xl text-primary tracking-wider">Location Management</h2>
          <p className="text-xs text-primary/40 font-body mt-0.5">
            {locations.length} areas across {cities.length} cities · Each city has its own image panel
          </p>
        </div>
        <Button onClick={() => startNew()} size="sm" className="bg-gold text-emerald-dark hover:bg-gold/90 text-xs">
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Area
        </Button>
      </div>

      <div className="bg-gold/5 border border-gold/20 rounded-lg px-3 py-2 text-[10px] sm:text-xs text-primary/50 font-body">
        💡 Each location can have its own image. Changes sync to the website within 30 seconds.
      </div>

      {/* Edit / Add form */}
      {editing && (
        <div className="gold-border-card rounded-xl bg-card p-4 sm:p-5 space-y-3">
          <h3 className="font-display text-base text-primary">{editing.id ? "Edit" : "New"} Location</h3>
          
          {!editing.id ? (
            <div className="space-y-2">
              <label className="text-xs text-primary/50 font-body">City</label>
              <select
                value={editing.city}
                onChange={(e) => setEditing({ ...editing, city: e.target.value })}
                className="bg-background/50 border border-primary/20 text-primary rounded-md p-2 text-sm w-full"
              >
                <option value="">Select city or type new</option>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {!editing.city && (
                <Input placeholder="Or type new city" value={newCity} onChange={(e) => setNewCity(e.target.value)} className="bg-background/50 border-primary/20 text-primary text-sm" />
              )}
            </div>
          ) : (
            <div>
              <label className="text-xs text-primary/50 font-body">City</label>
              <Input value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })} className="bg-background/50 border-primary/20 text-primary text-sm" />
            </div>
          )}

          <div>
            <label className="text-xs text-primary/50 font-body">Area Name</label>
            <Input placeholder="e.g. Koramangala, Bandra" value={editing.area_name} onChange={(e) => setEditing({ ...editing, area_name: e.target.value })} className="bg-background/50 border-primary/20 text-primary text-sm" />
          </div>

          {/* Image upload with preview */}
          <div className="space-y-2">
            <label className="text-xs text-primary/50 font-body flex items-center gap-1.5">
              <ImageIcon className="w-3 h-3" /> Area Image
            </label>
            
            <div className="flex gap-3 items-start">
              {/* Current or preview image */}
              {(previewFile?.url || editing.image_url) && (
                <div className="relative w-24 h-20 rounded-lg overflow-hidden border border-primary/20 flex-shrink-0">
                  <img src={previewFile?.url || editing.image_url || ""} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => {
                      if (previewFile) { URL.revokeObjectURL(previewFile.url); setPreviewFile(null); }
                      else setEditing({ ...editing, image_url: "" });
                    }}
                    className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500/80 rounded-full flex items-center justify-center text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 border-2 border-dashed border-primary/20 hover:border-gold/40 rounded-lg p-3 text-center cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 text-primary/30 mx-auto mb-1" />
                <p className="text-[10px] text-primary/40 font-body">Click or drag to upload</p>
              </div>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleImageUpload} />
            </div>

            {uploading && (
              <div className="space-y-1">
                <Progress value={uploadProgress} className="h-1.5 bg-primary/10" />
                <p className="text-[9px] text-primary/30 font-body">Uploading... {uploadProgress}%</p>
              </div>
            )}

            <Input
              placeholder="Or paste image URL"
              value={editing.image_url || ""}
              onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
              className="bg-background/50 border-primary/20 text-primary text-xs"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <Button onClick={handleSave} disabled={uploading} size="sm" className="bg-gold text-emerald-dark text-xs">
              <Save className="w-3.5 h-3.5 mr-1.5" /> Save
            </Button>
            <Button onClick={() => { setEditing(null); if (previewFile) { URL.revokeObjectURL(previewFile.url); setPreviewFile(null); } }} variant="ghost" size="sm" className="text-primary/50 text-xs">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Cities list */}
      {cities.map((city) => {
        const cityAreas = grouped[city] || [];
        const isExpanded = expandedCities[city] !== false;

        return (
          <div key={city} className="gold-border-card rounded-xl bg-card overflow-hidden">
            {/* City header */}
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-primary/5 transition-colors"
              onClick={() => toggleCity(city)}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                <h3 className="font-display text-sm sm:text-base text-primary">{city}</h3>
                <span className="text-[10px] bg-primary/10 text-primary/50 px-1.5 py-0.5 rounded font-body">
                  {cityAreas.length} area{cityAreas.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); startNew(city); }}
                  className="text-[10px] text-gold/70 hover:text-gold font-body tracking-wider uppercase"
                >
                  + Add
                </button>
                {cityAreas.length > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteConfirm({ type: "city", city }); }}
                    className="text-[10px] text-red-400/50 hover:text-red-400 font-body tracking-wider uppercase"
                  >
                    Delete all
                  </button>
                )}
                {isExpanded ? <ChevronUp className="w-4 h-4 text-primary/30" /> : <ChevronDown className="w-4 h-4 text-primary/30" />}
              </div>
            </div>

            {/* Areas */}
            {isExpanded && (
              <div className="border-t border-primary/10">
                {cityAreas.length === 0 ? (
                  <div className="px-4 py-6 text-center">
                    <MapPin className="w-6 h-6 text-primary/15 mx-auto mb-1" />
                    <p className="text-[11px] text-primary/30 font-body">No areas yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-primary/5">
                    {cityAreas.map((loc) => (
                      <div key={loc.id} className={`px-4 py-3 flex items-center gap-3 transition-opacity ${!loc.is_active ? "opacity-50" : ""}`}>
                        {/* Thumbnail */}
                        <div className="w-14 h-10 rounded-lg overflow-hidden bg-primary/5 flex-shrink-0 border border-primary/10 relative group/img">
                          {loc.image_url ? (
                            <>
                              <img src={loc.image_url} alt={loc.area_name} className="w-full h-full object-cover" loading="lazy" />
                              <button
                                onClick={() => removeAreaImage(loc)}
                                className="absolute inset-0 bg-red-500/70 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                              >
                                <Trash2 className="w-3 h-3 text-white" />
                              </button>
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-4 h-4 text-primary/20" />
                            </div>
                          )}
                        </div>

                        {/* Area info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-primary/70 font-elegant truncate">{loc.area_name}</p>
                          {!loc.is_active && (
                            <span className="text-[8px] text-red-400 font-body uppercase tracking-wider">Hidden</span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1 flex-shrink-0">
                          <Button size="icon" variant="ghost" onClick={() => toggleActive(loc)} className="w-7 h-7 text-primary/40 hover:text-primary">
                            {loc.is_active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => { setEditing({ ...loc }); setPreviewFile(null); }} className="w-7 h-7 text-primary/40 hover:text-primary">
                            <Edit2 className="w-3 h-3" />
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => setDeleteConfirm({ type: "area", id: loc.id })} className="w-7 h-7 text-red-400/60 hover:text-red-400">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-card border border-primary/20 rounded-2xl p-5 sm:p-6 max-w-sm w-full space-y-4 shadow-luxury" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-display text-base text-primary">
                  {deleteConfirm.type === "city" ? `Delete all areas in ${deleteConfirm.city}?` : "Delete this area?"}
                </h3>
                <p className="text-xs text-primary/50 font-body mt-1">
                  {deleteConfirm.type === "city"
                    ? "All areas and their images under this city will be permanently removed."
                    : "This area and its image will be permanently removed from the website."}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setDeleteConfirm(null)} variant="outline" size="sm" className="flex-1 border-primary/20 text-primary/60 text-xs">
                Cancel
              </Button>
              <Button
                onClick={() =>
                  deleteConfirm.type === "city"
                    ? handleDeleteCity(deleteConfirm.city!)
                    : handleDeleteArea(deleteConfirm.id!)
                }
                size="sm"
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLocations;
