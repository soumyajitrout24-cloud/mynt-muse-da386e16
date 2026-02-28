import FadeInSection from "@/components/FadeInSection";

const About = () => {
  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-3xl">
        <FadeInSection>
          <div className="text-center mb-14">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">Our Story</p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-primary">About Us</h1>
            <div className="gold-divider w-20 mx-auto mt-4" />
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="space-y-8">
            <p className="font-elegant text-lg md:text-xl text-primary/60 leading-relaxed text-center">
              MYNT Girlfriend is India's premier luxury model representation agency, curating an exclusive portfolio of
              the most sophisticated and professional models for high-profile events, brand campaigns, and private occasions.
            </p>

            <div className="gold-divider w-full" />

            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { number: "500+", label: "Events Served" },
                { number: "150+", label: "Premium Models" },
                { number: "50+", label: "Corporate Clients" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl text-primary gold-glow mb-1">{stat.number}</p>
                  <p className="font-elegant text-sm text-primary/40 tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="gold-divider w-full" />

            <div className="gold-border-card rounded-xl p-8 bg-card">
              <h2 className="font-display text-2xl text-primary mb-4 tracking-wide">Our Philosophy</h2>
              <p className="font-elegant text-base text-primary/60 leading-relaxed">
                We believe in the art of representation — where every model is not just a face, but an embodiment of grace,
                professionalism, and excellence. Our rigorous selection process ensures that only the finest talent represents
                your brand, creating memorable experiences that resonate long after the event.
              </p>
            </div>

            <div className="gold-border-card rounded-xl p-8 bg-card">
              <h2 className="font-display text-2xl text-primary mb-4 tracking-wide">Discretion & Trust</h2>
              <p className="font-elegant text-base text-primary/60 leading-relaxed">
                Confidentiality is at the heart of everything we do. Our clients trust us with their most prestigious events,
                and we honor that trust with unwavering discretion. Every engagement is handled with the utmost professionalism
                and privacy.
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default About;
