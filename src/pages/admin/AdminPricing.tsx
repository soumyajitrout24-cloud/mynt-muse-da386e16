import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Save, X, Edit2, Eye, EyeOff } from "lucide-react";

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
    if (!editing || !editing.name.trim()) { toast.error("Name is required"); return; }
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
    if (!confirm("Delete this plan?")) return;
    await supabase.from("pricing_plans").delete().eq("id", id);
    toast.success("Plan deleted");
    fetchPlans();
  };

  const toggleActive = async (p: Plan) => {
    await supabase.from("pricing_plans").update({ is_active: !p.is_active }).eq("id", p.id);
    fetchPlans();
  };

  if (loading) return <p className="text-primary/50 text-center py-8 text-sm">Loading...</p>;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg sm:text-xl text-primary tracking-wider">Pricing Plans</h2>
        <Button onClick={startNew} className="bg-gold text-emerald-dark hover:bg-gold/90 text-xs sm:text-sm">
          <Plus className="w-4 h-4 mr-1.5" /> Add Plan
        </Button>
      </div>

      {editing && (
        <div className="gold-border-card rounded-xl bg-card p-4 sm:p-5 space-y-3 sm:space-y-4">
          <h3 className="font-display text-base sm:text-lg text-primary">{editing.id ? "Edit" : "New"} Plan</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input placeholder="Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="bg-background/50 border-primary/20 text-primary text-sm" />
            <Input placeholder="Subtitle" value={editing.subtitle || ""} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} className="bg-background/50 border-primary/20 text-primary text-sm" />
          </div>
          <textarea placeholder="Description" value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full bg-background/50 border border-primary/20 text-primary rounded-md p-3 text-sm min-h-[60px]" />
          <select value={editing.tier} onChange={(e) => setEditing({ ...editing, tier: e.target.value })} className="bg-background/50 border border-primary/20 text-primary rounded-md p-2 text-sm w-full sm:w-auto">
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
          <div className="flex flex-wrap gap-1.5">
            {editing.features.map((f, i) => (
              <span key={i} className="flex items-center gap-1 px-2 py-1 border border-primary/20 rounded-full text-[10px] sm:text-xs text-primary/60">
                {f} <button onClick={() => removeFeature(i)} className="text-red-400"><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Add feature" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())} className="bg-background/50 border-primary/20 text-primary flex-1 text-sm" />
            <Button onClick={addFeature} variant="outline" size="sm" className="border-primary/20 text-primary text-xs">Add</Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm" className="bg-gold text-emerald-dark text-xs"><Save className="w-3.5 h-3.5 mr-1.5" /> Save</Button>
            <Button onClick={() => setEditing(null)} variant="ghost" size="sm" className="text-primary/50 text-xs">Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {plans.map((p) => (
          <div key={p.id} className={`gold-border-card rounded-xl bg-card p-3 sm:p-4 flex items-start sm:items-center justify-between gap-3 ${!p.is_active ? "opacity-50" : ""}`}>
            <div className="min-w-0 flex-1">
              <h4 className="font-display text-sm sm:text-base text-primary truncate">
                {p.name}
                <span className="text-[10px] sm:text-xs text-gold/60 uppercase ml-2 font-body">{p.tier}</span>
              </h4>
              <p className="text-[10px] sm:text-xs text-primary/40 font-elegant truncate">{p.subtitle}</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Button size="icon" variant="ghost" onClick={() => toggleActive(p)} className="w-7 h-7 text-primary/40 hover:text-primary">
                {p.is_active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </Button>
              <Button size="icon" variant="ghost" onClick={() => { setEditing({ ...p }); setFeatureInput(""); }} className="w-7 h-7 text-primary/40 hover:text-primary">
                <Edit2 className="w-3.5 h-3.5" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => handleDelete(p.id)} className="w-7 h-7 text-red-400 hover:text-red-300">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
        {plans.length === 0 && <p className="text-primary/30 text-center py-8 text-sm font-elegant">No plans added yet.</p>}
      </div>
    </div>
  );
};

export default AdminPricing;
