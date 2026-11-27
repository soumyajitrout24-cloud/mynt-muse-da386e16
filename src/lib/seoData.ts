export type RouteSeo = { title: string; description: string };

export const ROUTE_SEO: Record<string, RouteSeo> = {
  "/": {
    title: "Model Agency in Bangalore & Chennai | Event Hostesses & Promo Models – MYNT",
    description:
      "MYNT is a model representation agency in Bangalore and Chennai. Book professional models, event hostesses and brand ambassadors for corporate events, product launches, weddings and photoshoots.",
  },
  "/about": {
    title: "About MYNT | Professional Model & Event Talent Agency in India",
    description:
      "Learn how MYNT curates and represents professional models and event hostesses for brands, planners and photographers in Bangalore, Chennai and across India.",
  },
  "/services": {
    title: "Event Hostesses, Promo Models & Photoshoot Models | MYNT Services",
    description:
      "Hire event hostesses, promotional models, brand ambassadors and fashion & e-commerce photoshoot models in Bangalore and Chennai. Corporate events, launches, weddings and campaigns.",
  },
  "/gallery": {
    title: "Model Portfolio & Event Gallery | MYNT Agency Bangalore & Chennai",
    description:
      "Browse the MYNT portfolio of professional models for fashion shoots, brand campaigns, corporate events and launches in Bangalore and Chennai.",
  },
  "/pricing": {
    title: "Model Booking Rates & Packages | MYNT Agency Bangalore & Chennai",
    description:
      "Transparent booking packages for event models, hostesses and photoshoot talent in Bangalore and Chennai. Request a quote for your event or campaign.",
  },
  "/testimonials": {
    title: "Client Reviews & Testimonials | MYNT Model Agency",
    description:
      "Read what brands, event planners and photographers say about working with MYNT models and hostesses in Bangalore and Chennai.",
  },
  "/contact": {
    title: "Contact MYNT | Book Models & Hostesses in Bangalore & Chennai",
    description:
      "Get in touch with MYNT to book models, event hostesses or brand ambassadors for your event, campaign or photoshoot in Bangalore and Chennai.",
  },
  "/faq": {
    title: "FAQs | Booking Models & Event Hostesses with MYNT",
    description:
      "Answers to common questions about booking professional models and event hostesses in Bangalore and Chennai: process, timelines, payments and policies.",
  },
  "/booking-policy": {
    title: "Booking Policy | MYNT Model Agency",
    description:
      "MYNT booking, cancellation and professional conduct policy for model and event talent engagements.",
  },
};

export const SITE_URL = "https://www.myntgirlfriend.in";

export const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "MYNT",
  alternateName: "MYNT Girlfriend",
  url: SITE_URL,
  logo: `${SITE_URL}/logoo.png`,
  image: `${SITE_URL}/logoo.png`,
  description:
    "Model representation agency providing professional models, event hostesses and brand ambassadors for corporate events, campaigns, weddings and photoshoots.",
  areaServed: [
    { "@type": "City", name: "Bangalore" },
    { "@type": "City", name: "Chennai" },
  ],
  serviceType: [
    "Model agency",
    "Event hostess staffing",
    "Promotional models",
    "Photoshoot models",
  ],
  telephone: "+91-9686239724",
  email: "myntgirlfriend@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kormangala",
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560001",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/myntgirlfriend?avpt=b2p1azNhbDN0dnZx&utm_source=qr",
  ],

};