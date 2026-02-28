import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "Pricing", path: "/pricing" },
  { label: "Contact", path: "/contact" },
  { label: "FAQ", path: "/faq" },
];

const Footer = () => {
  return (
    <footer className="bg-card border-t border-primary/30 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <h3 className="font-display text-xl tracking-[0.2em] text-primary gold-glow">
              MYNT GIRLFRIEND
            </h3>
            <p className="font-elegant text-xs tracking-[0.15em] text-primary/50 mt-1">
              Luxury Model Representation
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-body text-xs tracking-wider text-primary/50 hover:text-primary transition-colors duration-300 uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="text-center md:text-right">
            <p className="font-body text-xs text-primary/40">
              contact@myntgirlfriend.com
            </p>
            <p className="font-body text-xs text-primary/30 mt-1">
              © {new Date().getFullYear()} Mynt Girlfriend
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
