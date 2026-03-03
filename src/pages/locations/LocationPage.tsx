import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { locationData } from "../../lib/locationData";

const LocationPage = () => {
  const { city } = useParams();
  const areas = locationData[city?.toLowerCase() || ""];

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

        {/* Grid */}
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
