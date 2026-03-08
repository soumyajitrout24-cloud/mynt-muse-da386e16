import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

const isActivePath = (pathname: string, path: string) => {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const handleNavigate = useCallback(
    (path: string) => {
      setIsOpen(false);
      navigate(path);
    },
    [navigate],
  );

  useEffect(() => {
    setIsOpen(false);
  }, [location.key]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeMenu]);

  return (
    <>
      <button
        type="button"
        onClick={openMenu}
        className={`fixed left-4 top-4 z-[240] flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-card/95 shadow-luxury backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/60 sm:left-5 sm:top-5 ${
          isOpen ? "pointer-events-none scale-90 opacity-0" : "pointer-events-auto scale-100 opacity-100"
        }`}
        aria-label="Open navigation menu"
      >
        <div className="flex flex-col items-center justify-center gap-[4px]">
          <span className="block h-[2px] w-5 rounded-full bg-primary" />
          <span className="block h-[2px] w-4 rounded-full bg-primary/75" />
          <span className="block h-[2px] w-3 rounded-full bg-primary/55" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[225] bg-background/75 backdrop-blur-sm"
              onClick={closeMenu}
            />

            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="fixed left-0 top-0 z-[230] flex h-full w-[320px] max-w-[88vw] flex-col border-r border-primary/25 bg-card px-7 pb-7 pt-20 shadow-luxury"
              aria-label="Main navigation"
            >
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                <p className="font-display text-sm tracking-[0.16em] text-primary gold-glow">Mynt Girlfriend</p>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:border-primary/60 hover:bg-primary/10"
                  aria-label="Close navigation menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <ul className="mt-6 flex flex-1 flex-col justify-center gap-1">
                {navLinks.map((link, index) => {
                  const active = isActivePath(location.pathname, link.path);

                  return (
                    <motion.li
                      key={link.path}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + index * 0.03 }}
                    >
                      <button
                        type="button"
                        onClick={() => handleNavigate(link.path)}
                        className={`group flex w-full items-center gap-3 py-2.5 text-left font-elegant tracking-wider transition-all duration-300 ${
                          active ? "pl-3 text-primary" : "text-primary/50 hover:pl-3 hover:text-primary"
                        }`}
                      >
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                        <span className="relative text-[15px] md:text-base">
                          {link.label}
                          <span
                            className={`absolute -bottom-0.5 left-0 h-[1px] bg-primary transition-all duration-300 ${
                              active ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                          />
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-auto">
                <div className="gold-divider mb-3 w-full" />
                <p className="font-body text-[10px] uppercase tracking-[0.24em] text-primary/35">Elite Representation</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

