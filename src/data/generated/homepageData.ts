import type { PublicArticle, PublicCategory } from "@/types/content";

export type HomepageData = {
  generatedAt: string | null;
  featured: PublicArticle[];
  trending: PublicArticle[];
  latest: PublicArticle[];
  categories: PublicCategory[];
};

const homepageData: HomepageData = {
  generatedAt: null,
  featured: [],
  trending: [],
  latest: [],
  categories: [],
};

export default homepageData;
