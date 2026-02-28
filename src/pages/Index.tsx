import { Link } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import FadeInSection from "@/components/FadeInSection";
import { Shield, Award, Diamond } from "lucide-react";
import serviceImage from "@/assets/service-preview.png";
import spaImage from "@/assets/spa-massage.jpg";

const Index = () => {
  return (
    <div className="bg-emerald-gradient min-h-screen">
      {/* Hero */}
      <HeroSection />

      {/* Marquee */}
      <MarqueeStrip />

      {/* What We Stand For */}
      <section className="py-20 md:py-28 px-6">
        <div className="container mx-auto max-w-5xl">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">
                Our Promise
              </p>
              <h2 className="font-display text-3xl md:text-4xl tracking-wider text-primary">
                What We Stand For
              </h2>
              <div className="gold-divider w-20 mx-auto mt-4" />
              <p className="font-elegant text-base text-primary/40 mt-4 max-w-lg mx-auto">
                Every engagement is defined by three principles
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Discretion",
                desc: "Your privacy is our highest priority. Every interaction remains strictly confidential.",
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "We curate only the finest talent, ensuring an unparalleled standard of service.",
              },
              {
                icon: Diamond,
                title: "Exclusivity",
                desc: "Limited availability ensures personalized attention and extraordinary experiences.",
              },
            ].map((item, i) => (
              <FadeInSection key={item.title} delay={i * 0.15}>
                <div className="gold-border-card rounded-xl p-8 bg-card text-center hover:-translate-y-1 transition-transform duration-400">
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-5" strokeWidth={1.2} />
                  <h3 className="font-display text-xl text-primary mb-3 tracking-wide">{item.title}</h3>
                  <p className="font-elegant text-sm text-primary/50 leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 border-t border-primary/10">
        <div className="container mx-auto max-w-5xl">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">
                Our Difference
              </p>
              <h2 className="font-display text-3xl md:text-4xl tracking-wider text-primary">
                Why Choose Us
              </h2>
              <div className="gold-divider w-20 mx-auto mt-4" />
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Quality Over Quantity",
                desc: "We focus on delivering exceptional experiences — not mass volume. Each interaction is carefully personalized to ensure you get exactly what you expect, and often more.",
              },
              {
                title: "Authentic Presentations",
                desc: "All our model profiles are recent, verified, and genuine — no bait-and-switch, no heavy retouching.",
              },
              {
                title: "Advance Reservation Policy",
                desc: "To maintain exclusivity and high standards, we only accept bookings in advance. Same-day or last-minute confirmations are not guaranteed.",
              },
              {
                title: "Client-First Philosophy",
                desc: "Every client is important — but not every inquiry fits our premium framework. We align expectations early to ensure satisfaction and clarity.",
              },
            ].map((item, i) => (
              <FadeInSection key={item.title} delay={i * 0.1}>
                <div className="gold-border-card rounded-xl p-8 bg-card hover:-translate-y-1 hover:shadow-gold transition-all duration-400">
                  <h3 className="font-display text-lg text-primary mb-3 tracking-wide">{item.title}</h3>
                  <p className="font-elegant text-sm text-primary/50 leading-relaxed">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Spa Coming Soon */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeInSection>
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-gold bg-card">
              <div className="absolute inset-0 bg-gradient-to-r from-card via-card/95 to-transparent z-10" />
              <div className="relative z-20 flex flex-col md:flex-row items-center gap-8 p-10 md:p-14">
                <div className="flex-1 text-center md:text-left">
                  <p className="font-body text-xs tracking-[0.3em] uppercase text-primary/40 mb-3">Coming Soon</p>
                  <h2 className="font-display text-3xl md:text-4xl tracking-wider text-primary mb-2 gold-glow">
                    Spa Massage
                  </h2>
                  <div className="gold-divider w-16 mb-4 mx-auto md:mx-0" />
                  <p className="font-elegant text-lg text-primary/50 leading-relaxed">
                    Premium Experience Guaranteed
                  </p>
                </div>
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl border border-primary/20 overflow-hidden flex-shrink-0">
                  <img
                    src={spaImage}
                    alt="Luxury Spa Massage Coming Soon"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-primary/10">
        <div className="container mx-auto max-w-3xl">
          <FadeInSection>
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-4xl tracking-wider text-primary mb-4">
                Ready for an Exceptional Experience?
              </h2>
              <p className="font-elegant text-base text-primary/50 mb-8">
                Reserve your consultation today.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-primary text-primary-foreground font-body text-xs tracking-[0.2em] uppercase px-10 py-4 rounded-full hover:bg-gold-light transition-colors duration-300"
              >
                Book Now
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
