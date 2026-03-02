import { useState } from "react";
import { motion } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";

import img111 from "@/assets/111.jpeg";
import img112 from "@/assets/112.jpeg";
import img113 from "@/assets/113.png";
import img114 from "@/assets/114.png";
import img115 from "@/assets/115.png";
import img116 from "@/assets/116.png";
import img117 from "@/assets/117.png";
import img118 from "@/assets/118.png";
import img119 from "@/assets/119.png";
import img120 from "@/assets/120.png";
import img121 from "@/assets/121.png";
import img122 from "@/assets/122.png";
import img123 from "@/assets/123.png";
import img124 from "@/assets/124.png";
import img125 from "@/assets/125.png";
import img126 from "@/assets/126.png";
import img127 from "@/assets/127.png";
import img128 from "@/assets/128.png";
import img129 from "@/assets/129.png";
import img130 from "@/assets/130.png";

const images = [
  img111, img112, img113, img114, img115, img116, img117, img118, img119, img120,
  img121, img122, img123, img124, img125, img126, img127, img128, img129, img130,
];

const Gallery = () => {
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  return (
    <div className="bg-pink-page min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <FadeInSection>
          <div className="text-center mb-5 md:mb-6">
            <p className="font-elegant text-xs md:text-sm tracking-[0.3em] uppercase text-emerald-dark/50 mb-3">
              Our Portfolio
            </p>
            <h1 className="font-display text-3xl md:text-5xl tracking-wider text-emerald-dark">
              Gallery & Profiles
            </h1>
            <div className="h-[1px] w-20 mx-auto mt-4 bg-gradient-to-r from-transparent via-emerald-dark/40 to-transparent" />
          </div>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
            <p className="font-elegant text-sm md:text-base text-emerald-dark/50 leading-relaxed">
              Explore our carefully curated portfolio — images are watermarked for authenticity.
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative group aspect-[3/4] rounded-xl overflow-hidden border border-gold/20 bg-emerald-dark/5"
            >
              {/* Skeleton placeholder */}
              {!loaded[index] && (
                <div className="absolute inset-0 animate-pulse bg-emerald-dark/10 rounded-xl" />
              )}
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                  loaded[index] ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded((prev) => ({ ...prev, [index]: true }))}
              />
              {/* CSS watermark overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span
                  className="text-white/30 font-display tracking-widest text-lg md:text-2xl"
                  style={{ transform: "rotate(-15deg)" }}
                >
                  Mynt Girlfriend
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
