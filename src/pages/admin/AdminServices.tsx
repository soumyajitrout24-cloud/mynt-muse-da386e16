import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Save, X } from "lucide-react";

type Service = {
  id: string;
  title: string;
  description: string;
  features: string[];
  display_order: number;
  is_active: boolean;
};

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [featureInput, setFeatureInput] = useState("");
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const { data } = await supabase.from("services").select("*").order("display_order");
    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const startNew = () => {
    setEditing({
      id: "",
      title: "",
      description: "",
      features: [],
      display_order: services.length + 1,
      is_active: true,
    });
    setFeatureInput("");
  };

  const startEdit = (s: Service) => {
    setEditing({ ...s });
    setFeatureInput("");
  };

  const addFeature = () => {
    if (!featureInput.trim() || !editing) return;
    setEditing({ ...editing, features: [...editing.features, featureInput.trim()] });
    setFeatureInput("");
  };

  const removeFeature = (idx: number) => {
    if (!editing) return;
    setEditing({ ...editing, features: editing.features.filter((_, i) => i !== idx) });
  };

  const handleSave = async () => {
    if (!editing) return;
    const { id, ...data } = editing;

    if (id) {
      await supabase.from("services").update(data).eq("id", id);
      toast.success("Service updated");
    } else {
      await supabase.from("services").insert(data);
      toast.success("Service created");
    }
    setEditing(null);
    fetch();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    toast.success("Service deleted");
    fetch();
  };

  if (loading) return <p className="text-primary/50 text-center py-8">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-primary tracking-wider">Services Management</h2>
        <Button onClick={startNew} className="bg-gold text-emerald-dark hover:bg-gold/90">
          <Plus className="w-4 h-4 mr-2" /> Add Service
        </Button>
      </div>

      {editing && (
        <div className="gold-border-card rounded-xl bg-card p-5 space-y-4">
          <h3 className="font-display text-lg text-primary">{editing.id ? "Edit" : "New"} Service</h3>
          <Input
            placeholder="Title"
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            className="bg-background/50 border-primary/20 text-primary"
          />
          <textarea
            placeholder="Description"
            value={editing.description}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            className="w-full bg-background/50 border border-primary/20 text-primary rounded-md p-3 text-sm min-h-[80px]"
          />
          <div className="flex gap-2 flex-wrap">
            {editing.features.map((f, i) => (
              <span key={i} className="flex items-center gap-1 px-2 py-1 border border-primary/20 rounded-full text-xs text-primary/60">
                {f}
                <button onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-300"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add feature"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              className="bg-background/50 border-primary/20 text-primary flex-1"
            />
            <Button onClick={addFeature} variant="outline" className="border-primary/20 text-primary">Add</Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-gold text-emerald-dark"><Save className="w-4 h-4 mr-2" /> Save</Button>
            <Button onClick={() => setEditing(null)} variant="ghost" className="text-primary/50">Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className="gold-border-card rounded-xl bg-card p-4 flex items-center justify-between">
            <div>
              <h4 className="font-display text-base text-primary">{s.title}</h4>
              <p className="text-xs text-primary/40 font-elegant">{s.features.join(" • ")}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => startEdit(s)} className="text-primary/50 hover:text-primary">Edit</Button>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(s.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
