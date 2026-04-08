import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleCard from "@/components/ArticleCard";
import PublicLayout from "@/components/PublicLayout";
import SEOHead from "@/components/SEOHead";
import { homepageMeta, sectionConfigs } from "@/lib/seo";
import { articleService } from "@/services/articleService";
import { categoryService } from "@/services/categoryService";
import { lazy, Suspense } from "react";

const NewsletterForm = lazy(() => import("@/components/NewsletterForm"));
import type { PublicArticle, PublicCategory } from "@/types/content";

const Index = () => {
  const [featured, setFeatured] = useState<PublicArticle[]>([]);
  const [trending, setTrending] = useState<PublicArticle[]>([]);
  const [latest, setLatest] = useState<PublicArticle[]>([]);
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [criticalLoading, setCriticalLoading] = useState(true);
  const [sectionsLoading, setSectionsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadCritical = async () => {
      try {
        const featuredResponse = await articleService.getFeatured();
        if (active) {
          setFeatured(featuredResponse.data || []);
        }
      } finally {
        if (active) {
          setCriticalLoading(false);
        }
      }
    };

    const loadSections = async () => {
      try {
        const [trendingResponse, latestResponse, categoriesResponse] = await Promise.all([
          articleService.getTrending(),
          articleService.getAll({ limit: 48 }),
          categoryService.getAll(),
        ]);

        if (active) {
          setTrending(trendingResponse.data || []);
          setLatest(latestResponse.data || []);
          setCategories(categoriesResponse.data || []);
        }
      } finally {
        if (active) {
          setSectionsLoading(false);
        }
      }
    };

    void loadCritical();
    void loadSections();

    return () => {
      active = false;
    };
  }, []);

  const articlesBySection = useMemo(() => {
    const grouped: Record<string, PublicArticle[]> = {};
    latest.forEach(article => {
      if (article.category_slug) {
        if (!grouped[article.category_slug]) grouped[article.category_slug] = [];
        grouped[article.category_slug].push(article);
      }
    });
    return grouped;
  }, [latest]);
  const leadArticle = featured[0] || latest[0];
  const topStories = latest.slice(0, 4);

  return (
    <PublicLayout>
      <SEOHead
        title={homepageMeta.title}
        description={homepageMeta.description}
        keywords={homepageMeta.keywords}
        path="/"
        image={leadArticle?.featured_image}
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Beans News",
          url: "https://beansnews.com",
          sameAs: [],
        }}
      />

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              Breaking News
            </p>
            {leadArticle ? (
              <ArticleCard article={leadArticle} priority={true} />
            ) : (
              <Skeleton className="h-[400px] w-full rounded-2xl" />
            )}
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 text-2xl font-semibold">Top Stories USA</h2>
            <div className="space-y-4">
              {topStories.length ? (
                topStories.map((article) => (
                  <div key={article.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <ArticleCard article={article} />
                  </div>
                ))
              ) : (
                [1, 2, 3].map((item) => <Skeleton key={item} className="h-24 w-full" />)
              )}
              {!topStories.length && !sectionsLoading && !criticalLoading ? <p>No top stories available.</p> : null}
            </div>
          </div>
        </div>

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Trending Topics</h2>
            <Link to="/latest-news" className="text-sm font-medium text-primary hover:underline">
              View all latest news
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {trending.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
            {!trending.length && sectionsLoading
              ? [1, 2, 3].map((item) => <Skeleton key={item} className="h-[300px] w-full" />)
              : null}
          </div>
        </section>

        {categories
          .filter(cat => cat.slug !== "latest-news")
          .map((cat) => {
            const sectionArticles = articlesBySection[cat.slug] || [];
            if (sectionArticles.length === 0) return null;

            const config = sectionConfigs.find(s => s.backendSlug === cat.slug || s.slug === cat.slug);
            const label = config?.label || cat.category_name;

            return (
              <section key={cat.slug} className="mb-10">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">{label}</h2>
                  <Link to={`/${cat.slug}`} className="text-sm font-medium text-primary hover:underline">
                    More in {label}
                  </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {sectionArticles.slice(0, 3).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            );
          })}

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-2xl font-semibold">Newsletter Signup</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Get breaking US and global news alerts, business updates, and editorial picks delivered daily.
          </p>
          <Suspense fallback={<div className="mt-4 h-[200px] w-full animate-pulse rounded-lg bg-muted" />}>
            <NewsletterForm />
          </Suspense>
        </section>
      </section>
    </PublicLayout>
  );
};

export default Index;
