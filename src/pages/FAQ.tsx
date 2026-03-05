import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";

const faqs = [
  {
    q: "What makes your service different?",
    a: "We focus on true professional standards, authentic profiles, and client satisfaction. Every experience is curated to meet premium expectations."
  },
  {
    q: "Can I book on the same day?",
    a: "Due to limited availability and advance reservations, same-day confirmations cannot be guaranteed. We recommend booking in advance."
  },
  {
    q: "How do you ensure confidentiality?",
    a: "Discretion is built into every step — from consultation to engagement. Your privacy and confidentiality are always protected."
  },
  {
    q: "Is pricing negotiable?",
    a: "Pricing reflects premium service and professional standards. Rates are fixed to maintain quality and consistency."
  },
  {
    q: "How do I make a booking?",
    a: "You can make a booking by contacting us through our website form or through the official communication channels listed on the contact page."
  },
  {
    q: "Are the profiles verified?",
    a: "Yes, every profile goes through a strict verification and quality screening process to ensure authenticity and professionalism."
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept secure digital payment methods. Details will be provided during the booking confirmation process."
  },
  {
    q: "Can I cancel or reschedule my booking?",
    a: "Yes, cancellations or rescheduling requests must be made within the allowed timeframe mentioned during booking confirmation."
  },
  {
    q: "Do you provide services in multiple cities?",
    a: "Yes, services are available in select major cities. Availability depends on location and schedule."
  },
  {
    q: "How early should I book?",
    a: "We recommend booking at least 24–48 hours in advance to ensure availability and proper arrangements."
  },
  {
    q: "Is customer support available?",
    a: "Yes, our support team is available to assist you with bookings, inquiries, and any questions you may have."
  },
  {
    q: "What happens after I submit a booking request?",
    a: "Once your request is submitted, our team will review it and contact you with confirmation and further details."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-3xl">

        <FadeInSection>
          <div className="text-center mb-12 md:mb-14">
            <p className="font-elegant text-xs md:text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">
              Common Questions
            </p>

            <h1 className="font-display text-3xl md:text-5xl tracking-wider text-primary">
              FAQs
            </h1>

            <div className="gold-divider w-20 mx-auto mt-4" />
          </div>
        </FadeInSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeInSection key={i} delay={i * 0.08}>
              <div className="gold-border-card rounded-xl overflow-hidden bg-card">

                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-5 md:px-6 py-4 md:py-5 flex items-center justify-between text-left"
                >
                  <h3 className="font-elegant text-sm md:text-lg text-primary pr-4">
                    {faq.q}
                  </h3>

                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-primary text-lg md:text-xl flex-shrink-0"
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
                      <div className="px-5 md:px-6 pb-4 md:pb-5 border-t border-primary/10 pt-4">
                        <p className="font-body text-xs md:text-sm text-primary/55 leading-relaxed">
                          {faq.a}
                        </p>
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