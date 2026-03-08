import { useEffect, useState } from "react";
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

const CONTACT_EMAIL = "myntgirlfriend@gmail.com";
const CONTACT_PHONE = "+91 9686239724";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEmailClick = () => {
    const subject = "Enquiry - Mynt Girlfriend";
    const body = `Hi Team,

I am interested in your Mynt Girlfriend services and would like to know more.

Please find my details below:
- Name:
- Contact Number:
- Preferred Date:
- Any special requests:

Thank you for your time.
Best regards,
[Your Name]`;

    if (isMobile) {
      // Mobile: open mailto link
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    } else {
      // Desktop: open Gmail web
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <footer className="bg-card border-t border-primary/20 pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div>
            <h3 className="font-display text-xl md:text-2xl tracking-[0.15em] text-primary gold-glow mb-2">
              Mynt Girlfriend
            </h3>
            <p className="font-elegant text-xs md:text-sm text-primary/40 leading-relaxed mt-3">
              Elite Indian Model & Companion Service. Where elegance meets excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-primary/50 mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-1.5">
              {footerLinks.slice(0, 5).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-elegant text-xs md:text-sm tracking-wider text-primary/40 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-primary/50 mb-4">
              Explore
            </h4>
            <nav className="flex flex-col gap-1.5">
              {footerLinks.slice(5).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-elegant text-xs md:text-sm tracking-wider text-primary/40 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Locations & Contact */}
          <div>
            <h4 className="font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-primary/50 mb-4">
              Locations
            </h4>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {locations.map((loc) => (
                <Link
                  key={loc}
                  to={`/locations/${loc.toLowerCase()}`}
                  className="inline-flex items-center gap-1 font-elegant text-[10px] md:text-xs tracking-wider text-primary/40 border border-primary/15 rounded-full px-2.5 py-1 transition-all duration-300 hover:text-primary hover:border-primary/40 hover:-translate-y-[1px]"
                >
                  <MapPin className="w-2.5 h-2.5" />
                  {loc}
                </Link>
              ))}
            </div>

            <div className="space-y-1.5">
              {/* Email */}
              <button
                onClick={handleEmailClick}
                className="flex items-center gap-2 font-elegant text-[10px] md:text-xs text-primary/40 hover:text-primary transition-colors"
              >
                <Mail className="w-3 h-3" />
                {CONTACT_EMAIL}
              </button>

              {/* Phone */}
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="flex items-center gap-2 font-elegant text-[10px] md:text-xs text-primary/40 hover:text-primary transition-colors"
              >
                <Phone className="w-3 h-3" />
                {CONTACT_PHONE}
              </a>
            </div>
          </div>
        </div>

        <div className="gold-divider w-full mb-5" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-body text-[9px] md:text-[10px] tracking-[0.15em] text-primary/25 uppercase">
            © {new Date().getFullYear()} Mynt Girlfriend. All rights reserved.
          </p>

          <p className="font-elegant text-[9px] md:text-[10px] tracking-[0.2em] text-primary/20 uppercase">
            Discretion · Excellence · Exclusivity
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;