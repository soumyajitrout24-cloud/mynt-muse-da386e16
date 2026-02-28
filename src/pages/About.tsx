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
              At Mynt Girlfriend, we believe in true professionalism over transactions.
            </p>

            <p className="font-elegant text-base text-primary/50 leading-relaxed text-center">
              Our mission is to deliver genuine client satisfaction by pairing you with carefully curated models who embody poise, charisma, and refinement — without inflated promises or misleading imagery.
            </p>

            <div className="gold-divider w-full" />

            <div className="gold-border-card rounded-xl p-8 bg-card">
              <h2 className="font-display text-2xl text-primary mb-5 tracking-wide">Our Standards</h2>
              <ul className="space-y-3">
                {[
                  "Verified profiles with authentic portfolios",
                  "Professional conduct and etiquette",
                  "Respectful, client-centric service",
                  "Discretion and confidentiality guaranteed",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-primary mt-1 text-sm">✦</span>
                    <span className="font-elegant text-base text-primary/50 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="gold-border-card rounded-xl p-8 bg-card">
              <h2 className="font-display text-2xl text-primary mb-4 tracking-wide">Advance Booking</h2>
              <p className="font-elegant text-base text-primary/50 leading-relaxed">
                Unlike typical last-minute services, our advance bookings ensure quality, trust, and guarantee of availability. Without advance confirmation, we cannot guarantee the same model — because elite talents are in high demand.
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default About;
