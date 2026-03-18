import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import MortgageCalculator from "./pages/MortgageCalculator";
import Blog from "./pages/Blog";
import TeamMember from "./pages/TeamMember";
import Favorites from "./pages/Favorites";
import BookConsultation from "./pages/BookConsultation";
import BookInspection from "./pages/BookInspection";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminConsultations from "./pages/admin/AdminConsultations";
import AdminGallery from "./pages/admin/AdminGallery";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/team/:id" element={<TeamMember />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/book-consultation" element={<BookConsultation />} />
          <Route path="/book-inspection" element={<BookInspection />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="consultations" element={<AdminConsultations />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
