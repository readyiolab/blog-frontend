import { useEffect } from "react";
import { DISCOVER_ROBOTS_CONTENT, SITE_NAME, getCanonicalUrl } from "@/lib/seo";

type Props = {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  canonicalUrl?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  author?: string;
  section?: string;
  publishedTime?: string;
  modifiedTime?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const upsertMeta = (selector: string, create: () => HTMLMetaElement, content: string) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const removeElement = (selector: string) => {
  document.head.querySelector(selector)?.remove();
};

const SEOHead = ({
  title,
  description,
  keywords = [],
  path = "/",
  canonicalUrl,
  image,
  imageAlt,
  type = "website",
  author,
  section,
  publishedTime,
  modifiedTime,
  schema,
}: Props) => {
  useEffect(() => {
    const resolvedCanonicalUrl = canonicalUrl || getCanonicalUrl(path);

    document.title = title;

    upsertMeta('meta[name="description"]', () => {
      const meta = document.createElement("meta");
      meta.name = "description";
      return meta;
    }, description);

    upsertMeta('meta[name="keywords"]', () => {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      return meta;
    }, keywords.join(", "));

    upsertMeta('meta[property="og:title"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:title");
      return meta;
    }, title);

    upsertMeta('meta[property="og:description"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:description");
      return meta;
    }, description);

    upsertMeta('meta[property="og:type"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:type");
      return meta;
    }, type);

    upsertMeta('meta[property="og:site_name"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:site_name");
      return meta;
    }, SITE_NAME);

    upsertMeta('meta[property="og:url"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:url");
      return meta;
    }, resolvedCanonicalUrl);

    upsertMeta('meta[name="twitter:card"]', () => {
      const meta = document.createElement("meta");
      meta.name = "twitter:card";
      return meta;
    }, image ? "summary_large_image" : "summary");

    upsertMeta('meta[name="twitter:title"]', () => {
      const meta = document.createElement("meta");
      meta.name = "twitter:title";
      return meta;
    }, title);

    upsertMeta('meta[name="twitter:description"]', () => {
      const meta = document.createElement("meta");
      meta.name = "twitter:description";
      return meta;
    }, description);

    upsertMeta('meta[name="robots"]', () => {
      const meta = document.createElement("meta");
      meta.name = "robots";
      return meta;
    }, DISCOVER_ROBOTS_CONTENT);

    upsertMeta('meta[name="googlebot"]', () => {
      const meta = document.createElement("meta");
      meta.name = "googlebot";
      return meta;
    }, DISCOVER_ROBOTS_CONTENT);

    if (author) {
      upsertMeta('meta[name="author"]', () => {
        const meta = document.createElement("meta");
        meta.name = "author";
        return meta;
      }, author);
    } else {
      removeElement('meta[name="author"]');
    }

    if (image) {
      upsertMeta('meta[property="og:image"]', () => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:image");
        return meta;
      }, image);

      upsertMeta('meta[name="twitter:image"]', () => {
        const meta = document.createElement("meta");
        meta.name = "twitter:image";
        return meta;
      }, image);
    } else {
      removeElement('meta[property="og:image"]');
      removeElement('meta[name="twitter:image"]');
    }

    if (imageAlt) {
      upsertMeta('meta[property="og:image:alt"]', () => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:image:alt");
        return meta;
      }, imageAlt);

      upsertMeta('meta[name="twitter:image:alt"]', () => {
        const meta = document.createElement("meta");
        meta.name = "twitter:image:alt";
        return meta;
      }, imageAlt);
    } else {
      removeElement('meta[property="og:image:alt"]');
      removeElement('meta[name="twitter:image:alt"]');
    }

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = resolvedCanonicalUrl;

    if (type === "article") {
      if (publishedTime) {
        upsertMeta('meta[property="article:published_time"]', () => {
          const meta = document.createElement("meta");
          meta.setAttribute("property", "article:published_time");
          return meta;
        }, publishedTime);
      } else {
        removeElement('meta[property="article:published_time"]');
      }

      if (modifiedTime) {
        upsertMeta('meta[property="article:modified_time"]', () => {
          const meta = document.createElement("meta");
          meta.setAttribute("property", "article:modified_time");
          return meta;
        }, modifiedTime);
      } else {
        removeElement('meta[property="article:modified_time"]');
      }

      if (author) {
        upsertMeta('meta[property="article:author"]', () => {
          const meta = document.createElement("meta");
          meta.setAttribute("property", "article:author");
          return meta;
        }, author);
      } else {
        removeElement('meta[property="article:author"]');
      }

      if (section) {
        upsertMeta('meta[property="article:section"]', () => {
          const meta = document.createElement("meta");
          meta.setAttribute("property", "article:section");
          return meta;
        }, section);
      } else {
        removeElement('meta[property="article:section"]');
      }
    } else {
      removeElement('meta[property="article:published_time"]');
      removeElement('meta[property="article:modified_time"]');
      removeElement('meta[property="article:author"]');
      removeElement('meta[property="article:section"]');
    }

    const scriptId = "beans-news-schema";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema ?? {});

    return () => {
      if (script && script.textContent === JSON.stringify(schema ?? {})) {
        script.textContent = "";
      }
    };
  }, [
    author,
    canonicalUrl,
    description,
    image,
    imageAlt,
    keywords,
    modifiedTime,
    path,
    publishedTime,
    schema,
    section,
    title,
    type,
  ]);

  return null;
};

export default SEOHead;
