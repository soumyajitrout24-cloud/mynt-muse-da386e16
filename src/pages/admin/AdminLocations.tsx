import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Save, Edit2, Eye, EyeOff, MapPin } from "lucide-react";

type Location = {
  id: string;
  city: string;
  area_name: string;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
};

const AdminLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [editing, setEditing] = useState<Location | null>(null);
  const [newCity, setNewCity] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    const { data } = await supabase.from("locations").select("*").order("city").order("display_order");
    setLocations(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchLocations(); }, []);

  // Get unique cities from existing data
  const cities = [...new Set(locations.map((l) => l.city))].sort();

  const startNew = (city?: string) => {
    setEditing({ id: "", city: city || "", area_name: "", image_url: "", display_order: 0, is_active: true });
    setNewCity("");
  };

  const handleSave = async () => {
    if (!editing) return;
    const finalCity = editing.city || newCity;
    if (!finalCity.trim() || !editing.area_name.trim()) {
      toast.error("City and area name are required");
      return;
    }
    const saveData = { ...editing, city: finalCity.trim() };
    const { id, ...data } = saveData;
    if (id) {
      await supabase.from("locations").update(data).eq("id", id);
      toast.success("Location updated");
    } else {
      await supabase.from("locations").insert(data);
      toast.success("Location added");
    }
    setEditing(null);
    fetchLocations();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this location?")) return;
    await supabase.from("locations").delete().eq("id", id);
    toast.success("Location deleted");
    fetchLocations();
  };

  const toggleActive = async (loc: Location) => {
    await supabase.from("locations").update({ is_active: !loc.is_active }).eq("id", loc.id);
    fetchLocations();
  };

  if (loading) return <p className="text-primary/50 text-center py-8 text-sm">Loading...</p>;

  const grouped = cities.reduce((acc, city) => {
    acc[city] = locations.filter((l) => l.city.toLowerCase() === city.toLowerCase());
    return acc;
  }, {} as Record<string, Location[]>);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg sm:text-xl text-primary tracking-wider">Locations</h2>
        <Button onClick={() => startNew()} className="bg-gold text-emerald-dark hover:bg-gold/90 text-xs sm:text-sm">
          <Plus className="w-4 h-4 mr-1.5" /> Add Area
        </Button>
      </div>

      {editing && (
        <div className="gold-border-card rounded-xl bg-card p-4 sm:p-5 space-y-3">
          <h3 className="font-display text-base sm:text-lg text-primary">{editing.id ? "Edit" : "New"} Location</h3>
          {cities.length > 0 && !editing.id ? (
            <div className="space-y-2">
              <select
                value={editing.city}
                onChange={(e) => setEditing({ ...editing, city: e.target.value })}
                className="bg-background/50 border border-primary/20 text-primary rounded-md p-2 text-sm w-full"
              >
                <option value="">Select existing city or type new</option>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {!editing.city && (
                <Input placeholder="Or type new city name" value={newCity} onChange={(e) => setNewCity(e.target.value)} className="bg-background/50 border-primary/20 text-primary text-sm" />
              )}
            </div>
          ) : (
            <Input placeholder="City" value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })} className="bg-background/50 border-primary/20 text-primary text-sm" />
          )}
          <Input placeholder="Area name" value={editing.area_name} onChange={(e) => setEditing({ ...editing, area_name: e.target.value })} className="bg-background/50 border-primary/20 text-primary text-sm" />
          <Input placeholder="Image URL (optional)" value={editing.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} className="bg-background/50 border-primary/20 text-primary text-sm" />
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm" className="bg-gold text-emerald-dark text-xs"><Save className="w-3.5 h-3.5 mr-1.5" /> Save</Button>
            <Button onClick={() => setEditing(null)} variant="ghost" size="sm" className="text-primary/50 text-xs">Cancel</Button>
          </div>
        </div>
      )}

      {cities.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-primary/20 rounded-xl">
          <MapPin className="w-8 h-8 text-primary/20 mx-auto mb-2" />
          <p className="text-primary/30 font-elegant text-sm">No locations yet. Add your first area.</p>
        </div>
      ) : (
        cities.map((city) => (
          <div key={city} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base sm:text-lg text-primary">{city}</h3>
              <button onClick={() => startNew(city)} className="text-[10px] text-gold/60 hover:text-gold font-body tracking-wider uppercase">+ Add area</button>
            </div>
            {grouped[city]?.map((loc) => (
              <div key={loc.id} className={`gold-border-card rounded-lg bg-card px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 ${!loc.is_active ? "opacity-50" : ""}`}>
                <span className="text-xs sm:text-sm text-primary/70 font-elegant truncate">{loc.area_name}</span>
                <div className="flex gap-1 flex-shrink-0">
                  <Button size="icon" variant="ghost" onClick={() => toggleActive(loc)} className="w-6 h-6 text-primary/40 hover:text-primary">
                    {loc.is_active ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => setEditing({ ...loc })} className="w-6 h-6 text-primary/40 hover:text-primary">
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(loc.id)} className="w-6 h-6 text-red-400">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminLocations;
