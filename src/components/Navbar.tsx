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
  closed: { x: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const } },
  open: { x: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const } },
};

const linkVariants = {
  closed: { opacity: 0, x: -20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.06, duration: 0.4, ease: "easeOut" as const },
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
        className="fixed top-6 left-6 z-[100] flex flex-col justify-center items-center w-10 h-10 gap-[6px] group"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="block w-7 h-[1.5px] bg-primary origin-center"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.2 }}
          className="block w-7 h-[1.5px] bg-primary origin-center"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="block w-7 h-[1.5px] bg-primary origin-center"
        />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-emerald-dark/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 z-[95] h-full w-[320px] max-w-[85vw] bg-emerald-gradient flex flex-col justify-center px-12 border-r border-primary/20"
          >
            <div className="mb-10">
              <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/60">
                Navigation
              </p>
              <div className="gold-divider w-12 mt-2" />
            </div>

            <ul className="space-y-1">
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
                    className={`block py-2.5 font-elegant text-xl tracking-wider transition-colors duration-300 ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-primary/50 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-12">
              <div className="gold-divider w-full mb-4" />
              <p className="font-elegant text-xs tracking-[0.2em] uppercase text-primary/40">
                MYNT GIRLFRIEND
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
