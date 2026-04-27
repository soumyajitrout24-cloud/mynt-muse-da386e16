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
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [resetEmail, setResetEmail] = useState("");
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

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to send reset email");
      return;
    }

    toast.success("Reset link sent! Check your inbox (and spam folder).");
    setMode("login");
    setResetEmail("");
  };

  return (
    <div className="min-h-screen bg-emerald-gradient flex items-center justify-center px-4">
      {mode === "login" ? (
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

          <button
            type="button"
            onClick={() => setMode("forgot")}
            className="block w-full text-center text-sm text-gold/80 hover:text-gold transition-colors underline-offset-4 hover:underline"
          >
            Forgot password?
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleForgot}
          className="w-full max-w-sm gold-border-card rounded-2xl bg-card p-8 space-y-6"
        >
          <div className="text-center">
            <img src="/logoo.png" alt="Mynt" className="w-20 mx-auto mb-4 pointer-events-auto" />
            <h1 className="font-display text-2xl text-primary tracking-wider">Reset Password</h1>
            <div className="gold-divider w-16 mx-auto mt-3" />
            <p className="text-xs text-primary/60 mt-3">
              Enter your admin email and we'll send you a reset link.
            </p>
          </div>

          <Input
            type="email"
            placeholder="Admin email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className="bg-background/50 border-primary/20 text-primary placeholder:text-primary/30"
            required
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-emerald-dark font-display tracking-wider hover:bg-gold/90"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

          <button
            type="button"
            onClick={() => setMode("login")}
            className="block w-full text-center text-sm text-gold/80 hover:text-gold transition-colors underline-offset-4 hover:underline"
          >
            Back to login
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminLogin;
