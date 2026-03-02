import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/spa/hero_img.png";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mynt Girlfriend - Elite Indian Model & Companion Service"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Slightly darker overlay for gold contrast */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto mt-24 md:mt-32 text-gold">

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-elegant text-sm md:text-base tracking-[0.4em] uppercase mb-4"
        >
          Elite Indian Model & Companion Service
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] mb-6"
        >
          Mynt
          <br />
          <span className="font-elegant italic text-4xl md:text-5xl lg:text-6xl tracking-[0.2em]">
            Girlfriend
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="w-32 h-[2px] mx-auto mb-6 bg-gold"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="font-body text-xs md:text-sm tracking-[0.2em] uppercase mb-4"
        >
          India's Premier Model Service for Discerning Clients
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="font-elegant text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
        >
          We bridge extraordinary talent with elevated experiences, designed for
          high-quality consumption at fair value. Combining professionalism,
          care, discretion, and premium service standards.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/contact"
            className="bg-gold text-black font-body text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-full hover:opacity-90 transition duration-300"
          >
            Book Consultation
          </Link>

          <Link
            to="/services"
            className="border border-gold text-gold font-body text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-full hover:bg-gold hover:text-black transition duration-300"
          >
            View Services
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;