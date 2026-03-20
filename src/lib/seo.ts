import type { SectionConfig } from "@/types/content";

export const SITE_NAME = "Beans News";
export const SITE_URL = import.meta.env.VITE_SITE_URL || "https://beansnews.com";
export const DISCOVER_ROBOTS_CONTENT =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export const formatArticleDate = (value?: string) => {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

export const sectionConfigs: SectionConfig[] = [
  {
    slug: "india-news",
    backendSlug: "india-news",
    label: "India News",
    metaTitle: "India News Today - Politics, Economy & Latest Updates",
    metaDescription:
      "Latest India news covering politics, economy, technology, and national updates. Read breaking Indian news stories at Beans News.",
    keywords: ["India news today", "Indian politics news", "India economy news", "breaking India news", "latest news India"],
  },
  {
    slug: "world-news",
    backendSlug: "world-news",
    label: "World News",
    metaTitle: "World News Today - Global Politics, Economy & Headlines",
    metaDescription:
      "Breaking world news including international politics, economy, conflicts, and global developments updated daily.",
    keywords: ["world news today", "international news", "global politics news", "latest world headlines", "global economy news"],
  },
  {
    slug: "business",
    backendSlug: "business",
    label: "Business",
    metaTitle: "Business News Today - US Markets, Companies & Economy",
    metaDescription:
      "Latest US business news, company updates, startups, and economic trends affecting global markets.",
    keywords: ["business news USA", "company news", "startup news", "US economy news", "corporate news"],
  },
  {
    slug: "technology",
    backendSlug: "technology",
    label: "Technology",
    metaTitle: "Technology News - Gadgets, AI & Tech Trends",
    metaDescription: "Follow latest technology news, gadgets, AI developments and tech industry updates.",
    keywords: ["tech news", "gadgets", "artificial intelligence", "tech reviews"],
  },
  {
    slug: "entertainment",
    backendSlug: "entertainment",
    label: "Entertainment",
    metaTitle: "Entertainment News - Movies, Music & Celebrity Updates",
    metaDescription: "Latest entertainment news covering movies, music, celebrities and pop culture.",
    keywords: ["entertainment news", "movie news", "celebrity gossip", "music updates"],
  },
  {
    slug: "finance-news",
    backendSlug: "finance-news",
    label: "Finance News",
    metaTitle: "Finance News - Stock Market, Inflation & Economy",
    metaDescription:
      "Finance news covering US stock market, inflation, interest rates, cryptocurrency and investment trends.",
    keywords: ["finance news", "stock market news", "inflation news", "federal reserve news", "crypto market news"],
  },
  {
    slug: "sports-news",
    backendSlug: "sports-news",
    label: "Sports News",
    metaTitle: "Sports News - NBA, NFL, Soccer & Global Sports",
    metaDescription:
      "Latest sports news including NBA, NFL, soccer, tennis, and major sporting events from around the world.",
    keywords: ["sports news today", "nba news", "nfl news", "soccer news", "sports headlines"],
  },
  {
    slug: "health-wellness",
    backendSlug: "health-wellness",
    label: "Health & Wellness",
    metaTitle: "Health & Wellness News - Fitness, Nutrition & Medical Updates",
    metaDescription:
      "Latest health news, wellness tips, fitness trends, nutrition advice, and medical research updates.",
    keywords: ["health news", "wellness tips", "fitness trends", "nutrition advice", "medical research news"],
  },
  {
    slug: "opinion",
    backendSlug: "opinion",
    label: "Opinion",
    metaTitle: "Opinion - Analysis, Editorials & Expert Perspectives",
    metaDescription:
      "Read editorials, opinion pieces, and expert analysis on politics, economy, business, and society.",
    keywords: ["opinion news", "editorials", "expert analysis", "news commentary"],
  },
  {
    slug: "latest-news",
    backendSlug: "latest-news",
    label: "Latest News",
    metaTitle: "Latest News Today - Breaking Headlines From the USA and Beyond",
    metaDescription:
      "Live latest news updates from the USA and around the world. Breaking headlines, business, finance, health, and sports.",
    keywords: ["latest news", "breaking headlines", "today news", "usa breaking news"],
  },
];

export const homepageMeta = {
  title: "Beans News - Breaking US & Global News Today",
  description:
    "Latest breaking news from the USA and around the world. Business, finance, sports, health and trending stories updated daily at Beans News.",
  keywords: [
    "breaking news USA",
    "latest news USA",
    "world news today",
    "US business news",
    "sports news USA",
    "health news",
  ],
};

export const staticPages = {
  "about-us": {
    title: "About Us - Beans News",
    heading: "About Beans News",
    description:
      "Beans News is an independent digital news platform publishing reliable news and analysis across multiple categories.",
  },
  "contact-us": {
    title: "Contact Us - Beans News",
    heading: "Contact Beans News",
    description:
      "Reach the Beans News editorial desk for corrections, partnerships, news tips, and general inquiries.",
  },
  "privacy-policy": {
    title: "Privacy Policy - Beans News",
    heading: "Privacy Policy for Beans News",
    description:
      "Learn how Beans News collects, uses, and protects reader information and data across the website.",
  },
  disclaimer: {
    title: "Disclaimer - Beans News",
    heading: "Disclaimer for Beans News",
    description:
      "General information, accuracy, and external links disclaimers for Beans News content.",
  },
  "editorial-policy": {
    title: "Editorial Policy - Beans News",
    heading: "Editorial Policy – Beans News",
    description:
      "Beans News editorial standards covering mission, independence, fact-checking, and corrections.",
  },
  "terms-and-conditions": {
    title: "Terms & Conditions - Beans News",
    heading: "Terms and Conditions",
    description:
      "The terms and conditions governing access to and use of the Beans News website and content.",
  },
  "write-for-us": {
    title: "Write for Us - Beans News",
    heading: "Write for Beans News",
    description:
      "Submit your original articles and contribute to Beans News reporting across multiple news categories.",
  },
};

export const getSectionConfig = (slug?: string) =>
  sectionConfigs.find((section) => section.slug === slug);

export const getCanonicalUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
