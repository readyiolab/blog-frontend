import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";

// Lazy-load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SectionPage = lazy(() => import("./pages/SectionPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const StaticPage = lazy(() => import("./pages/StaticPage"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ArticlesList = lazy(() => import("./pages/admin/ArticlesList"));
const CategoriesList = lazy(() => import("./pages/admin/CategoriesList"));
const CreateArticle = lazy(() => import("./pages/admin/CreateArticle"));

const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
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
    </Suspense>
    <ScrollToTop />
  </BrowserRouter>
);

export default App;
