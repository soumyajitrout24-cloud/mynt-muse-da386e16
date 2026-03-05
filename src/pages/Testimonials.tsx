import { useState, useEffect, useCallback } from "react";
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

const API_URL = "https://sheetdb.io/api/v1/yjqjpfl7iz1fz";

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form, setForm] = useState({ name: "", review: "", rating: 5, location: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [lastSubmit, setLastSubmit] = useState(0);

  /* FETCH REVIEWS FROM SHEETDB */

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const parsed: Review[] = data.map((r: any) => ({
          name: r.name,
          review: r.review,
          rating: Number(r.rating),
          location: r.location,
          timestamp: Number(r.timestamp),
        }));

        setReviews(parsed.sort((a, b) => b.timestamp - a.timestamp));
      })
      .catch(() => setReviews([]));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) return;

    if (Date.now() - lastSubmit < 10000) {
      setErrors({ form: "Please wait before submitting again." });
      return;
    }

    const newErrors: Record<string, string> = {};
    const name = form.name.trim();
    const review = form.review.trim();

    if (!name || name.length < 2) newErrors.name = "Name must be at least 2 characters";
    if (name.length > 50) newErrors.name = "Name must be under 50 characters";
    if (!review || review.length < 10) newErrors.review = "Review must be at least 10 characters";
    if (review.length > 500) newErrors.review = "Review must be under 500 characters";
    if (!form.location) newErrors.location = "Location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newReview: Review = {
      name,
      review,
      rating: form.rating,
      location: form.location,
      timestamp: Date.now(),
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: newReview,
        }),
      });

      setReviews([newReview, ...reviews]);

      setForm({ name: "", review: "", rating: 5, location: "" });
      setErrors({});
      setLastSubmit(Date.now());

    } catch {
      setErrors({ form: "Failed to submit review." });
    }

  }, [form, honeypot, lastSubmit, reviews]);

  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-5xl">
        <FadeInSection>
          <div className="text-center mb-16">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">
              What Clients Say
            </p>
            <h1 className="font-display text-3xl md:text-5xl tracking-wider text-primary">
              Client Testimonials
            </h1>
            <p className="font-elegant text-sm md:text-base text-primary/40 mt-3">
              Real experiences from our valued clients
            </p>
            <div className="gold-divider w-20 mx-auto mt-4" />
          </div>
        </FadeInSection>

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
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                    {Array.from({ length: 5 - t.rating }).map((_, j) => (
                      <Star key={`e-${j}`} className="w-4 h-4 text-primary/20" />
                    ))}
                  </div>

                  <p className="font-elegant text-sm md:text-base text-primary/60 leading-relaxed mb-5 italic">
                    "{t.review}"
                  </p>

                  <div className="gold-divider w-8 mb-3" />

                  <p className="font-body text-xs md:text-sm text-primary tracking-wide">
                    — {t.name}, {t.location}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {reviews.length === 0 && (
          <FadeInSection delay={0.1}>
            <p className="text-center font-elegant text-sm md:text-base text-primary/35 mb-16 italic">
              Be the first to share your experience.
            </p>
          </FadeInSection>
        )}

        <FadeInSection delay={0.2}>
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-xl md:text-3xl tracking-wider text-primary">
                Share Your Experience
              </h2>
              <div className="gold-divider w-16 mx-auto mt-3" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute opacity-0 pointer-events-none h-0 w-0"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <label className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                  maxLength={50}
                  className="w-full bg-card border border-primary/20 rounded-lg px-4 py-3 font-body text-sm text-primary placeholder:text-primary/30 focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-2">
                  Your Review
                </label>
                <textarea
                  value={form.review}
                  onChange={(e) => { setForm({ ...form, review: e.target.value }); setErrors({ ...errors, review: "" }); }}
                  rows={4}
                  maxLength={500}
                  className="w-full bg-card border border-primary/20 rounded-lg px-4 py-3 font-body text-sm text-primary placeholder:text-primary/30 focus:border-primary/50 focus:outline-none transition-colors resize-none"
                  placeholder="Share your experience (at least 10 characters)..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                  className="w-full bg-card border border-primary/20 rounded-lg px-4 py-3 font-body text-sm text-primary"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
                  ))}
                </select>

                <select
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full bg-card border border-primary/20 rounded-lg px-4 py-3 font-body text-sm text-primary"
                >
                  <option value="">Select</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-emerald-900 font-body text-sm tracking-[0.2em] uppercase py-3.5 rounded-lg hover:opacity-90 transition-opacity duration-300"
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