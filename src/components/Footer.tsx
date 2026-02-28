import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

const footerLinks = [
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

const locations = ["Bangalore", "Chennai", "Hyderabad", "Mumbai", "Nashik"];

const Footer = () => {
  return (
    <footer className="bg-card border-t-2 border-primary/30 pt-14 pb-8">
      <div className="gold-divider w-full mb-10 opacity-40" />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl tracking-[0.15em] text-primary gold-glow mb-2">
              Mynt Girlfriend
            </h3>
            <p className="font-elegant text-sm text-primary/40 leading-relaxed mt-3">
              Elite Indian Model & Companion Service. Where elegance meets excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-primary/50 mb-5">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.slice(0, 5).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-elegant text-sm tracking-wider text-primary/40 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-primary/50 mb-5">Explore</h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.slice(5).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-elegant text-sm tracking-wider text-primary/40 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Locations & Contact */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase text-primary/50 mb-5">Locations</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {locations.map((loc) => (
                <span
                  key={loc}
                  className="inline-flex items-center gap-1.5 font-elegant text-xs tracking-wider text-primary/40 border border-primary/15 rounded-full px-3 py-1"
                >
                  <MapPin className="w-3 h-3" />
                  {loc}
                </span>
              ))}
            </div>

            <div className="space-y-2">
              <a href="mailto:contact@myntgirlfriend.com" className="flex items-center gap-2 font-elegant text-xs text-primary/40 hover:text-primary transition-colors">
                <Mail className="w-3.5 h-3.5" />
                contact@myntgirlfriend.com
              </a>
              <a href="tel:+919999999999" className="flex items-center gap-2 font-elegant text-xs text-primary/40 hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5" />
                +91 99999 99999
              </a>
            </div>
          </div>
        </div>

        <div className="gold-divider w-full mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-[10px] tracking-[0.15em] text-primary/25 uppercase">
            © {new Date().getFullYear()} Mynt Girlfriend. All rights reserved.
          </p>
          <div className="flex gap-1.5">
            <span className="w-1 h-1 rounded-full bg-primary/20" />
            <span className="w-1 h-1 rounded-full bg-primary/30" />
            <span className="w-1 h-1 rounded-full bg-primary/20" />
          </div>
          <p className="font-elegant text-[10px] tracking-[0.2em] text-primary/20 uppercase">
            Discretion · Excellence · Exclusivity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
