import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";

const services = [
  {
    title: "Corporate Events",
    description: "Professional models for corporate events, conferences, product launches, and brand activations. Our models are trained in etiquette and professional conduct.",
    features: ["Product launches", "Trade shows", "Conferences", "Networking events"],
  },
  {
    title: "Brand Ambassadors",
    description: "Represent your brand with elegance. Our brand ambassadors create lasting impressions through their poise, communication skills, and professional demeanor.",
    features: ["In-store promotions", "Brand campaigns", "Social media", "Public appearances"],
  },
  {
    title: "Private Events",
    description: "For exclusive gatherings, private parties, and high-profile occasions. Discretion and elegance guaranteed with our premium selection of models.",
    features: ["Exclusive gatherings", "VIP events", "Private dinners", "Galas"],
  },
  {
    title: "Fashion & Editorial",
    description: "High-fashion models for editorial shoots, runway shows, and fashion campaigns. Our portfolio includes experienced models with diverse looks.",
    features: ["Runway shows", "Editorial shoots", "Lookbooks", "Fashion weeks"],
  },
  {
    title: "Lifestyle & Hospitality",
    description: "Premium hospitality and lifestyle representation for luxury brands, hotels, and premium venues. Our models enhance every guest experience.",
    features: ["Hotel events", "Luxury launches", "Wine tastings", "Art exhibitions"],
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
