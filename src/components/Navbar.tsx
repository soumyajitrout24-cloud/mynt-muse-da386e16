import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "Profiles", path: "/profiles" },
  { label: "Pricing", path: "/pricing" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
  { label: "FAQ", path: "/faq" },
  { label: "Booking Policy", path: "/booking-policy" },
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
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-[100] flex flex-col justify-center items-center w-12 h-12 gap-[7px] group"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 9, width: 28 } : { rotate: 0, y: 0, width: 28 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="block h-[1.5px] bg-primary origin-center"
          style={{ width: 28 }}
        />
        <motion.span
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.25 }}
          className="block w-5 h-[1.5px] bg-primary origin-center"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -9, width: 28 } : { rotate: 0, y: 0, width: 20 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="block h-[1.5px] bg-primary origin-center self-start ml-[2px]"
          style={{ width: 20 }}
        />
      </button>

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
            className="fixed top-0 left-0 z-[95] h-full w-[300px] max-w-[85vw] flex flex-col justify-center px-10 curved-navbar"
            style={{
              background: "linear-gradient(180deg, hsl(158 65% 11%) 0%, hsl(156 62% 15%) 50%, hsl(158 65% 11%) 100%)",
              borderRadius: "0 60px 60px 0",
              borderRight: "1px solid hsl(43 56% 42% / 0.35)",
              boxShadow: "8px 0 60px hsl(0 0% 0% / 0.5), 4px 0 20px hsl(43 56% 52% / 0.08), inset -1px 0 0 hsl(43 56% 52% / 0.1)",
            }}
          >
            {/* Subtle gold shine overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: "0 60px 60px 0",
                background: "linear-gradient(160deg, hsl(43 56% 52% / 0.04) 0%, transparent 40%, hsl(43 56% 52% / 0.02) 100%)",
              }}
            />

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-10 relative"
            >
              <p className="font-display text-lg tracking-[0.2em] text-primary gold-glow">
                MYNT
              </p>
              <p className="font-elegant italic text-sm tracking-[0.15em] text-primary/60">
                Girlfriend
              </p>
              <div className="gold-divider w-16 mt-3" />
            </motion.div>

            {/* Nav Links */}
            <ul className="space-y-0.5 relative">
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
                    className={`group/link flex items-center gap-3 py-2.5 font-elegant text-lg tracking-wider transition-all duration-400 ${
                      location.pathname === link.path
                        ? "text-primary pl-3"
                        : "text-primary/45 hover:text-primary hover:pl-3"
                    }`}
                  >
                    {/* Active indicator dot */}
                    {location.pathname === link.path && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                        style={{ boxShadow: "0 0 8px hsl(43 56% 52% / 0.6)" }}
                      />
                    )}
                    <span className="relative">
                      {link.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-[1px] bg-primary transition-all duration-400 ${
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
              className="mt-10 relative"
            >
              <div className="gold-divider w-full mb-4" />
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-primary/30">
                Elite Representation
              </p>
              {/* Decorative dots */}
              <div className="flex gap-1.5 mt-3">
                <span className="w-1 h-1 rounded-full bg-primary/20" />
                <span className="w-1 h-1 rounded-full bg-primary/30" />
                <span className="w-1 h-1 rounded-full bg-primary/20" />
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
