import FadeInSection from "@/components/FadeInSection";

const BookingPolicy = () => {
  const steps = [
    {
      icon: "⭐",
      title: "Choose the Service Plan",
      description: "Select the engagement duration or service plan that best suits your schedule and preferences.",
    },
    {
      icon: "👤",
      title: "Choose the Profile",
      description: "Browse our exclusive profiles and select your preferred companion. Each profile is available based on prior reservation and scheduling.",
    },
    {
      icon: "📅",
      title: "Share Your Schedule",
      description: (
        <>
          Kindly provide:
          <ul className="list-disc list-inside ml-5 mt-1">
            <li>Preferred date</li>
            <li>Exact meeting time</li>
            <li>Duration of engagement</li>
            <li>City and location</li>
          </ul>
          Advance notice is highly recommended to secure your desired profile and time slot.
        </>
      ),
    },
    {
      icon: "🏨",
      title: "Book a Star Hotel or Premium Venue",
      description: (
        <>
          For comfort, privacy, and safety, we require:
          <ul className="list-disc list-inside ml-5 mt-1">
            <li>Reservation at a reputed 4-star or 5-star hotel OR Verified premium private venue</li>
          </ul>
          Once booked, please share:
          <ul className="list-disc list-inside ml-5 mt-1">
            <li>Hotel name</li>
            <li>Reservation name</li>
            <li>Room number (shared closer to appointment time)</li>
          </ul>
          Clear venue details are mandatory prior to confirmation.
        </>
      ),
    },
    {
      icon: "📝",
      title: "Share Complete Details",
      description: "To process your booking smoothly, please confirm: Chosen profile, Selected service plan, Confirmed venue details, Date & time. Incomplete information may delay confirmation.",
    },
    {
      icon: "⏱️",
      title: "Reserve Your Profile & Time Slot",
      description: "All appointments are secured only after reservation confirmation. Profiles and time slots are allocated on a first-confirmed basis. Early planning ensures availability and priority scheduling.",
    },
  ];

  const notes = [
    "Professional conduct and mutual respect are expected at all times.",
    "Discretion and privacy are strictly maintained.",
    "Last-minute changes are subject to availability.",
    "We reserve the right to decline incomplete or unclear requests.",
  ];

  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glowing circles */}
      <div className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl top-20 left-1/4 pointer-events-none"></div>
      <div className="absolute w-80 h-80 rounded-full bg-primary/10 blur-3xl bottom-32 right-1/4 pointer-events-none"></div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-12 md:mb-16">
            <p className="font-elegant text-xs md:text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">
              Terms
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl tracking-wider text-primary">
              Booking Policy
            </h1>
            <div className="gold-divider w-24 mx-auto mt-4" />
          </div>
        </FadeInSection>

        {/* Intro */}
        <FadeInSection delay={0.2}>
          <div className="bg-card rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 mb-12 md:mb-16 shadow-luxury border border-primary/20">
            <p className="font-elegant text-sm sm:text-base md:text-lg text-primary/60 leading-relaxed text-center">
              At Mynt Girlfriend, every engagement is curated with discretion, professionalism, and attention to detail. To ensure a seamless and refined experience, kindly follow the booking process outlined below.
            </p>
          </div>
        </FadeInSection>

        {/* Timeline - mobile: simple stack, desktop: alternating */}
        <div className="relative">
          {/* Vertical line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40 rounded-full"></div>

          <div className="space-y-6 md:space-y-16">
            {steps.map((step, i) => (
              <FadeInSection key={i} delay={0.2 + i * 0.1}>
                <div className={`flex items-start relative ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  {/* Step Card */}
                  <div className="w-full md:max-w-md bg-card rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 shadow-luxury border border-primary/20 hover:border-primary/40 transition-all duration-300 relative z-10">
                    <div className="flex items-center mb-3">
                      <div className="text-xl md:text-2xl mr-3">{step.icon}</div>
                      <h3 className="font-display text-base sm:text-lg md:text-xl text-primary font-semibold">{step.title}</h3>
                    </div>
                    <div className="font-elegant text-xs sm:text-sm md:text-base text-primary/60 leading-relaxed">
                      {step.description}
                    </div>
                  </div>

                  {/* Circular Badge - hidden on mobile */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 top-8 w-12 h-12 rounded-full bg-card border-2 border-primary/40 items-center justify-center text-lg font-bold text-primary shadow-gold">
                    {i + 1}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <FadeInSection delay={0.5}>
          <div className="bg-card rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 mt-16 md:mt-24 shadow-luxury border border-primary/20">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-primary mb-5 md:mb-6 text-center">Important Notes</h2>
            <ul className="list-disc list-inside space-y-2 md:space-y-3 font-elegant text-primary/60 text-sm sm:text-base md:text-lg leading-relaxed">
              {notes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </div>
        </FadeInSection>

        {/* Commitment */}
        <FadeInSection delay={0.5}>
          <div className="bg-card rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 mt-8 md:mt-16 shadow-luxury border border-primary/20 text-center">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-primary mb-4">Our Commitment</h2>
            <p className="font-elegant text-sm sm:text-base md:text-lg text-primary/60 leading-relaxed">
              We deliver a refined, private, and seamless companionship experience tailored for discerning individuals who value elegance, privacy, and premium standards.
            </p>
            <p className="font-elegant text-sm sm:text-base md:text-lg text-primary/60 leading-relaxed mt-2">
              Plan in advance. Book with clarity. Experience exclusivity.
            </p>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default BookingPolicy;
