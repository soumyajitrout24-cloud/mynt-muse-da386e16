import { useEffect, useState } from "react";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import FadeInSection from "@/components/FadeInSection";
import { useNavigate } from "react-router-dom";

const fallbackLocations = ["Bangalore", "Chennai", "Hyderabad", "Mumbai", "Nashik"];

const Contact = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: contact } = useQuery({
    queryKey: ["contact_details"],
    queryFn: async () => {
      const { data } = await supabase.from("contact_details").select("*").limit(1).single();
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: locationCities } = useQuery({
    queryKey: ["location_cities"],
    queryFn: async () => {
      const { data } = await supabase.from("locations").select("city");
      if (!data?.length) return fallbackLocations;
      const unique = [...new Set(data.map((l) => l.city))];
      return unique.length ? unique : fallbackLocations;
    },
    staleTime: 5 * 60 * 1000,
  });

  const CONTACT_EMAIL = contact?.email || "myntgirlfriend@gmail.com";
  const CONTACT_PHONE = contact?.phone || "+91 9686239724";
  const WA_NUMBER = contact?.whatsapp_number || "919686239724";
  const locations = locationCities || fallbackLocations;

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi, I'd like to enquire about Mynt Girlfriend services.")}`, "_blank", "noopener,noreferrer");
  };

  const handleLocationClick = (city: string) => {
    navigate(`/locations/${city.toLowerCase()}`);
  };

  const handleEmailClick = () => {
    const subject = "Enquiry - Mynt Girlfriend";
    const body = `Hi Team,%0A%0AI am interested in your Mynt Girlfriend services and would like to know more.%0A%0APlease find my details below:%0A- Name:%0A- Contact Number:%0A- Preferred Date:%0A- Any special requests:%0A%0AThank you for your time.%0ABest regards,%0A[Your Name]`;
    if (isMobile) {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
    } else {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${encodeURIComponent(subject)}&body=${body}`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-3xl">
        <FadeInSection>
          <div className="text-center mb-12 md:mb-14">
            <p className="font-elegant text-xs md:text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">Get in Touch</p>
            <h1 className="font-display text-3xl md:text-5xl tracking-wider text-primary">Contact Us</h1>
            <div className="gold-divider w-20 mx-auto mt-4" />
            <p className="font-elegant text-sm md:text-base text-primary/45 mt-4 max-w-lg mx-auto">
              Ready to book, enquire, or receive a tailored consultation? Reach out via WhatsApp or email.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-14 md:mb-16">
            <button onClick={handleWhatsApp} className="gold-border-card rounded-xl p-6 md:p-8 bg-card flex flex-col items-center gap-3 md:gap-4 cursor-pointer transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-primary/30 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="font-display text-base md:text-lg text-primary tracking-wider">WhatsApp</h3>
              <p className="font-elegant text-xs md:text-sm text-primary/40">Chat with us instantly</p>
            </button>

            <button onClick={handleEmailClick} className="gold-border-card rounded-xl p-6 md:p-8 bg-card flex flex-col items-center gap-3 md:gap-4 cursor-pointer transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-primary/30 flex items-center justify-center">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="font-display text-base md:text-lg text-primary tracking-wider">Email</h3>
              <p className="font-elegant text-xs md:text-sm text-primary/40">{CONTACT_EMAIL}</p>
            </button>

            <a href={`tel:${CONTACT_PHONE}`} className="gold-border-card rounded-xl p-6 md:p-8 bg-card flex flex-col items-center gap-3 md:gap-4 transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-primary/30 flex items-center justify-center">
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="font-display text-base md:text-lg text-primary tracking-wider">Phone</h3>
              <p className="font-elegant text-xs md:text-sm text-primary/40">Call for consultation</p>
            </a>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="text-center">
            <p className="font-elegant text-xs md:text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">Where We Operate</p>
            <h2 className="font-display text-xl md:text-3xl tracking-wider text-primary mb-2">Our Locations</h2>
            <div className="gold-divider w-16 mx-auto mt-3 mb-8 md:mb-10" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
              {locations.map((loc, i) => (
                <FadeInSection key={loc} delay={0.5 + i * 0.08}>
                  <div onClick={() => handleLocationClick(loc)} className="gold-border-card rounded-xl p-4 md:p-5 bg-card flex flex-col items-center gap-2 md:gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary/60" />
                    <p className="font-body text-[10px] md:text-xs tracking-wider text-primary uppercase">{loc}</p>
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
