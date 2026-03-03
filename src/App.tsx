import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import ScrollToTop from "@/components/ScrollToTop";

import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Pricing from "./pages/Pricing";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import BookingPolicy from "./pages/BookingPolicy";
import NotFound from "./pages/NotFound";
import LocationPage from "./pages/locations/LocationPage";

import { useState, useEffect } from "react";

const queryClient = new QueryClient();

function App() {
  const [loading, setLoading] = useState(true);

  /* ================= PROTECTION (PRODUCTION ONLY) ================= */
  useEffect(() => {
    // Only enable protection in production build
    if (import.meta.env.PROD) {
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        // Block copy & view source only
        if (
          (e.ctrlKey && ["c", "u"].includes(e.key.toLowerCase())) ||
          (e.metaKey && e.key.toLowerCase() === "c")
        ) {
          e.preventDefault();
        }
      };

      document.addEventListener("contextmenu", handleContextMenu);
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  /* ================= LOADER ================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <ScrollToTop />
          <Navbar />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/booking-policy" element={<BookingPolicy />} />
            <Route path="/locations/:city" element={<LocationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
          <WhatsAppCTA />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;