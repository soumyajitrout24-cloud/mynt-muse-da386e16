import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase puts a recovery session in the URL hash; the client
    // automatically processes it. We just confirm a session exists.
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setReady(true);
      } else {
        // Listen briefly for the PASSWORD_RECOVERY event
        const { data: sub } = supabase.auth.onAuthStateChange((event) => {
          if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
            setReady(true);
          }
        });
        setTimeout(() => sub.subscription.unsubscribe(), 5000);
      }
    };
    check();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to update password");
      return;
    }

    toast.success("Password updated! Please sign in.");
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
          <h1 className="font-display text-2xl text-primary tracking-wider">Set New Password</h1>
          <div className="gold-divider w-16 mx-auto mt-3" />
        </div>

        {!ready ? (
          <p className="text-center text-sm text-primary/70">
            Validating reset link…
          </p>
        ) : (
          <>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="New password (min 8 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-primary/20 text-primary placeholder:text-primary/30"
                required
              />
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
              disabled={loading}
              className="w-full bg-gold text-emerald-dark font-display tracking-wider hover:bg-gold/90"
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </>
        )}

        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="block w-full text-center text-sm text-gold/80 hover:text-gold transition-colors underline-offset-4 hover:underline"
        >
          Back to login
        </button>
      </form>
    </div>
  );
};

export default AdminResetPassword;
