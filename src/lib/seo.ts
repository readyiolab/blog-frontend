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
    slug: "tech-ai-startups",
    backendSlug: "tech-ai-startups",
    label: "Tech & AI Startups",
    metaTitle: "Top AI Startups & Tech Trends in 2026",
    metaDescription:
      "Explore the fastest-growing AI startups, SaaS tools, and tech innovations shaping the future of business.",
    keywords: ["ai", "artificial general intelligence", "ai chat", "open ai", "startup", "startup company"],
  },
  {
    slug: "startup-finance",
    backendSlug: "startup-finance",
    label: "Startup Finance & Funding",
    metaTitle: "Startup Funding News & Investment Trends",
    metaDescription:
      "Track funding rounds, venture capital trends, and startup investments globally with real insights.",
    keywords: ["googlefinance", "finance", "financial advisor", "ai startups", "funding", "crowdfunding for startups", "get funding for startup"],
  },
  {
    slug: "digital-marketing",
    backendSlug: "digital-marketing",
    label: "Digital Marketing & Growth",
    metaTitle: "Startup Growth & Digital Marketing Strategies",
    metaDescription:
      "Learn how startups grow using SEO, ads, and viral marketing strategies in 2026.",
    keywords: ["digital marketing", "content marketing", "marketing companies", "best digital marketing companies", "digital marketing agency for startups", "growth marketing", "AI marketing"],
  },
  {
    slug: "founder-stories",
    backendSlug: "founder-stories",
    label: "Founder Stories & Case Studies",
    metaTitle: "Startup Success & Failure Stories",
    metaDescription:
      "Read real startup journeys, failures, and lessons from founders worldwide.",
    keywords: ["start up business ideas", "founder", "the founder", "startup company", "ai startups", "startup funding", "funding for start up businesses", "best startup business"],
  },
  {
    slug: "side-hustles",
    backendSlug: "side-hustles",
    label: "Side Hustles & Online Business",
    metaTitle: "Best Online Business Ideas & Side Hustles 2026",
    metaDescription:
      "Discover profitable side hustles, online business ideas, and passive income strategies.",
    keywords: ["side hustle", "business ideas", "passive income ideas", "small business ideas", "ecommerce business ideas", "stealth startup", "Online Business"],
  },
  {
    slug: "latest-news",
    backendSlug: "latest-news",
    label: "Latest News",
    metaTitle: "Latest News Today - Startup & Tech Updates | Beans News",
    metaDescription:
      "Live latest updates from the startup world, AI tools, and digital growth strategies. Breaking headlines for founders.",
    keywords: ["latest news", "startup news", "tech headlines", "ai updates"],
  },
];

export const homepageMeta = {
  title: "Beans News | Startup, AI, Finance & Digital Growth Insights",
  description:
    "Get real-time startup news, AI tools, funding updates, and digital marketing strategies. Data-driven insights for founders, marketers, and creators.",
  keywords: [
    "startup news",
    "AI tools",
    "startup funding",
    "digital marketing",
    "growth strategies",
    "founder stories",
    "online business ideas",
  ],
};

export const staticPages = {
  "about-us": {
    title: "About Beans News",
    heading: "About Beans News",
    description:
      "Beans News is a global digital media platform that shares startup news, AI tools, funding updates, and digital marketing strategies.",
  },
  "contact-us": {
    title: "Contact Beans News",
    heading: "Contact Us",
    description:
      "Contact Beans News for business inquiries, guest posting, and collaborations via email.",
  },
  "privacy-policy": {
    title: "Privacy Policy",
    heading: "Privacy Policy",
    description:
      "Beans News collects limited data like email and cookies to improve user experience and does not sell personal information.",
  },
  disclaimer: {
    title: "Disclaimer",
    heading: "Disclaimer",
    description:
      "All content on Beans News is for informational purposes only and does not guarantee financial or business results.",
  },
  "editorial-policy": {
    title: "Editorial Policy",
    heading: "Editorial Policy",
    description:
      "All content on Beans News is verified, original, and focused on real-world usefulness.",
  },
  "terms-and-conditions": {
    title: "Terms and Conditions",
    heading: "Terms & Conditions",
    description:
      "By using Beans News, you agree to follow our terms related to content usage and website behavior.",
  },
  "write-for-us": {
    title: "Write For Us – Beans News",
    heading: "Write for Us",
    description:
      "Beans News accepts guest posts on startups, AI, finance, and digital marketing with a focus on real insights.",
  },
};

export const getSectionConfig = (slug?: string) =>
  sectionConfigs.find((section) => section.slug === slug);

export const getCanonicalUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
