import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import FadeInSection from "@/components/FadeInSection";
import serviceImage from "@/assets/service-preview.png";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul M.",
    text: "Absolutely professional and premium experience. The models were elegant and made our brand event unforgettable.",
    rating: 5,
  },
  {
    name: "Priya S.",
    text: "MYNT Girlfriend exceeded our expectations. Their attention to detail and professionalism is unmatched.",
    rating: 5,
  },
  {
    name: "Arjun K.",
    text: "World-class representation agency. Every interaction was handled with utmost discretion and class.",
    rating: 5,
  },
];

const Index = () => {
  return (
    <div className="bg-emerald-gradient min-h-screen">
      {/* Hero */}
      <HeroSection />

      {/* Marquee */}
      <MarqueeStrip />

      {/* Service Preview */}
      <section className="py-20 md:py-28 px-6">
        <div className="container mx-auto max-w-5xl">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">
                What We Offer
              </p>
              <h2 className="font-display text-3xl md:text-4xl tracking-wider text-primary">
                Premium Services
              </h2>
              <div className="gold-divider w-20 mx-auto mt-4" />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-xl overflow-hidden border border-primary/30 shadow-gold">
                <img
                  src={serviceImage}
                  alt="MYNT Girlfriend Premium Services"
                  className="w-full h-[350px] object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl text-primary mb-4 tracking-wide">
                  Curated Excellence
                </h3>
                <p className="font-elegant text-lg text-primary/60 leading-relaxed mb-6">
                  From corporate events to exclusive gatherings, our professionally represented models
                  bring sophistication and elegance to every occasion. Each model is carefully selected
                  for poise, professionalism, and presence.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Events", "Brand Campaigns", "Corporate", "Private"].map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs tracking-[0.15em] uppercase px-4 py-2 border border-primary/30 rounded-full text-primary/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 px-6 border-t border-primary/10">
        <div className="container mx-auto max-w-5xl">
          <FadeInSection>
            <div className="text-center mb-14">
              <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">
                Client Voices
              </p>
              <h2 className="font-display text-3xl md:text-4xl tracking-wider text-primary">
                Testimonials
              </h2>
              <div className="gold-divider w-20 mx-auto mt-4" />
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div className="gold-border-card rounded-xl p-6 bg-card">
                  <div className="text-primary/30 text-3xl font-display mb-3">"</div>
                  <p className="font-elegant text-base text-primary/60 leading-relaxed mb-4">
                    {t.text}
                  </p>
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="font-body text-xs tracking-wider text-primary/50 uppercase">
                    {t.name}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
