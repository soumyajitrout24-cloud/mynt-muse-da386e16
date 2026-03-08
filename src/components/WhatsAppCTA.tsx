import React from "react";
import WhatsAppLogo from "@/spa/wa_logo.png";

const WhatsAppCTA = () => {
  const phoneNumber = "919686239724"; // replace with your number
  const message = encodeURIComponent( 
    "Hi, I'd like to enquire about Mynt Girlfriend services."
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-4 right-4 z-50
        w-12 h-12
        sm:w-14 sm:h-14 
        md:w-16 md:h-16
        rounded-full
        overflow-hidden
        hover:scale-110
        transition-transform duration-300
      "
    >
      <img
        src={WhatsAppLogo}
        alt="WhatsApp"
        className="w-full h-full object-cover allow-interaction"
      />
    </a>
  );
};

export default WhatsAppCTA;