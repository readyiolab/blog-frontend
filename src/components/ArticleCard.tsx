import { Link } from "react-router-dom";
import { formatArticleDate } from "@/lib/seo";
import { getOptimizedImageUrl, getCloudinarySrcSet } from "@/lib/images";
import type { PublicArticle } from "@/types/content";

const ArticleCard = ({ article, priority = false }: { article: PublicArticle; priority?: boolean }) => {
  const sectionSlug = article.category_slug || "latest-news";
  const articleUrl = `/${sectionSlug}/${article.slug}`;
  const authorName =
    [article.first_name, article.last_name].filter(Boolean).join(" ") ||
    article.username ||
    "Beans News Desk";
  const publishedAt = article.published_at || article.created_at || article.updated_at;
  const publishedLabel = formatArticleDate(publishedAt);

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card">
      {article.featured_image ? (
        <Link to={articleUrl} className="block aspect-[16/9] overflow-hidden">
          <img
            src={getOptimizedImageUrl(article.featured_image, priority ? 1200 : 800)}
            srcSet={getCloudinarySrcSet(article.featured_image)}
            sizes={priority ? "(max-width: 1024px) 100vw, 850px" : "(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"}
            alt={article.featured_image_alt || article.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "low"}
            width="800"
            height="450"
            decoding={priority ? "sync" : "async"}
          />
        </Link>
      ) : null}
      <div className="space-y-3 p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {article.category_name || "Latest News"}
        </div>
        <Link to={articleUrl} className="block">
          <h3 className="text-xl font-semibold leading-tight hover:text-primary">
            {article.title}
          </h3>
        </Link>
        {article.excerpt ? (
          <p className="text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
        ) : null}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/80">By {authorName}</span>
          {publishedAt ? (
            <time dateTime={publishedAt}>{publishedLabel}</time>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
