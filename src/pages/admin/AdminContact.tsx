import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save, Mail, Phone, MessageCircle } from "lucide-react";

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
    if (!email.trim() || !phone.trim()) { toast.error("Email and phone are required"); return; }
    setSaving(true);
    if (contactId) {
      await supabase.from("contact_details").update({ email, phone, whatsapp_number: whatsapp }).eq("id", contactId);
    } else {
      const { data } = await supabase.from("contact_details").insert({ email, phone, whatsapp_number: whatsapp }).select().single();
      if (data) setContactId(data.id);
    }
    toast.success("Contact details saved!");
    setSaving(false);
  };

  if (loading) return <p className="text-primary/50 text-center py-8 text-sm">Loading...</p>;

  return (
    <div className="max-w-sm mx-auto space-y-4 sm:space-y-6">
      <h2 className="font-display text-lg sm:text-xl text-primary tracking-wider">Contact Details</h2>

      <div className="gold-border-card rounded-xl bg-card p-4 sm:p-5 space-y-4">
        <div>
          <label className="text-xs text-primary/50 font-body mb-1 flex items-center gap-1.5">
            <Mail className="w-3 h-3" /> Email
          </label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background/50 border-primary/20 text-primary text-sm" />
        </div>
        <div>
          <label className="text-xs text-primary/50 font-body mb-1 flex items-center gap-1.5">
            <Phone className="w-3 h-3" /> Phone
          </label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-background/50 border-primary/20 text-primary text-sm" />
        </div>
        <div>
          <label className="text-xs text-primary/50 font-body mb-1 flex items-center gap-1.5">
            <MessageCircle className="w-3 h-3" /> WhatsApp (without +)
          </label>
          <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="bg-background/50 border-primary/20 text-primary text-sm" />
        </div>
        <Button onClick={handleSave} disabled={saving} className="w-full bg-gold text-emerald-dark hover:bg-gold/90 text-xs sm:text-sm">
          <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default AdminContact;
