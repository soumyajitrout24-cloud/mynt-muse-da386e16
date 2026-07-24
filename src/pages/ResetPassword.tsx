import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Lock, Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase parses the recovery token from the URL hash automatically.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirm) return toast.error("Passwords don't match");
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated! Please log in.");
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-emerald-gradient flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm gold-border-card rounded-2xl bg-card p-8 space-y-6"
      >
        <div className="text-center">
          <img src="/logoo.png" alt="Mynt" className="w-20 mx-auto mb-4 pointer-events-auto" />
          <h1 className="font-display text-2xl text-primary tracking-wider">Reset Password</h1>
          <div className="gold-divider w-16 mx-auto mt-3" />
        </div>

        {!ready ? (
          <p className="text-center text-sm text-primary/60 font-body">
            Waiting for recovery link… open this page from the email you received.
          </p>
        ) : (
          <>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50 border-primary/20 text-primary placeholder:text-primary/30 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="bg-background/50 border-primary/20 text-primary placeholder:text-primary/30"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={saving}
              className="w-full bg-gold text-emerald-dark font-display tracking-wider hover:bg-gold/90"
            >
              <Lock className="w-4 h-4 mr-2" />
              {saving ? "Updating..." : "Update password"}
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
