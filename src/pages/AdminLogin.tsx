import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error("Invalid credentials");
      setLoading(false);
      return;
    }

    // Check admin role
    const { data: roleData } = await supabase.rpc("has_role", {
      _user_id: data.user.id,
      _role: "admin",
    });

    if (!roleData) {
      await supabase.auth.signOut();
      toast.error("You are not authorized as admin");
      setLoading(false);
      return;
    }

    toast.success("Welcome, Admin!");
    navigate("/admin/dashboard");
    setLoading(false);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setResetLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Recovery link sent! Check your inbox.");
      setResetOpen(false);
      setResetEmail("");
    }
  };


  return (
    <div className="min-h-screen bg-emerald-gradient flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm gold-border-card rounded-2xl bg-card p-8 space-y-6"
      >
        <div className="text-center">
          <img src="/logoo.png" alt="Mynt" className="w-20 mx-auto mb-4 pointer-events-auto" />
          <h1 className="font-display text-2xl text-primary tracking-wider">Admin Login</h1>
          <div className="gold-divider w-16 mx-auto mt-3" />
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background/50 border-primary/20 text-primary placeholder:text-primary/30"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-background/50 border-primary/20 text-primary placeholder:text-primary/30"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-emerald-dark font-display tracking-wider hover:bg-gold/90"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        {!resetOpen ? (
          <button
            type="button"
            onClick={() => { setResetOpen(true); setResetEmail(email); }}
            className="w-full text-center text-xs text-primary/60 hover:text-gold tracking-wide"
          >
            Forgot password?
          </button>
        ) : (
          <div className="space-y-3 pt-2 border-t border-primary/10">
            <p className="text-xs text-primary/60 font-body text-center">
              Enter your admin email to receive a recovery link.
            </p>
            <Input
              type="email"
              placeholder="Admin email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="bg-background/50 border-primary/20 text-primary placeholder:text-primary/30"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleReset}
                disabled={resetLoading}
                className="flex-1 bg-gold text-emerald-dark hover:bg-gold/90 text-xs"
              >
                {resetLoading ? "Sending..." : "Send recovery link"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setResetOpen(false)}
                className="text-primary/60 text-xs"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};


export default AdminLogin;
