import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import ScrollToTop from "@/components/ScrollToTop";

// Lazy load pages for performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const BookingPolicy = lazy(() => import("./pages/BookingPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const LocationPage = lazy(() => import("./pages/locations/LocationPage"));

const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-emerald-gradient flex items-center justify-center">
    <div className="flex gap-3">
      <span className="w-2.5 h-2.5 rounded-full bg-gold animate-bounce shadow-[0_0_20px_hsl(var(--gold)/0.8)]"></span>
      <span className="w-2.5 h-2.5 rounded-full bg-gold animate-bounce delay-150 shadow-[0_0_20px_hsl(var(--gold)/0.8)]"></span>
      <span className="w-2.5 h-2.5 rounded-full bg-gold animate-bounce delay-300 shadow-[0_0_20px_hsl(var(--gold)/0.8)]"></span>
    </div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (import.meta.env.PROD) {
      const handleContextMenu = (e: MouseEvent) => e.preventDefault();
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey && ["c", "u"].includes(e.key.toLowerCase())) || (e.metaKey && e.key.toLowerCase() === "c")) {
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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Admin routes - no Navbar/Footer */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* Public routes */}
              <Route path="*" element={
                <>
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
                    <Route path="/proposal" element={<Proposal />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                  <WhatsAppCTA />
                </>
              } />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
