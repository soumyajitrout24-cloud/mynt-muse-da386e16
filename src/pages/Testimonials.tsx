import { Star } from "lucide-react";
import FadeInSection from "@/components/FadeInSection";

const testimonials = [
  { name: "Rahul Mehta", role: "CEO, LuxeCorp", text: "MYNT Girlfriend's models brought unmatched elegance to our annual gala. Their professionalism and presence made a lasting impression on all our guests.", rating: 5 },
  { name: "Priya Sharma", role: "Event Director", text: "Every detail was handled with perfection. The coordination team ensured seamless execution, and the models were outstanding.", rating: 5 },
  { name: "Arjun Kapoor", role: "Brand Manager", text: "Working with MYNT Girlfriend elevated our brand campaign to the next level. The quality of talent is truly world-class.", rating: 5 },
  { name: "Sneha Patel", role: "Fashion Editor", text: "Their editorial models are among the best I've worked with. Professional, punctual, and incredibly photogenic.", rating: 5 },
  { name: "Vikram Singh", role: "Luxury Hotel GM", text: "We regularly partner with MYNT for our premium events. Their models consistently exceed our high standards.", rating: 5 },
  { name: "Aisha Khan", role: "Marketing Head", text: "Discretion and class define MYNT Girlfriend. They understand what luxury representation truly means.", rating: 5 },
];

const Testimonials = () => {
  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-5xl">
        <FadeInSection>
          <div className="text-center mb-16">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">What Clients Say</p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-primary">Testimonials</h1>
            <div className="gold-divider w-20 mx-auto mt-4" />
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <div className="gold-border-card rounded-xl p-6 bg-card h-full">
                <div className="text-primary/20 text-4xl font-display mb-3">"</div>
                <p className="font-elegant text-base text-primary/60 leading-relaxed mb-5">{t.text}</p>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <div className="gold-divider w-8 mb-3" />
                <p className="font-body text-sm text-primary tracking-wide">{t.name}</p>
                <p className="font-elegant text-xs text-primary/40">{t.role}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
