import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Save } from "lucide-react";

type Location = {
  id: string;
  city: string;
  area_name: string;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
};

const cities = ["Bangalore", "Chennai", "Hyderabad", "Mumbai", "Nashik"];

const AdminLocations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [editing, setEditing] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
    const { data } = await supabase.from("locations").select("*").order("city").order("display_order");
    setLocations(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchLocations(); }, []);

  const startNew = () => {
    setEditing({ id: "", city: "Bangalore", area_name: "", image_url: "", display_order: 0, is_active: true });
  };

  const handleSave = async () => {
    if (!editing) return;
    const { id, ...data } = editing;
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
    await supabase.from("locations").delete().eq("id", id);
    toast.success("Location deleted");
    fetchLocations();
  };

  if (loading) return <p className="text-primary/50 text-center py-8">Loading...</p>;

  // Group by city
  const grouped = cities.reduce((acc, city) => {
    acc[city] = locations.filter((l) => l.city.toLowerCase() === city.toLowerCase());
    return acc;
  }, {} as Record<string, Location[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-primary tracking-wider">Locations Management</h2>
        <Button onClick={startNew} className="bg-gold text-emerald-dark hover:bg-gold/90">
          <Plus className="w-4 h-4 mr-2" /> Add Area
        </Button>
      </div>

      {editing && (
        <div className="gold-border-card rounded-xl bg-card p-5 space-y-4">
          <h3 className="font-display text-lg text-primary">{editing.id ? "Edit" : "New"} Location</h3>
          <select value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })} className="bg-background/50 border border-primary/20 text-primary rounded-md p-2 text-sm w-full">
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <Input placeholder="Area name" value={editing.area_name} onChange={(e) => setEditing({ ...editing, area_name: e.target.value })} className="bg-background/50 border-primary/20 text-primary" />
          <Input placeholder="Image URL (optional)" value={editing.image_url || ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} className="bg-background/50 border-primary/20 text-primary" />
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-gold text-emerald-dark"><Save className="w-4 h-4 mr-2" /> Save</Button>
            <Button onClick={() => setEditing(null)} variant="ghost" className="text-primary/50">Cancel</Button>
          </div>
        </div>
      )}

      {cities.map((city) => (
        <div key={city}>
          <h3 className="font-display text-lg text-primary mb-2">{city}</h3>
          <div className="space-y-2">
            {grouped[city]?.length ? grouped[city].map((loc) => (
              <div key={loc.id} className="gold-border-card rounded-lg bg-card px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-primary/70 font-elegant">{loc.area_name}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setEditing({ ...loc })} className="text-primary/50 hover:text-primary text-xs">Edit</Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(loc.id)} className="text-red-400 text-xs"><Trash2 className="w-3 h-3" /></Button>
                </div>
              </div>
            )) : <p className="text-xs text-primary/30 font-elegant">No areas added yet</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminLocations;
