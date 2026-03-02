import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { locationData } from "../../lib/locationData";

const LocationPage = () => {
  const { city } = useParams();
  const areas = locationData[city?.toLowerCase() || ""];

  if (!areas) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#064e3b]">
        Location Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#064e3b] pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-[#d4af37] uppercase tracking-wider">
            {city}
          </h1>
          <div className="w-20 h-[2px] bg-[#d4af37] mx-auto mt-4" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {areas.map((area, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-xl group cursor-pointer"
            >
              <img
                src={area.image}
                alt={area.name}
                className="w-full h-64 object-cover transition duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
                <p className="text-white text-base md:text-lg uppercase tracking-wider">
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