import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useMemo } from "react";
import { locationData } from "../../lib/locationData";

/* Model images */
import img111 from "@/assets/111.jpeg";
import img112 from "@/assets/112.jpeg";
import img113 from "@/assets/113.png";
import img114 from "@/assets/114.png";
import img115 from "@/assets/115.png";
import img116 from "@/assets/116.png";
import img117 from "@/assets/117.png";
import img118 from "@/assets/118.png";
import img119 from "@/assets/119.png";
import img120 from "@/assets/120.png";
import img121 from "@/assets/121.png";
import img122 from "@/assets/122.png";
import img123 from "@/assets/123.png";
import img124 from "@/assets/124.png";
import img125 from "@/assets/125.png";
import img126 from "@/assets/126.png";
import img127 from "@/assets/127.png";
import img128 from "@/assets/128.png";
import img129 from "@/assets/129.png";
import img130 from "@/assets/130.png";

const modelImages = [
  img111,img112,img113,img114,img115,
  img116,img117,img118,img119,img120,
  img121,img122,img123,img124,img125,
  img126,img127,img128,img129,img130
];

const LocationPage = () => {
  const { city } = useParams();
  const areas = locationData[city?.toLowerCase() || ""];

  /* pick 6 random models */
  const randomModels = useMemo(() => {
    const shuffled = [...modelImages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, []);

  if (!areas) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary bg-emerald-gradient">
        Location Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-gradient pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-primary uppercase tracking-wider font-display">
            {city}
          </h1>
          <div className="gold-divider w-20 mx-auto mt-4" />
        </div>

        {/* RANDOM MODEL CARDS */}
        <div className="mb-14">
          <h2 className="text-center text-primary text-lg uppercase tracking-wider mb-6">
            Featured Models
          </h2>

          <div className="flex justify-center flex-wrap gap-4">
            {randomModels.map((img, index) => (
              <div
                key={index}
                className="relative w-24 sm:w-28 md:w-32 aspect-[3/4] rounded-xl overflow-hidden border border-primary/30 shadow-luxury"
              >
                <img
                  src={img}
                  alt="Model"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white/70 text-xs sm:text-sm font-semibold tracking-wider rotate-[-20deg]">
                    MyntGirlfriend
                  </span>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* AREAS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {areas.map((area, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-luxury group cursor-pointer"
            >
              <img
                src={area.image}
                alt={area.name}
                className="w-full h-52 sm:h-64 object-cover transition duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <p className="text-white text-sm sm:text-base md:text-lg uppercase tracking-wider">
                  {area.name}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LocationPage;