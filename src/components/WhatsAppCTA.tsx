import React from "react";
import WhatsAppLogo from "@/assets/Whatsyy.png"; // your WhatsApp logo

const WhatsAppCTA = () => {
  const phoneNumber = "YOUR_PHONE_NUMBER"; // e.g., 919876543210
  const message = encodeURIComponent("Hi! I would like to know more."); // default message

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 w-20 h-20 md:w-16 md:h-16 rounded-full overflow-hidden shadow-lg hover:scale-110 transition-transform"
    >
      <img
        src={WhatsAppLogo}
        alt="WhatsApp"
        className="w-full h-full object-cover"
      />
    </a>
  );
};

export default WhatsAppCTA;