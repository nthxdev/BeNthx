import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Inspiration from "./pages/Inspiration";
import Assets from "./pages/Assets";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import CourseDetail from "./pages/CourseDetail";
import ImmersivePortfolio from "./pages/ImmersivePortfolio";
import AnimatedLandingPortfolio from "./pages/AnimatedLandingPortfolio";
import ProductShowcasePortfolio from "./pages/ProductShowcasePortfolio";
import FluidTypographyPortfolio from "./pages/FluidTypographyPortfolio";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/inspiration" element={<Inspiration />} />
                <Route path="/assets" element={<Assets />} />
                <Route path="/blog" element={<Blog />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/course/:courseId" element={<CourseDetail />} />
              <Route path="/portfolio/immersive-3d" element={<ImmersivePortfolio />} />
              <Route path="/portfolio/animated-landing" element={<AnimatedLandingPortfolio />} />
              <Route path="/portfolio/product-showcase" element={<ProductShowcasePortfolio />} />
              <Route path="/portfolio/fluid-typography" element={<FluidTypographyPortfolio />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
