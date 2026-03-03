import { Check, Phone, Plane, Crown, ClipboardList, Sparkles } from "lucide-react";
import FadeInSection from "@/components/FadeInSection";

const plans = [
  {
    name: "Executive Hour",
    subtitle: "Signature Introduction",
    desc: "Refined, short-duration private engagement, ideal for business travelers or tight schedules.",
    features: [
      "Elegant, polished presence",
      "Discreet and professional interaction",
    ],
    tier: "silver" as const,
  },
  {
    name: "Elite Experience",
    subtitle: "Extended Engagement",
    desc: "For clients who prefer unhurried time and elevated attention.",
    features: [
      "Relaxed and immersive engagement",
      "Perfect for fine dining, private meetings, or exclusive evenings",
      "Enhanced personalization",
    ],
    tier: "gold" as const,
  },
  {
    name: "Royal Evening",
    subtitle: "Luxury Indulgence",
    desc: "Complete, uninterrupted experience tailored for discerning individuals.",
    features: [
      "Premium time allocation",
      "Elevated presence and attention to detail",
      "Suitable for high-profile gatherings and private stays",
    ],
    tier: "platinum" as const,
  },
];

const addOns = [
  "Priority scheduling",
  "Advance profile reservation",
  "Customized plan structuring",
  "Private long-term arrangements",
];

