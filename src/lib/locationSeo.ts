export type CitySeo = {
  displayName: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  eventTypes: { title: string; text: string }[];
  neighborhoodsNote: string;
  faqs: { q: string; a: string }[];
};

export const CITY_SEO: Record<string, CitySeo> = {
  bangalore: {
    displayName: "Bangalore",
    title: "Model Agency in Bangalore | Event Hostesses & Promo Models – MYNT",
    description:
      "Hire professional models, event hostesses and brand ambassadors in Bangalore. MYNT supplies talent for corporate events, product launches, weddings and photoshoots across Indiranagar, Whitefield, MG Road and more.",
    h1: "Model Agency in Bangalore",
    intro: [
      "Bangalore's startup launches, tech conferences, fashion weekends and destination weddings all need polished, reliable on-site talent. MYNT represents professional models and event hostesses who are briefed, punctual and comfortable in front of clients and cameras.",
      "Whether you are staffing a product launch in Whitefield, a brand activation on MG Road or a catalogue shoot in Indiranagar, our team handles casting, coordination and on-ground support so you can focus on the event itself.",
    ],
    eventTypes: [
      { title: "Corporate events & conferences", text: "Registration desk hostesses, stage anchors' assistants and guest greeters for tech parks and convention venues." },
      { title: "Product launches & brand activations", text: "Promotional models and brand ambassadors for retail, automotive, FMCG and lifestyle launches." },
      { title: "Fashion & e-commerce photoshoots", text: "Models for catalogue, lookbook, jewellery and social media campaigns, matched to your brief." },
      { title: "Weddings & private functions", text: "Welcome hostesses and hospitality support for weddings and receptions." },
    ],
    neighborhoodsNote:
      "We cover Indiranagar, Koramangala, MG Road, UB City, Whitefield, Electronic City, Jayanagar and Rajajinagar, and travel to other parts of Karnataka on request.",
    faqs: [
      { q: "How do I book models or event hostesses in Bangalore?", a: "Share your event date, venue, duration and requirements through our contact page or WhatsApp. We shortlist suitable talent and confirm a quote and schedule." },
      { q: "How far in advance should I book?", a: "For large corporate events and launches we recommend at least 7 to 10 days. Urgent bookings are possible depending on availability." },
      { q: "Do you supply models for photoshoots as well as events?", a: "Yes. We provide models for e-commerce, fashion, jewellery and social media shoots as well as live events." },
      { q: "Which areas of Bangalore do you serve?", a: "All major areas including Indiranagar, Whitefield, Koramangala, MG Road, UB City and Electronic City." },
    ],
  },
  chennai: {
    displayName: "Chennai",
    title: "Model Agency in Chennai | Event Hostesses & Promo Models – MYNT",
    description:
      "Book professional models, event hostesses and brand ambassadors in Chennai. MYNT supports corporate events, launches, weddings and photoshoots in T Nagar, Nungambakkam, Anna Nagar, OMR and beyond.",
    h1: "Model Agency in Chennai",
    intro: [
      "From textile and jewellery campaigns to automotive launches, IT-corridor conferences and traditional weddings, Chennai's events demand talent that is professional and culturally at ease. MYNT represents models and hostesses who can carry both.",
      "We supply talent for venues across the city, coordinating briefs, schedules and on-site conduct so your event or shoot runs smoothly.",
    ],
    eventTypes: [
      { title: "Corporate events & IT conferences", text: "Hostesses and greeters for OMR and city-centre conferences, award nights and client events." },
      { title: "Retail, jewellery & textile campaigns", text: "Models for showroom launches, catalogue and festive campaigns." },
      { title: "Fashion shows & photoshoots", text: "Runway and studio models for designers, boutiques and e-commerce brands." },
      { title: "Weddings & private functions", text: "Welcome hostesses and guest-facing support for weddings and receptions." },
    ],
    neighborhoodsNote:
      "We cover T Nagar, Nungambakkam, Anna Nagar, Adyar, Velachery, OMR, Mylapore and Egmore, and travel across Tamil Nadu on request.",
    faqs: [
      { q: "How do I hire event hostesses or models in Chennai?", a: "Send your event details through our contact page or WhatsApp. We shortlist suitable talent and confirm the quote and schedule with you." },
      { q: "Can you provide models for jewellery and textile shoots?", a: "Yes. We regularly match models to retail, jewellery, textile and fashion briefs." },
      { q: "Do you serve areas outside the city centre?", a: "Yes, including OMR, Anna Nagar and Adyar, and other locations on request." },
      { q: "What is your cancellation policy?", a: "Please see our booking policy page for cancellation, rescheduling and conduct terms." },
    ],
  },
};