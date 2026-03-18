import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "@/components/ArticleCard";
import PublicLayout from "@/components/PublicLayout";
import SEOHead from "@/components/SEOHead";
import { homepageMeta, sectionConfigs } from "@/lib/seo";
import { articleService } from "@/services/articleService";
import type { PublicArticle } from "@/types/content";

const groupBySection = (articles: PublicArticle[]) =>
  sectionConfigs.reduce<Record<string, PublicArticle[]>>((accumulator, section) => {
    accumulator[section.slug] = articles.filter(
      (article) => article.category_slug === section.backendSlug
    );
    return accumulator;
  }, {});

const Index = () => {
  const [featured, setFeatured] = useState<PublicArticle[]>([]);
  const [trending, setTrending] = useState<PublicArticle[]>([]);
  const [latest, setLatest] = useState<PublicArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomepage = async () => {
      try {
        const [featuredResponse, trendingResponse, latestResponse] = await Promise.all([
          articleService.getFeatured(),
          articleService.getTrending(),
          articleService.getAll({ limit: 24 }),
        ]);

        setFeatured(featuredResponse.data || []);
        setTrending(trendingResponse.data || []);
        setLatest(latestResponse.data || []);
      } finally {
        setLoading(false);
      }
    };

    void loadHomepage();
  }, []);

  const articlesBySection = useMemo(() => groupBySection(latest), [latest]);
  const leadArticle = featured[0] || latest[0];
  const topStories = latest.slice(1, 5);

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
            {leadArticle ? <ArticleCard article={leadArticle} /> : null}
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 text-2xl font-semibold">Top Stories USA</h2>
            <div className="space-y-4">
              {topStories.map((article) => (
                <div key={article.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <ArticleCard article={article} />
                </div>
              ))}
              {!topStories.length && !loading ? <p>No top stories available.</p> : null}
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
          </div>
        </section>

        {sectionConfigs
          .filter((section) =>
            ["world-news", "business-news", "finance-news", "sports-news", "health-wellness", "opinion"].includes(section.slug)
          )
          .map((section) => (
            <section key={section.slug} className="mb-10">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{section.label}</h2>
                <Link to={`/${section.slug}`} className="text-sm font-medium text-primary hover:underline">
                  More in {section.label}
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {(articlesBySection[section.slug] || []).slice(0, 3).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          ))}

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-2xl font-semibold">Newsletter Signup</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Get breaking US and global news alerts, business updates, and editorial picks delivered daily.
          </p>
          <div className="mt-4 flex flex-col gap-3 md:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-11 flex-1 rounded-md border border-input bg-background px-4"
            />
            <button className="h-11 rounded-md bg-primary px-6 font-semibold text-primary-foreground">
              Subscribe
            </button>
          </div>
        </section>
      </section>
    </PublicLayout>
  );
};

export default Index;
