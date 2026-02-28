import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";

const faqs = [
  { q: "What makes your service different?", a: "We focus on true professional standards, authentic profiles, and client satisfaction." },
  { q: "Can I book on the same day?", a: "Due to limited availability and advance reservations, same-day confirmations cannot be guaranteed." },
  { q: "How do you ensure confidentiality?", a: "Discretion is built into every step — from consultation to engagement." },
  { q: "Is pricing negotiable?", a: "Pricing reflects premium service and professional standards." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-3xl">
        <FadeInSection>
          <div className="text-center mb-14">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">Common Questions</p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-primary">FAQs</h1>
            <div className="gold-divider w-20 mx-auto mt-4" />
          </div>
        </FadeInSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeInSection key={i} delay={i * 0.08}>
              <div className="gold-border-card rounded-xl overflow-hidden bg-card">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <h3 className="font-elegant text-base md:text-lg text-primary pr-4">{faq.q}</h3>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary text-xl flex-shrink-0"
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
                      <div className="px-6 pb-5 border-t border-primary/10 pt-4">
                        <p className="font-body text-sm text-primary/50 leading-relaxed">{faq.a}</p>
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

export default FAQ;
