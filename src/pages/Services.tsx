import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import FadeInSection from "@/components/FadeInSection";

// Fallback data
const fallbackServices = [
  { id: "1", title: "Elite Companion Experiences", description: "Whether for special occasions, private events, social evenings, or personal engagements — our companions add grace, elegance, and presence that elevate your experience.", features: ["Special occasions", "Private events", "Social evenings", "Personal engagements"] },
  { id: "2", title: "Event & Social Engagements", description: "From corporate parties and product launches to weddings and client entertainment — our talents bring polish and professionalism to your events.", features: ["Corporate parties", "Product launches", "Weddings", "Client entertainment"] },
  { id: "3", title: "Travel & Lifestyle Companions", description: "For business trips, city getaways, and exclusive travel, experience the comfort and charisma of our companions who enhance every moment.", features: ["Business trips", "City getaways", "Exclusive travel", "Outstation visits"] },
  { id: "4", title: "Premium Photoshoot & Content Models", description: "Professional models available for brand campaigns, influencer collaborations, adverts, e-commerce, fashion shows, and social media projects.", features: ["Brand campaigns", "Influencer collaborations", "E-commerce", "Fashion shows"] },
];

const Services = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data } = await supabase.from("services").select("*").order("display_order");
      return data?.length ? data : fallbackServices;
    },
    staleTime: 5 * 60 * 1000,
  });

  const items = services || fallbackServices;

  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <FadeInSection>
          <div className="text-center mb-12 md:mb-16">
            <p className="font-elegant text-xs md:text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">What We Offer</p>
            <h1 className="font-display text-3xl md:text-5xl tracking-wider text-primary">Our Services</h1>
            <div className="gold-divider w-20 mx-auto mt-4" />
          </div>
        </FadeInSection>

        <div className="space-y-4">
          {items.map((service, i) => (
            <FadeInSection key={service.id} delay={i * 0.1}>
              <div className="gold-border-card rounded-xl overflow-hidden bg-card">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center justify-between text-left"
                >
                  <h3 className="font-display text-base md:text-xl text-primary tracking-wide pr-4">{service.title}</h3>
                  <motion.span animate={{ rotate: openIndex === i ? 45 : 0 }} transition={{ duration: 0.3 }} className="text-primary text-lg md:text-xl flex-shrink-0">+</motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden">
                      <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-primary/10 pt-4">
                        <p className="font-elegant text-sm md:text-base text-primary/55 leading-relaxed mb-4">{service.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((f) => (
                            <span key={f} className="font-body text-[10px] md:text-xs tracking-wider uppercase px-3 py-1.5 border border-primary/20 rounded-full text-primary/50">{f}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
