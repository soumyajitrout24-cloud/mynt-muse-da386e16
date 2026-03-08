import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LogOut, Image, Briefcase, DollarSign, MapPin, Phone, Lock, Eye, EyeOff } from "lucide-react";
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
  { id: "password", label: "Password", icon: Lock },
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
        <div className="container mx-auto px-3 sm:px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <img src="/logoo.png" alt="Mynt" className="w-8 sm:w-10 pointer-events-auto" />
            <h1 className="font-display text-sm sm:text-lg text-primary tracking-wider">Admin Panel</h1>
          </div>
          <Button onClick={handleLogout} variant="ghost" size="sm" className="text-primary/60 hover:text-primary text-xs sm:text-sm">
            <LogOut className="w-4 h-4 mr-1 sm:mr-2" /> <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Tabs - horizontal scroll on mobile */}
      <div className="border-b border-primary/10 bg-card/30 overflow-x-auto scrollbar-hide">
        <div className="container mx-auto px-2 sm:px-4 flex gap-0 sm:gap-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-body tracking-wide transition-all whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? "border-gold text-gold"
                  : "border-transparent text-primary/40 hover:text-primary/70"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {activeTab === "gallery" && <AdminGallery />}
        {activeTab === "services" && <AdminServices />}
        {activeTab === "pricing" && <AdminPricing />}
        {activeTab === "locations" && <AdminLocations />}
        {activeTab === "contact" && <AdminContact />}
        {activeTab === "password" && <ChangePassword />}
      </div>
    </div>
  );
};

const ChangePassword = () => {
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-sm mx-auto space-y-6">
      <h2 className="font-display text-lg sm:text-xl text-primary tracking-wider">Change Password</h2>
      <div className="gold-border-card rounded-xl bg-card p-4 sm:p-5 space-y-4">
        <div>
          <label className="text-xs text-primary/50 font-body mb-1 block">New Password</label>
          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-background/50 border-primary/20 text-primary pr-10"
            />
            <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40">
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs text-primary/50 font-body mb-1 block">Confirm Password</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-background/50 border-primary/20 text-primary"
          />
        </div>
        <Button onClick={handleChange} disabled={saving} className="w-full bg-gold text-emerald-dark hover:bg-gold/90 text-xs sm:text-sm">
          <Lock className="w-4 h-4 mr-2" /> {saving ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
