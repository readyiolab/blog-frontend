import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "@/components/ArticleCard";
import PublicLayout from "@/components/PublicLayout";
import SEOHead from "@/components/SEOHead";
import { getSectionConfig } from "@/lib/seo";
import { articleService } from "@/services/articleService";
import type { PublicArticle } from "@/types/content";
import ArticleSidebar from "@/components/ArticleSidebar";

const SectionPage = () => {
  const { sectionSlug } = useParams();
  const section = getSectionConfig(sectionSlug);
  const [articles, setArticles] = useState<PublicArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSection = async () => {
      if (!section) {
        setLoading(false);
        return;
      }

      try {
        const response =
          section.slug === "latest-news"
            ? await articleService.getAll({ limit: 24 })
            : await articleService.getByCategory(section.backendSlug, { limit: 24 });
        setArticles(response.data || []);
      } finally {
        setLoading(false);
      }
    };

    void loadSection();
    window.scrollTo(0, 0);
  }, [section]);

  if (!section) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h1 className="text-3xl font-bold">Section not found</h1>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <SEOHead
        title={section.metaTitle}
        description={section.metaDescription}
        keywords={section.keywords}
        path={`/${section.slug}`}
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: section.label,
            description: section.metaDescription,
            url: `https://beansnews.com/${section.slug}`,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://beansnews.com/" },
              { "@type": "ListItem", position: 2, name: section.label, item: `https://beansnews.com/${section.slug}` },
            ],
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Left Column: Feed */}
          <div>
            <div className="mb-10">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
                Explore News
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">{section.label}</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-w-2xl">{section.metaDescription}</p>
            </div>

            {loading ? <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />)}
            </div> : null}

            {!loading && !articles.length ? (
              <div className="text-center py-20 bg-muted/30 rounded-2xl">
                <p className="text-muted-foreground italic">No stories available in this section yet.</p>
              </div>
            ) : null}

            <div className="grid gap-8 md:grid-cols-2">
              {articles.map((article, index) => (
                <ArticleCard key={article.id} article={article} priority={index < 2} />
              ))}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="hidden lg:block">
            <ArticleSidebar />
          </aside>
        </div>
      </div>
    </PublicLayout>
  );
};

export default SectionPage;