const Pricing = () => {
  return (
    <div className="bg-emerald-gradient min-h-screen relative flex justify-center items-start md:items-center px-4 sm:px-6 py-20 md:py-16">
      {/* CTA - Top Right */}
      <a
        href="https://wa.me/YOUR_NUMBER?text=Hi!%20I%20want%20to%20inquire%20about%20Price%20%26%20Donations"
        target="_blank"
        className="
          absolute top-4 right-4 md:top-6 md:right-6
          bg-gold text-emerald-900 font-display font-semibold
          px-3 py-2 md:px-4 md:py-3 rounded-full text-xs md:text-sm
          shadow-gold
          flex items-center gap-1.5 md:gap-2
          hover:scale-105 transition-all duration-300 z-50
        "
      >
        <Phone className="w-4 h-4 md:w-5 md:h-5 text-emerald-900" />
        <span className="hidden sm:inline">Price & Donations</span>
        <span className="sm:hidden">Enquire</span>
      </a>

      {/* Centered Content */}
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-10 md:mb-16">
            <p className="font-elegant text-xs md:text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">
              Investment
            </p>
            <h1 className="font-display text-2xl sm:text-3xl md:text-5xl tracking-wider text-primary">
              Pricing & Plans
            </h1>
            <div className="gold-divider w-20 mx-auto mt-4" />
            <p className="font-elegant text-xs sm:text-sm md:text-base text-primary/45 mt-4 max-w-lg mx-auto leading-relaxed">
              At Mynt Girlfriend, pricing reflects exclusivity, discretion, and uncompromising standards. We cater to individuals who value quality, privacy, and a seamless luxury experience.
            </p>
          </div>
        </FadeInSection>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
          {plans.map((plan, i) => (
            <FadeInSection key={plan.name} delay={i * 0.15}>
              <div
                className={`relative flex flex-col h-full rounded-2xl p-5 sm:p-6 md:p-8 border transition-all duration-500 hover:-translate-y-1 ${
                  plan.tier === "platinum"
                    ? "border-primary/60 bg-card shadow-gold"
                    : plan.tier === "gold"
                    ? "border-primary/40 bg-card"
                    : "border-primary/20 bg-card"
                }`}
              >
                <div className="mb-4 md:mb-6">
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl text-primary tracking-wide mb-1">{plan.name}</h3>
                  <p className="font-elegant text-xs sm:text-sm md:text-base text-primary/60 italic">{plan.subtitle}</p>
                </div>

                <p className="font-elegant text-xs md:text-sm text-primary/40 mb-4 md:mb-6 leading-relaxed">{plan.desc}</p>

                <div className="gold-divider w-full mb-4 md:mb-6" />

                <ul className="space-y-3 md:space-y-4 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 p-2 rounded-lg transition hover:bg-primary/5"
                    >
                      <Check
                        className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 ${
                          plan.tier === "gold" ? "text-gold" : "text-primary/55"
                        }`}
                      />
                      <span className="font-body text-xs sm:text-sm text-primary/70 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Travel & Outstation */}
        <FadeInSection delay={0.4}>
          <div className="mt-10 md:mt-20 rounded-2xl border border-primary/20 bg-card p-5 sm:p-6 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/10 flex items-center justify-center">
                <Plane className="w-4 h-4 md:w-5 md:h-5 text-gold" />
              </div>
              <h2 className="font-display text-lg sm:text-xl md:text-2xl text-primary tracking-wide">
                Travel & Outstation Experience
              </h2>
            </div>
            <p className="font-elegant text-xs sm:text-sm md:text-base text-primary/55 leading-relaxed max-w-2xl">
              Companion travel to premium locations, five-star accommodation required, customized itinerary planning. Pricing available upon private consultation.
            </p>
          </div>
        </FadeInSection>

        {/* Add-Ons & Booking - Two Column */}
        <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Add-On Privileges */}
          <FadeInSection delay={0.5}>
            <div className="rounded-2xl border border-primary/20 bg-card p-5 sm:p-6 md:p-8 h-full relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              <div className="flex items-center gap-3 mb-4 md:mb-5">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Crown className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                </div>
                <h2 className="font-display text-base sm:text-lg md:text-xl text-primary tracking-wide">
                  Exclusive Add-On Privileges
                </h2>
              </div>
              <ul className="space-y-2.5 md:space-y-3">
                {addOns.map((item) => (
                  <li key={item} className="flex items-center gap-3 group">
                    <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-gold/60 flex-shrink-0 group-hover:text-gold transition" />
                    <span className="font-elegant text-xs sm:text-sm text-primary/60 group-hover:text-primary/80 transition">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>

          {/* Booking Guidelines */}
          <FadeInSection delay={0.6}>
            <div className="rounded-2xl border border-primary/20 bg-card p-5 sm:p-6 md:p-8 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-3 mb-4 md:mb-5">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <ClipboardList className="w-4 h-4 md:w-5 md:h-5 text-gold" />
                </div>
                <h2 className="font-display text-base sm:text-lg md:text-xl text-primary tracking-wide">
                  Booking Guidelines
                </h2>
              </div>
              <ol className="space-y-2.5 md:space-y-3">
                {[
                  "Select your preferred plan",
                  "Choose your desired profile",
                  "Reserve a premium hotel or verified private venue",
                  "Share confirmed date, time, and venue details",
                  "Secure your reservation as per confirmation process",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 md:gap-3 group">
                    <span className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-gold/30 flex items-center justify-center text-[10px] md:text-xs text-gold font-semibold flex-shrink-0 mt-0.5 group-hover:bg-gold/10 transition">
                      {i + 1}
                    </span>
                    <span className="font-elegant text-xs sm:text-sm text-primary/60 group-hover:text-primary/80 transition">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </FadeInSection>
        </div>

        {/* Closing Statement */}
        <FadeInSection delay={0.7}>
          <div className="mt-8 md:mt-14 text-center max-w-2xl mx-auto">
            <p className="font-elegant text-xs sm:text-sm md:text-base text-primary/45 leading-relaxed italic mb-4">
              All engagements are reserved in advance and allocated on a priority basis. We do not compete on price; we operate on value. Mynt Girlfriend is curated for individuals who understand that exclusivity commands investment.
            </p>
            <div className="gold-divider w-16 mx-auto my-4 md:my-5" />
            <p className="font-display text-xs sm:text-sm md:text-base tracking-[0.15em] md:tracking-[0.2em] text-gold/70">
              Premium · Private · Precisely Executed
            </p>
            <p className="font-elegant text-[10px] sm:text-xs md:text-sm text-primary/35 mt-2">
              Exact pricing shared upon private inquiry. Discretion ensured.
            </p>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Pricing;
