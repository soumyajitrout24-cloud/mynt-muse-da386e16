import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";

const services = [
  {
    title: "Elite Companion Experiences",
    description: "Whether for special occasions, private events, social evenings, or personal engagements — our companions add grace, elegance, and presence that elevate your experience.",
    features: ["Special occasions", "Private events", "Social evenings", "Personal engagements"],
  },
  {
    title: "Event & Social Engagements",
    description: "From corporate parties and product launches to weddings and client entertainment — our talents bring polish and professionalism to your events.",
    features: ["Corporate parties", "Product launches", "Weddings", "Client entertainment"],
  },
  {
    title: "Travel & Lifestyle Companions",
    description: "For business trips, city getaways, and exclusive travel, experience the comfort and charisma of our companions who enhance every moment.",
    features: ["Business trips", "City getaways", "Exclusive travel", "Outstation visits"],
  },
  {
    title: "Premium Photoshoot & Content Models",
    description: "Professional models available for brand campaigns, influencer collaborations, adverts, e-commerce, fashion shows, and social media projects.",
    features: ["Brand campaigns", "Influencer collaborations", "E-commerce", "Fashion shows"],
  },
];

const Services = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <FadeInSection>
          <div className="text-center mb-16">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">
              What We Offer
            </p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-primary">
              Our Services
            </h1>
            <div className="gold-divider w-20 mx-auto mt-4" />
          </div>
        </FadeInSection>

        <div className="space-y-4">
          {services.map((service, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="gold-border-card rounded-xl overflow-hidden bg-card">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <h3 className="font-display text-lg md:text-xl text-primary tracking-wide">
                    {service.title}
                  </h3>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary text-xl"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-primary/10 pt-4">
                        <p className="font-elegant text-base text-primary/60 leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((f) => (
                            <span
                              key={f}
                              className="font-body text-xs tracking-wider uppercase px-3 py-1.5 border border-primary/20 rounded-full text-primary/50"
                            >
                              {f}
                            </span>
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
