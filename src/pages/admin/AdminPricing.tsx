import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Save, X } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  subtitle: string | null;
  description: string | null;
  features: string[];
  tier: string;
  display_order: number;
  is_active: boolean;
};

const AdminPricing = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [featureInput, setFeatureInput] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    const { data } = await supabase.from("pricing_plans").select("*").order("display_order");
    setPlans(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPlans(); }, []);

  const startNew = () => {
    setEditing({ id: "", name: "", subtitle: "", description: "", features: [], tier: "silver", display_order: plans.length + 1, is_active: true });
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
      await supabase.from("pricing_plans").update(data).eq("id", id);
      toast.success("Plan updated");
    } else {
      await supabase.from("pricing_plans").insert(data);
      toast.success("Plan created");
    }
    setEditing(null);
    fetchPlans();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("pricing_plans").delete().eq("id", id);
    toast.success("Plan deleted");
    fetchPlans();
  };

  if (loading) return <p className="text-primary/50 text-center py-8">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-primary tracking-wider">Pricing Plans</h2>
        <Button onClick={startNew} className="bg-gold text-emerald-dark hover:bg-gold/90">
          <Plus className="w-4 h-4 mr-2" /> Add Plan
        </Button>
      </div>

      {editing && (
        <div className="gold-border-card rounded-xl bg-card p-5 space-y-4">
          <h3 className="font-display text-lg text-primary">{editing.id ? "Edit" : "New"} Plan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input placeholder="Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="bg-background/50 border-primary/20 text-primary" />
            <Input placeholder="Subtitle" value={editing.subtitle || ""} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} className="bg-background/50 border-primary/20 text-primary" />
          </div>
          <textarea placeholder="Description" value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full bg-background/50 border border-primary/20 text-primary rounded-md p-3 text-sm min-h-[60px]" />
          <select value={editing.tier} onChange={(e) => setEditing({ ...editing, tier: e.target.value })} className="bg-background/50 border border-primary/20 text-primary rounded-md p-2 text-sm">
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
          <div className="flex gap-2 flex-wrap">
            {editing.features.map((f, i) => (
              <span key={i} className="flex items-center gap-1 px-2 py-1 border border-primary/20 rounded-full text-xs text-primary/60">
                {f} <button onClick={() => removeFeature(i)} className="text-red-400"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Add feature" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())} className="bg-background/50 border-primary/20 text-primary flex-1" />
            <Button onClick={addFeature} variant="outline" className="border-primary/20 text-primary">Add</Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-gold text-emerald-dark"><Save className="w-4 h-4 mr-2" /> Save</Button>
            <Button onClick={() => setEditing(null)} variant="ghost" className="text-primary/50">Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {plans.map((p) => (
          <div key={p.id} className="gold-border-card rounded-xl bg-card p-4 flex items-center justify-between">
            <div>
              <h4 className="font-display text-base text-primary">{p.name} <span className="text-xs text-gold/60 uppercase ml-2">{p.tier}</span></h4>
              <p className="text-xs text-primary/40 font-elegant">{p.subtitle}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => { setEditing({ ...p }); setFeatureInput(""); }} className="text-primary/50 hover:text-primary">Edit</Button>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(p.id)} className="text-red-400"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPricing;
