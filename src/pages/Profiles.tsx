import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";

const categories = ["All", "High Fashion Models", "Professional Hosts", "Brand Ambassadors", "Lifestyle Models"];

const profiles = [
  { id: 1, name: "Aria Verma", category: "High Fashion Models", location: "Mumbai", height: "5'9\"", experience: "6 years" },
  { id: 2, name: "Meera Shah", category: "Professional Hosts", location: "Bangalore", height: "5'7\"", experience: "4 years" },
  { id: 3, name: "Zara Khan", category: "Brand Ambassadors", location: "Chennai", height: "5'8\"", experience: "5 years" },
  { id: 4, name: "Priya Reddy", category: "Lifestyle Models", location: "Hyderabad", height: "5'6\"", experience: "3 years" },
  { id: 5, name: "Ananya Das", category: "High Fashion Models", location: "Mumbai", height: "5'10\"", experience: "7 years" },
  { id: 6, name: "Kavya Menon", category: "Professional Hosts", location: "Nashik", height: "5'7\"", experience: "4 years" },
];

const Profiles = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? profiles : profiles.filter((p) => p.category === active);

  return (
    <div className="bg-pink-page min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <FadeInSection>
          <div className="text-center mb-12">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-emerald-dark/50 mb-3">Our Talent</p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-emerald-dark">Profiles</h1>
            <div className="h-[1px] w-20 mx-auto mt-4 bg-gradient-to-r from-transparent via-emerald-dark/40 to-transparent" />
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-body text-xs tracking-wider uppercase px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  active === cat
                    ? "bg-gold text-emerald-dark border-gold"
                    : "border-gold/50 text-emerald-dark/60 hover:border-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((profile) => (
              <motion.div
                key={profile.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="border border-gold/20 rounded-xl p-6 bg-emerald-dark/5 hover:border-gold/40 hover:shadow-gold transition-all duration-400"
              >
                <div className="aspect-[3/4] rounded-lg bg-emerald-dark/10 mb-4 flex items-center justify-center">
                  <span className="font-display text-5xl text-emerald-dark/10">{profile.name[0]}</span>
                </div>
                <h3 className="font-display text-xl text-emerald-dark mb-1">{profile.name}</h3>
                <p className="font-elegant text-sm text-emerald-dark/50 mb-3">{profile.category}</p>
                <div className="space-y-1 font-body text-xs text-emerald-dark/40">
                  <p>📍 {profile.location}</p>
                  <p>📏 {profile.height}</p>
                  <p>⭐ {profile.experience}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
