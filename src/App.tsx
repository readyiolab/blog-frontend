import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SectionPage from "./pages/SectionPage";
import ArticlePage from "./pages/ArticlePage";
import StaticPage from "./pages/StaticPage";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ArticlesList from "./pages/admin/ArticlesList";
import CategoriesList from "./pages/admin/CategoriesList";
import CreateArticle from "./pages/admin/CreateArticle";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/sitemap.xml" 
            Component={() => {
              useEffect(() => {
                window.location.replace('https://api.beansnews.com/sitemap.xml');
              }, []);
              return null;
            }}
          />
          <Route path="/" element={<Index />} />
          <Route path="/:sectionSlug" element={<SectionPage />} />
          <Route path="/:sectionSlug/:articleSlug" element={<ArticlePage />} />
          <Route path="/about-us" element={<StaticPage pageSlug="about-us" />} />
          <Route path="/contact-us" element={<StaticPage pageSlug="contact-us" />} />
          <Route path="/privacy-policy" element={<StaticPage pageSlug="privacy-policy" />} />
          <Route path="/disclaimer" element={<StaticPage pageSlug="disclaimer" />} />
          <Route path="/editorial-policy" element={<StaticPage pageSlug="editorial-policy" />} />
          <Route path="/terms-and-conditions" element={<StaticPage pageSlug="terms-and-conditions" />} />
          <Route path="/write-for-us" element={<StaticPage pageSlug="write-for-us" />} />
          {/* Admin Routes Wrapped in Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="articles" element={<ArticlesList />} />
            <Route path="categories" element={<CategoriesList />} />
            <Route path="articles/create" element={<CreateArticle />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
