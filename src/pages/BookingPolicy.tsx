import FadeInSection from "@/components/FadeInSection";

const BookingPolicy = () => {
  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-3xl">
        <FadeInSection>
          <div className="text-center mb-14">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">Terms</p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-primary">Booking Policy</h1>
            <div className="gold-divider w-20 mx-auto mt-4" />
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="gold-border-card rounded-xl p-8 bg-card mb-8">
            <p className="font-elegant text-lg text-primary/60 leading-relaxed text-center">
              To deliver consistency and quality without disappointment:
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Advance reservations are mandatory.",
              "Same-day confirmations cannot be guaranteed.",
              "Once a profile is reserved it cannot be held indefinitely without confirmation.",
              "High-ticket experiences require prior planning.",
            ].map((item, i) => (
              <div key={i} className="gold-border-card rounded-xl p-6 bg-card flex items-start gap-4">
                <span className="text-primary mt-0.5 text-sm">✦</span>
                <p className="font-elegant text-base text-primary/50 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="gold-border-card rounded-xl p-8 bg-card mt-8 text-center">
            <p className="font-elegant text-base text-primary/50 leading-relaxed">
              If you're ready to secure your preferred model or experience, we recommend booking early to avoid availability issues.
            </p>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default BookingPolicy;
