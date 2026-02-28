import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";

const faqs = [
  { q: "How do I book a model for an event?", a: "Contact us through our enquiry form or email with event details including date, location, duration, and requirements. Our team will respond within 24 hours with availability and recommendations." },
  { q: "What is your cancellation policy?", a: "Cancellations made 72 hours before the event receive a full refund. Cancellations within 72 hours are subject to a 50% cancellation fee. No-shows are charged in full." },
  { q: "Do you operate in all cities?", a: "We currently operate in Bangalore, Chennai, Hyderabad, Mumbai, and Nashik. For events in other cities, please contact us to discuss availability." },
  { q: "What does the booking fee include?", a: "Our booking fee includes model representation, professional styling consultation, event coordination, and dedicated support throughout your event." },
  { q: "Can I request specific models?", a: "Yes, you can browse our profiles and request specific models. Availability depends on their schedule, and we'll confirm within 24 hours." },
  { q: "Is everything kept confidential?", a: "Absolutely. Discretion is our top priority. All client information, event details, and engagements are handled with strict confidentiality." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-3xl">
        <FadeInSection>
          <div className="text-center mb-14">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">Common Questions</p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-primary">FAQ</h1>
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
