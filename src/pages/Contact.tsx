import { useState } from "react";
import FadeInSection from "@/components/FadeInSection";

const locations = ["Bangalore", "Chennai", "Hyderabad", "Mumbai", "Nashik"];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", location: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="bg-emerald-gradient min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-2xl">
        <FadeInSection>
          <div className="text-center mb-14">
            <p className="font-elegant text-sm tracking-[0.3em] uppercase text-primary/50 mb-3">Get in Touch</p>
            <h1 className="font-display text-4xl md:text-5xl tracking-wider text-primary">Contact</h1>
            <div className="gold-divider w-20 mx-auto mt-4" />
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-card border border-primary/20 rounded-lg px-4 py-3 font-body text-sm text-primary placeholder:text-primary/30 focus:border-primary/50 focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-card border border-primary/20 rounded-lg px-4 py-3 font-body text-sm text-primary placeholder:text-primary/30 focus:border-primary/50 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-2">Location</label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-card border border-primary/20 rounded-lg px-4 py-3 font-body text-sm text-primary focus:border-primary/50 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-card text-primary/30">Select location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="bg-card text-primary">{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full bg-card border border-primary/20 rounded-lg px-4 py-3 font-body text-sm text-primary placeholder:text-primary/30 focus:border-primary/50 focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your requirements..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-body text-sm tracking-[0.2em] uppercase py-3.5 rounded-lg hover:bg-gold-light transition-colors duration-300"
            >
              Send Enquiry
            </button>
          </form>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Contact;
