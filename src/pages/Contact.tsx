import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import FadeInSection from "@/components/FadeInSection";

const locations = ["Bangalore", "Chennai", "Hyderabad", "Mumbai", "Nashik"];

const Contact = () => {
  const handleWhatsApp = () => {
    const url = `https://wa.me/919999999999?text=${encodeURIComponent("Hi, I'd like to enquire about MYNT Girlfriend services.")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleEmail = () => {
    window.location.href = "mailto:contact@myntgirlfriend.com?subject=" + encodeURIComponent("Enquiry - MYNT Girlfriend");
  };

  const handlePhone = () => {
    window.location.href = "tel:+919999999999";
  };

  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-3xl">
        <FadeInSection>
          <div className="text-center mb-14">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">Get in Touch</p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-primary">Contact Us</h1>
            <p className="font-elegant text-base text-primary/40 mt-3">Reach out for a private and confidential consultation</p>
            <div className="gold-divider w-20 mx-auto mt-4" />
          </div>
        </FadeInSection>

        {/* 3 CTAs */}
        <FadeInSection delay={0.2}>
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            <button
              onClick={handleWhatsApp}
              className="gold-border-card rounded-xl p-8 bg-card flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg text-primary tracking-wider">WhatsApp</h3>
              <p className="font-elegant text-sm text-primary/40">Chat with us instantly</p>
            </button>

            <button
              onClick={handleEmail}
              className="gold-border-card rounded-xl p-8 bg-card flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg text-primary tracking-wider">Email</h3>
              <p className="font-elegant text-sm text-primary/40">contact@myntgirlfriend.com</p>
            </button>

            <button
              onClick={handlePhone}
              className="gold-border-card rounded-xl p-8 bg-card flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg text-primary tracking-wider">Phone</h3>
              <p className="font-elegant text-sm text-primary/40">Call for consultation</p>
            </button>
          </div>
        </FadeInSection>

        {/* Locations */}
        <FadeInSection delay={0.4}>
          <div className="text-center">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">Where We Operate</p>
            <h2 className="font-display text-2xl md:text-3xl tracking-wider text-primary mb-2">Our Locations</h2>
            <div className="gold-divider w-16 mx-auto mt-3 mb-10" />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {locations.map((loc, i) => (
                <FadeInSection key={loc} delay={0.5 + i * 0.1}>
                  <div className="gold-border-card rounded-xl p-5 bg-card flex flex-col items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary/60" />
                    <p className="font-body text-sm tracking-wider text-primary uppercase">{loc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Contact;
