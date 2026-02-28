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
          <div className="space-y-6">
            {[
              { title: "Booking Confirmation", content: "All bookings are confirmed only after receipt of the agreed advance payment. A confirmation email will be sent within 24 hours of payment." },
              { title: "Payment Terms", content: "A 50% advance is required to confirm a booking. The remaining balance is due 24 hours before the event. We accept bank transfers and UPI." },
              { title: "Cancellation Policy", content: "Cancellations made 72+ hours before: full refund. 48-72 hours: 50% refund. Less than 48 hours: no refund. We recommend booking with adequate lead time." },
              { title: "Model Conduct", content: "Our models maintain the highest standards of professionalism. Any inappropriate behavior towards our models will result in immediate termination of services without refund." },
              { title: "Client Responsibilities", content: "Clients must provide a safe and professional working environment. Event details, venue, and schedule must be communicated at least 48 hours in advance." },
              { title: "Confidentiality", content: "All engagement details are kept strictly confidential. We do not share client information with third parties under any circumstances." },
            ].map((section, i) => (
              <div key={i} className="gold-border-card rounded-xl p-6 bg-card">
                <h2 className="font-display text-xl text-primary mb-3 tracking-wide">{section.title}</h2>
                <p className="font-elegant text-base text-primary/50 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default BookingPolicy;
