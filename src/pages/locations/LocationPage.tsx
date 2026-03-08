import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { locationData } from "../../lib/locationData";
import FadeInSection from "@/components/FadeInSection";

const CITY_ALIASES: Record<string, string> = {
  banglore: "bangalore",
};

const LocationPage = () => {
  const { city } = useParams();
  const cityLower = city?.toLowerCase() || "";
  const normalizedCity = CITY_ALIASES[cityLower] || cityLower;
  const displayCity = normalizedCity ? normalizedCity.charAt(0).toUpperCase() + normalizedCity.slice(1) : "";

  // Fetch locations from DB
  const { data: dbLocations, isLoading } = useQuery({
    queryKey: ["locations_by_city", normalizedCity],
    queryFn: async () => {
      const { data } = await supabase
        .from("locations")
        .select("*")
        .ilike("city", normalizedCity)
        .eq("is_active", true)
        .order("display_order");
      return data;
    },
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });

  // Fetch featured model images for this city (DB only)
  const { data: featuredModelImages } = useQuery({
    queryKey: ["featured_models", normalizedCity],
    queryFn: async () => {
      const { data } = await supabase
        .from("featured_models")
        .select("image_url")
        .ilike("location_name", normalizedCity)
        .eq("is_active", true)
        .order("display_order");
      return data?.map((d) => d.image_url) || [];
    },
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });

  // Use DB locations if available, fallback to static area data only
  const areas = useMemo(() => {
    if (dbLocations?.length) {
      return dbLocations.map((loc) => ({
        name: loc.area_name,
        image: loc.image_url || "",
      }));
    }
    return locationData[normalizedCity] || null;
  }, [dbLocations, normalizedCity]);

  /* pick 6 random featured models from DB */
  const randomModels = useMemo(() => {
    const shuffled = [...featuredModelImages].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, [featuredModelImages]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-gradient">
        <div className="flex gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-gold animate-bounce shadow-[0_0_20px_hsl(var(--gold)/0.8)]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-gold animate-bounce delay-150 shadow-[0_0_20px_hsl(var(--gold)/0.8)]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-gold animate-bounce delay-300 shadow-[0_0_20px_hsl(var(--gold)/0.8)]"></span>
        </div>
      </div>
    );
  }

  if (!areas) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary bg-emerald-gradient">
        <div className="text-center">
          <h2 className="font-display text-2xl text-primary mb-2">Location Not Found</h2>
          <p className="font-elegant text-sm text-primary/50">This location is not available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-gradient pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-12">
            <p className="font-elegant text-xs tracking-[0.3em] uppercase text-primary/50 mb-3">Explore</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-primary uppercase tracking-wider font-display">
              {displayCity}
            </h1>
            <div className="gold-divider w-20 mx-auto mt-4" />
          </div>
        </FadeInSection>

        {/* RANDOM MODEL CARDS — only shown if featured models exist in DB */}
        {randomModels.length > 0 && (
          <FadeInSection delay={0.1}>
            <div className="mb-14">
              <h2 className="text-center text-primary text-lg uppercase tracking-wider mb-6 font-display">
                Featured Models
              </h2>
              <div className="flex justify-center flex-wrap gap-4">
                {randomModels.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-24 sm:w-28 md:w-32 aspect-[3/4] rounded-xl overflow-hidden border border-primary/30 shadow-luxury"
                  >
                    <img src={img} alt="Model" className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-white/70 text-xs sm:text-sm font-semibold tracking-wider rotate-[-20deg]">
                        MyntGirlfriend
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        )}

        {/* AREAS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {areas.map((area, index) => (
            <FadeInSection key={index} delay={0.2 + index * 0.05}>
              <div className="relative rounded-2xl overflow-hidden border border-primary/30 shadow-luxury group cursor-pointer">
                {area.image ? (
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-52 sm:h-64 object-cover transition duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-52 sm:h-64 bg-emerald-dark/30 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-primary/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <p className="text-white text-sm sm:text-base md:text-lg uppercase tracking-wider">
                    {area.name}
                  </p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
