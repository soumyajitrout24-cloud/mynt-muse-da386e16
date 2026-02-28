import { Check } from "lucide-react";
import FadeInSection from "@/components/FadeInSection";

const plans = [
  {
    name: "Silver",
    subtitle: "Elegant Presence",
    desc: "Best for private events, dinners, and social occasions",
    features: ["High-quality talent", "Professional conduct", "Advance booking recommended"],
    tier: "silver" as const,
  },
  {
    name: "Gold",
    subtitle: "Premium Experience",
    desc: "Extended engagement options",
    features: ["High-end profiles", "Priority scheduling", "Extended engagement options"],
    tier: "gold" as const,
    popular: true,
  },
  {
    name: "Platinum",
    subtitle: "Signature Engagement",
    desc: "Top-tier talents with customized experiences",
    features: ["Top-tier talents", "Customized experiences", "Travel extensions", "Premium support", "Dedicated concierge service"],
    tier: "platinum" as const,
  },
];

const Pricing = () => {
  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-5xl">
        <FadeInSection>
          <div className="text-center mb-16">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">Investment</p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-primary">Pricing & Plans</h1>
            <div className="gold-divider w-20 mx-auto mt-4" />
            <p className="font-elegant text-base text-primary/40 mt-4 max-w-lg mx-auto">
              We offer tiered packages designed to fit different preferences and budgets while delivering premium value.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <FadeInSection key={plan.name} delay={i * 0.15}>
              <div
                className={`relative flex flex-col h-full rounded-2xl p-8 md:p-10 border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_hsl(43_56%_52%/0.2)] ${
                  plan.tier === "platinum"
                    ? "border-primary bg-emerald-dark shadow-[0_0_40px_hsl(43_56%_52%/0.12)]"
                    : plan.tier === "gold"
                    ? "border-primary/50 bg-emerald-dark"
                    : "border-primary/20 bg-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-body text-[10px] tracking-[0.2em] uppercase px-5 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display text-2xl text-primary tracking-wide mb-1">{plan.name}</h3>
                  <p className="font-elegant text-base text-primary/60 italic">{plan.subtitle}</p>
                </div>

                <p className="font-elegant text-sm text-primary/40 mb-6 leading-relaxed">{plan.desc}</p>

                <div className="gold-divider w-full mb-6" />

                <ul className="space-y-4 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-primary/60 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.5}>
          <p className="text-center font-elegant text-sm text-primary/40 mt-10 italic">
            Exact pricing shared upon private inquiry. Discretion ensured.
          </p>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Pricing;
