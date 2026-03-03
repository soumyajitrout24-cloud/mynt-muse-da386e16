import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Gallery & Profiles", path: "/gallery" },
  { label: "Pricing & Plans", path: "/pricing" },
  { label: "Booking Policy", path: "/booking-policy" },
  { label: "FAQs", path: "/faq" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

const menuVariants = {
  closed: { x: "-100%", opacity: 0.5, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const } },
  open: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const } },
};

const linkVariants = {
  closed: { opacity: 0, x: -30 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.35 + i * 0.05, duration: 0.45, ease: "easeOut" as const },
  }),
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Hamburger Button — hidden when menu is open */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(true)}
            className="fixed top-5 left-5 z-[100] flex flex-col justify-center items-center w-11 h-11 gap-[5px] group rounded-full border border-primary/20 bg-background/80 backdrop-blur-sm hover:border-primary/40 hover:scale-105 transition-all duration-300"
            aria-label="Open menu"
          >
            <span className="block h-[2px] w-5 rounded-full bg-primary transition-all duration-300" />
            <span className="block h-[2px] w-4 rounded-full bg-primary/70 transition-all duration-300" />
            <span className="block h-[2px] w-3 rounded-full bg-primary/50 transition-all duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Curved Luxury Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 z-[95] h-full w-[300px] max-w-[85vw] flex flex-col px-8 pt-20 pb-8"
            style={{
              background: "linear-gradient(180deg, hsl(158 65% 11%) 0%, hsl(156 62% 15%) 50%, hsl(158 65% 11%) 100%)",
              borderRadius: "0 48px 48px 0",
              borderRight: "1px solid hsl(24 72% 52% / 0.35)",
              boxShadow: "8px 0 60px hsl(0 0% 0% / 0.5), 4px 0 20px hsl(24 72% 62% / 0.08)",
            }}
          >
            {/* Gold shine overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: "0 48px 48px 0",
                background: "linear-gradient(160deg, hsl(24 72% 62% / 0.04) 0%, transparent 40%, hsl(24 72% 62% / 0.02) 100%)",
              }}
            />

            {/* Top bar: Brand + Close — proper spacing */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between gap-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="font-display text-sm tracking-[0.15em] text-primary gold-glow truncate"
              >
                Mynt Girlfriend
              </motion.p>

              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                aria-label="Close menu"
              >
                <X className="w-4 h-4 text-primary" />
              </motion.button>
            </div>

            {/* Nav Links — proper top margin to clear header */}
            <ul className="space-y-0.5 relative mt-6 flex-1 flex flex-col justify-center">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.path}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`group/link flex items-center gap-3 py-2 font-elegant text-[15px] md:text-[16px] tracking-wider transition-all duration-300 ${
                      location.pathname === link.path
                        ? "text-primary pl-3"
                        : "text-primary/45 hover:text-primary hover:pl-3"
                    }`}
                  >
                    {location.pathname === link.path && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                        style={{ boxShadow: "0 0 8px hsl(24 72% 62% / 0.6)" }}
                      />
                    )}
                    <span className="relative">
                      {link.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[1px] bg-primary transition-all duration-300 ${
                          location.pathname === link.path ? "w-full" : "w-0 group-hover/link:w-full"
                        }`}
                      />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Bottom Decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-auto relative"
            >
              <div className="gold-divider w-full mb-3" />
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-primary/30">
                Elite Representation
              </p>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
