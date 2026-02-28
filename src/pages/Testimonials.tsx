import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";

interface Review {
  name: string;
  review: string;
  rating: number;
  location: string;
  timestamp: number;
}

const locations = ["Bangalore", "Chennai", "Hyderabad", "Mumbai", "Nashik"];

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({ name: "", review: "", rating: 5, location: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem("testimonials");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Review[];
        setReviews(parsed.sort((a, b) => b.timestamp - a.timestamp));
      } catch {
        setReviews([]);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.review.trim()) newErrors.review = "Review is required";
    if (!form.location) newErrors.location = "Location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newReview: Review = {
      name: form.name.trim(),
      review: form.review.trim(),
      rating: form.rating,
      location: form.location,
      timestamp: Date.now(),
    };

    const stored = localStorage.getItem("testimonials");
    const userReviews = stored ? JSON.parse(stored) as Review[] : [];
    userReviews.push(newReview);
    localStorage.setItem("testimonials", JSON.stringify(userReviews));

    setReviews([newReview, ...reviews]);
    setForm({ name: "", review: "", rating: 5, location: "" });
    setErrors({});
  };

  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-5xl">
        <FadeInSection>
          <div className="text-center mb-16">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">What Clients Say</p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-primary">Client Testimonials</h1>
            <p className="font-elegant text-base text-primary/40 mt-3">Real experiences from our valued clients</p>
            <div className="gold-divider w-20 mx-auto mt-4" />
          </div>
        </FadeInSection>

        {/* Static testimonials */}
        <FadeInSection delay={0.1}>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="gold-border-card rounded-xl p-6 bg-card">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-elegant text-base text-primary/60 leading-relaxed italic mb-4">
                "Truly a professional experience — the quality and poise exceeded expectations."
              </p>
            </div>
            <div className="gold-border-card rounded-xl p-6 bg-card">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-elegant text-base text-primary/60 leading-relaxed italic mb-4">
                "Excellent talent, discreet service, and great conduct."
              </p>
            </div>
          </div>
          <p className="text-center font-elegant text-sm text-primary/40 italic mb-16">
            More testimonials available upon request.
          </p>
        </FadeInSection>

        {/* User submitted reviews */}
        {reviews.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <AnimatePresence>
              {reviews.map((t, i) => (
                <motion.div
                  key={`${t.name}-${t.timestamp}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="gold-border-card rounded-xl p-6 bg-card"
                >
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                    {Array.from({ length: 5 - t.rating }).map((_, j) => (
                      <Star key={`e-${j}`} className="w-3.5 h-3.5 text-primary/20" />
                    ))}
                  </div>
                  <p className="font-elegant text-base text-primary/60 leading-relaxed mb-5 italic">"{t.review}"</p>
                  <div className="gold-divider w-8 mb-3" />
                  <p className="font-body text-sm text-primary tracking-wide">— {t.name}, {t.location}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Review Form */}
        <FadeInSection delay={0.2}>
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl md:text-3xl tracking-wider text-primary">Share Your Experience</h2>
              <div className="gold-divider w-16 mx-auto mt-3" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                  className="w-full bg-card border border-primary/20 rounded-lg px-4 py-3 font-body text-sm text-primary placeholder:text-primary/30 focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-destructive text-xs mt-1 font-body">{errors.name}</p>}
              </div>

              <div>
                <label className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-2">Your Review</label>
                <textarea
                  value={form.review}
                  onChange={(e) => { setForm({ ...form, review: e.target.value }); setErrors({ ...errors, review: "" }); }}
                  rows={4}
                  className="w-full bg-card border border-primary/20 rounded-lg px-4 py-3 font-body text-sm text-primary placeholder:text-primary/30 focus:border-primary/50 focus:outline-none transition-colors resize-none"
                  placeholder="Share your experience..."
                />
                {errors.review && <p className="text-destructive text-xs mt-1 font-body">{errors.review}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-2">Rating</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full bg-card border border-primary/20 rounded-lg px-4 py-3 font-body text-sm text-primary focus:border-primary/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r} className="bg-card text-primary">{r} Star{r > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-2">Location</label>
                  <select
                    value={form.location}
                    onChange={(e) => { setForm({ ...form, location: e.target.value }); setErrors({ ...errors, location: "" }); }}
                    className="w-full bg-card border border-primary/20 rounded-lg px-4 py-3 font-body text-sm text-primary focus:border-primary/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-card text-primary/30">Select</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc} className="bg-card text-primary">{loc}</option>
                    ))}
                  </select>
                  {errors.location && <p className="text-destructive text-xs mt-1 font-body">{errors.location}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-body text-sm tracking-[0.2em] uppercase py-3.5 rounded-lg hover:bg-gold-light transition-colors duration-300"
              >
                Submit Review
              </button>
            </form>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Testimonials;
