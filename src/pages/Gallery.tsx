import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";

const categories = ["All", "High Fashion Models", "Professional Hosts", "Brand Ambassadors", "Lifestyle Models"];

const galleryItems = [
  { id: 1, category: "High Fashion Models", name: "Aria V.", desc: "Editorial & Runway" },
  { id: 2, category: "Professional Hosts", name: "Meera S.", desc: "Corporate Events" },
  { id: 3, category: "Brand Ambassadors", name: "Zara K.", desc: "Brand Campaigns" },
  { id: 4, category: "Lifestyle Models", name: "Priya R.", desc: "Lifestyle & Hospitality" },
  { id: 5, category: "High Fashion Models", name: "Ananya D.", desc: "Fashion Editorials" },
  { id: 6, category: "Professional Hosts", name: "Kavya M.", desc: "Premium Events" },
  { id: 7, category: "Brand Ambassadors", name: "Riya P.", desc: "Luxury Brands" },
  { id: 8, category: "Lifestyle Models", name: "Nisha T.", desc: "Lifestyle Shoots" },
];

const Gallery = () => {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? galleryItems : galleryItems.filter((g) => g.category === active);

  return (
    <div className="bg-pink-page min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <FadeInSection>
          <div className="text-center mb-12">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-emerald-dark/50 mb-3">
              Our Portfolio
            </p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-emerald-dark">
              Gallery
            </h1>
            <div className="h-[1px] w-20 mx-auto mt-4 bg-gradient-to-r from-transparent via-emerald-dark/40 to-transparent" />
          </div>
        </FadeInSection>

        {/* Filter Bar */}
        <FadeInSection delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-body text-xs tracking-wider uppercase px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  active === cat
                    ? "bg-gold text-emerald-dark border-gold"
                    : "border-gold/50 text-emerald-dark/60 hover:border-gold hover:text-emerald-dark"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeInSection>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-gold/20 bg-emerald-dark/5"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-dark/10 to-emerald-dark/60 flex items-end p-4">
                  <div>
                    <h3 className="font-display text-lg text-pink-page">{item.name}</h3>
                    <p className="font-elegant text-xs tracking-wider text-pink-page/70">{item.desc}</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-6xl text-emerald-dark/10">{item.id}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
