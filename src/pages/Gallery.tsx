import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";

const categories = ["All", "High Fashion Models", "Event Hosts", "Brand Ambassadors", "Lifestyle Models"];

const galleryItems = [
  { id: 1, category: "High Fashion Models", name: "Aria V.", desc: "Editorial & Runway", image: gallery1 },
  { id: 2, category: "Event Hosts", name: "Meera S.", desc: "Corporate Events", image: gallery2 },
  { id: 3, category: "Brand Ambassadors", name: "Zara K.", desc: "Brand Campaigns", image: gallery3 },
  { id: 4, category: "Lifestyle Models", name: "Priya R.", desc: "Lifestyle & Hospitality", image: gallery4 },
  { id: 5, category: "High Fashion Models", name: "Ananya D.", desc: "Fashion Editorials", image: gallery5 },
  { id: 6, category: "Event Hosts", name: "Kavya M.", desc: "Premium Events", image: gallery6 },
  { id: 7, category: "Brand Ambassadors", name: "Riya P.", desc: "Luxury Brands", image: gallery7 },
  { id: 8, category: "Lifestyle Models", name: "Nisha T.", desc: "Lifestyle Shoots", image: gallery8 },
];

const Gallery = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? galleryItems : galleryItems.filter((g) => g.category === active);

  return (
    <div className="bg-pink-page min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <FadeInSection>
          <div className="text-center mb-6">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-emerald-dark/50 mb-3">
              Our Portfolio
            </p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-emerald-dark">
              Gallery & Profiles
            </h1>
            <div className="h-[1px] w-20 mx-auto mt-4 bg-gradient-to-r from-transparent via-emerald-dark/40 to-transparent" />
          </div>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="font-elegant text-base text-emerald-dark/50 leading-relaxed mb-4">
              Explore our carefully curated portfolio of models — each verified and presented with true, unedited images and professional details. No exaggerated claims, no filters — real profiles, real talent.
            </p>
            <p className="font-elegant text-sm text-emerald-dark/40 italic">
              Full gallery access is available upon advance reservation and private consultation.
            </p>
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
                className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-gold/20"
              >
                <img
                  src={item.image}
                  alt={`${item.name} - ${item.desc}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-dark/80 flex items-end p-4">
                  <div>
                    <h3 className="font-display text-lg text-pink-page">{item.name}</h3>
                    <p className="font-elegant text-xs tracking-wider text-pink-page/70">{item.desc}</p>
                  </div>
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
