import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save } from "lucide-react";

const AdminContact = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [contactId, setContactId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("contact_details").select("*").limit(1).single();
      if (data) {
        setEmail(data.email);
        setPhone(data.phone);
        setWhatsapp(data.whatsapp_number);
        setContactId(data.id);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    if (contactId) {
      await supabase.from("contact_details").update({ email, phone, whatsapp_number: whatsapp }).eq("id", contactId);
    } else {
      await supabase.from("contact_details").insert({ email, phone, whatsapp_number: whatsapp });
    }
    toast.success("Contact details saved!");
    setSaving(false);
  };

  if (loading) return <p className="text-primary/50 text-center py-8">Loading...</p>;

  return (
    <div className="max-w-md space-y-6">
      <h2 className="font-display text-xl text-primary tracking-wider">Contact Details</h2>

      <div className="gold-border-card rounded-xl bg-card p-5 space-y-4">
        <div>
          <label className="text-xs text-primary/50 font-body mb-1 block">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background/50 border-primary/20 text-primary" />
        </div>
        <div>
          <label className="text-xs text-primary/50 font-body mb-1 block">Phone</label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-background/50 border-primary/20 text-primary" />
        </div>
        <div>
          <label className="text-xs text-primary/50 font-body mb-1 block">WhatsApp Number (without +)</label>
          <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="bg-background/50 border-primary/20 text-primary" />
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-gold text-emerald-dark hover:bg-gold/90">
          <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default AdminContact;
