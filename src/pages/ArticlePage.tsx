import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PublicLayout from "@/components/PublicLayout";
import SEOHead from "@/components/SEOHead";
import { SITE_URL, formatArticleDate } from "@/lib/seo";
import { getOptimizedImageUrl, getCloudinarySrcSet } from "@/lib/images";
import { articleService } from "@/services/articleService";
import type { PublicArticle } from "@/types/content";
import ArticleSidebar from "@/components/ArticleSidebar";
import SocialShare from "@/components/SocialShare";
import AuthorBox from "@/components/AuthorBox";
import CommentSection from "@/components/CommentSection";

const ArticlePage = () => {
  const { sectionSlug, articleSlug } = useParams();
  const [article, setArticle] = useState<PublicArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      if (!articleSlug) {
        setLoading(false);
        return;
      }

      try {
        const response = await articleService.getBySlug(articleSlug);
        setArticle(response.data || null);
      } finally {
        setLoading(false);
      }
    };

    void loadArticle();
    window.scrollTo(0, 0);
  }, [articleSlug]);

  const authorName = useMemo(() => {
    if (!article) {
      return "Beans News Desk";
    }

    return [article.first_name, article.last_name].filter(Boolean).join(" ") || article.username || "Beans News Desk";
  }, [article]);

  const faqItems = article
    ? [
      {
        question: `What is this ${article.category_name || "news"} article about?`,
        answer: article.excerpt || article.title,
      },
      {
        question: "Who published this article?",
        answer: `${authorName} published this story on Beans News.`,
      },
      {
        question: "When was this article last updated?",
        answer: article.updated_at ? new Date(article.updated_at).toLocaleString() : "This article is updated as new information is confirmed.",
      },
    ]
    : [];

  if (loading) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_320px] gap-10">
            <div className="hidden lg:block" />
            <div className="h-40 w-full animate-pulse bg-muted rounded-lg" />
            <div className="hidden lg:block h-96 w-full animate-pulse bg-muted rounded-lg" />
          </div>
        </div>
      </PublicLayout>
    );
  }

  if (!article) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h1 className="text-3xl font-bold">Article not found</h1>
        </div>
      </PublicLayout>
    );
  }

  const articlePath = `/${sectionSlug || article.category_slug || "latest-news"}/${article.slug}`;
  const fullUrl = article.canonical_url || `${SITE_URL}${articlePath}`;
  const publishedAt = article.published_at || article.created_at;
  const modifiedAt = article.updated_at || publishedAt;
  const publishedLabel = formatArticleDate(publishedAt);
  const modifiedLabel = formatArticleDate(modifiedAt);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: article.title,
      description: article.meta_description || article.excerpt || article.title,
      image: article.featured_image ? [article.featured_image] : undefined,
      datePublished: publishedAt,
      dateModified: modifiedAt,
      author: {
        "@type": "Person",
        name: authorName,
        description: article.author_bio || undefined,
        image: article.author_image || undefined,
      },
      publisher: {
        "@type": "Organization",
        name: "Beans News",
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/favicon.ico`,
        },
      },
      mainEntityOfPage: fullUrl,
      isAccessibleForFree: true,
      articleSection: article.category_name || "Latest News",
      keywords: article.meta_keywords || article.category_name,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: article.category_name || "Latest News",
          item: `${SITE_URL}/${article.category_slug || sectionSlug || "latest-news"}`,
        },
        { "@type": "ListItem", position: 3, name: article.title, item: fullUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <PublicLayout>
      <SEOHead
        title={article.meta_title || `${article.title} | Beans News`}
        description={article.meta_description || article.excerpt || article.title}
        keywords={(article.meta_keywords || article.category_name || "").split(",").map((item) => item.trim()).filter(Boolean)}
        path={articlePath}
        canonicalUrl={fullUrl}
        image={article.featured_image}
        imageAlt={article.featured_image_alt || article.title}
        type="article"
        author={authorName}
        section={article.category_name || "Latest News"}
        publishedTime={publishedAt}
        modifiedTime={modifiedAt}
        schema={schema}
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm text-muted-foreground border-b pb-4">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/${article.category_slug || sectionSlug || "latest-news"}`} className="hover:text-primary transition-colors uppercase font-bold text-xs tracking-wider">
            {article.category_name || "Latest News"}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_320px] gap-10">
          {/* Left Sidebar: Socials */}
          <aside className="hidden lg:block">
            <SocialShare url={fullUrl} title={article.title} />
          </aside>

          {/* Main Content */}
          <article className="min-w-0">
            <div className="space-y-4 mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                {article.category_name || "Latest News"}
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl leading-[1.1]">
                {article.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-y border-border/50 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {authorName.charAt(0)}
                  </div>
                  <span className="font-semibold text-foreground">By {authorName}</span>
                </div>
                {publishedAt ? (
                  <>
                    <div className="hidden sm:block h-1 w-1 rounded-full bg-border" />
                    <time dateTime={publishedAt}>Published {publishedLabel}</time>
                  </>
                ) : null}
                {modifiedAt && modifiedAt !== publishedAt ? (
                  <>
                    <div className="hidden sm:block h-1 w-1 rounded-full bg-border" />
                    <time dateTime={modifiedAt}>Updated {modifiedLabel}</time>
                  </>
                ) : null}
                {article.reading_time ? (
                  <>
                    <div className="hidden sm:block h-1 w-1 rounded-full bg-border" />
                    <span>{article.reading_time} min read</span>
                  </>
                ) : null}
              </div>
            </div>

            {article.featured_image ? (
              <figure className="mb-8 overflow-hidden rounded-xl border bg-muted">
                <img
                  src={getOptimizedImageUrl(article.featured_image, 1200)}
                  srcSet={getCloudinarySrcSet(article.featured_image)}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  alt={article.featured_image_alt || article.title}
                  className="h-auto w-full object-cover max-h-[600px]"
                  loading="eager"
                  fetchPriority="high"
                  width="1200"
                  height="675"
                  decoding="sync"
                />
                {article.featured_image_alt && (
                  <figcaption className="p-3 text-xs italic text-muted-foreground bg-card border-t">
                    {article.featured_image_alt}
                  </figcaption>
                )}
              </figure>
            ) : null}

            {article.excerpt ? (
              <div className="mb-10 rounded-xl border-l-4 border-primary bg-muted/30 p-6 italic shadow-sm">
                <p className="text-lg leading-relaxed text-foreground/80">
                  {article.excerpt}
                </p>
              </div>
            ) : null}

            <div
              className="prose prose-zinc dark:prose-invert prose-lg max-w-none 
                prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:border prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: article.content || "<p>No content available.</p>" }}
            />

            <hr className="my-12 border-border" />

            <section className="mt-12 rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="h-8 w-1 bg-primary rounded-full" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqItems.map((item) => (
                  <div key={item.question} className="group">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{item.question}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Author Profile Box */}
            <AuthorBox article={article} />

            {/* Comments Section */}
            <CommentSection articleId={article.id} />

            {/* Mobile Share (fallback for small screens) */}
            <div className="mt-10 lg:hidden flex justify-center py-6 border-t border-border">
              <SocialShare url={fullUrl} title={article.title} />
            </div>
          </article>

          {/* Right Sidebar: RelatedNews & Widgets */}
          <aside>
            <ArticleSidebar />
          </aside>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ArticlePage;
