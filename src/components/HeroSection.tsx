import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-model.png";
import logoLotus from "@/assets/logo-lotus.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Mynt Girlfriend - Elite Indian Model & Companion Service"
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-dark/70 via-emerald-dark/40 to-emerald-dark/90" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Lotus Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-4"
        >
          <img src={logoLotus} alt="Mynt Girlfriend Logo" className="w-14 h-14 md:w-16 md:h-16 mx-auto object-contain" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-elegant text-sm md:text-base tracking-[0.4em] uppercase text-primary/70 mb-4"
        >
          Elite Indian Model & Companion Service
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] text-primary gold-glow mb-6"
        >
          Mynt
          <br />
          <span className="font-elegant italic text-4xl md:text-5xl lg:text-6xl tracking-[0.2em]">
            Girlfriend
          </span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="gold-divider w-32 mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="font-body text-xs md:text-sm tracking-[0.2em] uppercase text-primary/60 mb-4"
        >
          India's Premier Model Service for Discerning Clients
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="font-elegant text-base md:text-lg text-primary/50 leading-relaxed max-w-2xl mx-auto mb-8"
        >
          We bridge extraordinary talent with elevated experiences, designed for high-quality consumption at fair value. Combining professionalism, care, discretion, and premium service standards.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/contact"
            className="bg-primary text-primary-foreground font-body text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-full hover:bg-gold-light transition-colors duration-300"
          >
            Book Consultation
          </Link>
          <Link
            to="/services"
            className="border border-primary/40 text-primary font-body text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-full hover:border-primary/80 transition-colors duration-300"
          >
            View Services
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-elegant text-xs tracking-[0.2em] text-primary/40">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-primary/40 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
