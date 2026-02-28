import { motion } from "framer-motion";
import heroImage from "@/assets/hero-model.png";

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
          alt="MYNT Girlfriend - Premium Model Representation"
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-dark/70 via-emerald-dark/40 to-emerald-dark/90" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-elegant text-sm md:text-base tracking-[0.4em] uppercase text-primary/70 mb-4"
        >
          Luxury Model Representation
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] text-primary gold-glow mb-6"
        >
          MYNT
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
          transition={{ delay: 1.4, duration: 0.8 }}
          className="font-body text-xs md:text-sm tracking-[0.25em] uppercase text-primary/50 max-w-md mx-auto"
        >
          Where elegance meets excellence
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
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
