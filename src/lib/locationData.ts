// Bangalore Images
import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";
import b4 from "../assets/b4.jpg";
import b5 from "../assets/b5.jpg";
import b6 from "../assets/b6.jpg";
import b7 from "../assets/b7.jpg";
import b8 from "../assets/b8.jpg";

// Chennai Images
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.jpg";
import c4 from "../assets/c4.jpg";
import c5 from "../assets/c5.jpg";
import c6 from "../assets/c6.jpg";
import c7 from "../assets/c7.jpg";
import c8 from "../assets/c8.jpg";

// Hyderabad Images
import h1 from "../assets/h1.jpg";
import h2 from "../assets/h2.jpg";

// Hotel Images (AI-generated luxury hotel visuals)
import hotel1 from "../assets/hotel-1.jpg";
import hotel2 from "../assets/hotel-2.jpg";
import hotel3 from "../assets/hotel-3.jpg";
import hotel4 from "../assets/hotel-4.jpg";
import hotel5 from "../assets/hotel-5.jpg";
import hotel6 from "../assets/hotel-6.jpg";

export const locationData: Record<string, { name: string; image: string }[]> = {
  bangalore: [
    { name: "Indiranagar", image: b1 },
    { name: "MG Road", image: b2 },
    { name: "Whitefield", image: b3 },
    { name: "Electronic City", image: b4 },
    { name: "UB City", image: b5 },
    { name: "Rajajinagar", image: b6 },
    { name: "Koramangala", image: b7 },
    { name: "Jayanagar", image: b8 },
  ],

  chennai: [
    { name: "T Nagar", image: c1 },
    { name: "Nungambakkam", image: c2 },
    { name: "Anna Nagar", image: c3 },
    { name: "Adyar", image: c4 },
    { name: "Velachery", image: c5 },
    { name: "OMR", image: c6 },
    { name: "Mylapore", image: c7 },
    { name: "Egmore", image: c8 },
  ],

  hyderabad: [
    { name: "Banjara Hills", image: h1 },
    { name: "Jubilee Hills", image: h2 },
    { name: "Hitech City", image: hotel1 },
    { name: "Gachibowli", image: hotel2 },
    { name: "Madhapur", image: hotel3 },
    { name: "Begumpet", image: hotel4 },
    { name: "Secunderabad", image: hotel5 },
    { name: "Kukatpally", image: hotel6 },
  ],

  mumbai: [
    { name: "Bandra", image: hotel1 },
    { name: "Juhu", image: hotel2 },
    { name: "Andheri", image: hotel3 },
    { name: "Colaba", image: hotel4 },
    { name: "Powai", image: hotel5 },
    { name: "Lower Parel", image: hotel6 },
    { name: "Dadar", image: hotel1 },
    { name: "Worli", image: hotel2 },
    { name: "Santacruz", image: hotel3 },
  ],

  nashik: [
    { name: "Gangapur Road", image: hotel1 },
    { name: "College Road", image: hotel2 },
    { name: "Panchavati", image: hotel3 },
    { name: "Indira Nagar", image: hotel4 },
    { name: "Satpur", image: hotel5 },
    { name: "Pathardi Phata", image: hotel6 },
    { name: "Trimbak Road", image: hotel1 },
    { name: "CIDCO", image: hotel2 },
    { name: "Ambad", image: hotel3 },
  ],
};
