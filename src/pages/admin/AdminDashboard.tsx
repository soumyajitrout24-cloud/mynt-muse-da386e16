import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut, Image, Briefcase, DollarSign, MapPin, Phone, Plus } from "lucide-react";
import AdminGallery from "./AdminGallery";
import AdminServices from "./AdminServices";
import AdminPricing from "./AdminPricing";
import AdminLocations from "./AdminLocations";
import AdminContact from "./AdminContact";

const tabs = [
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "locations", label: "Locations", icon: MapPin },
  { id: "contact", label: "Contact", icon: Phone },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("gallery");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/admin"); return; }

      const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      if (!data) { navigate("/admin"); return; }

      setIsAdmin(true);
      setLoading(false);
    };
    checkAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate("/admin");
  };

  if (loading) return <div className="min-h-screen bg-emerald-gradient flex items-center justify-center"><p className="text-primary animate-pulse font-display text-xl">Loading...</p></div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-emerald-gradient">
      {/* Header */}
      <div className="border-b border-primary/10 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logoo.png" alt="Mynt" className="w-10 pointer-events-auto" />
            <h1 className="font-display text-lg text-primary tracking-wider hidden sm:block">Admin Panel</h1>
          </div>
          <Button onClick={handleLogout} variant="ghost" className="text-primary/60 hover:text-primary">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-primary/10 bg-card/30 overflow-x-auto">
        <div className="container mx-auto px-4 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-body tracking-wide transition-all whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? "border-gold text-gold"
                  : "border-transparent text-primary/40 hover:text-primary/70"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {activeTab === "gallery" && <AdminGallery />}
        {activeTab === "services" && <AdminServices />}
        {activeTab === "pricing" && <AdminPricing />}
        {activeTab === "locations" && <AdminLocations />}
        {activeTab === "contact" && <AdminContact />}
      </div>
    </div>
  );
};

export default AdminDashboard;
