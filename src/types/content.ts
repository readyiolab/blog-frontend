export interface PublicArticle {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  featured_image_alt?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
  views_count?: number;
  reading_time?: number;
  is_featured?: boolean;
  is_trending?: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  category_name?: string;
  category_slug?: string;
  author_id?: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  author_bio?: string;
  author_image?: string;
  twitter_url?: string;
  facebook_url?: string;
  linkedin_url?: string;
  tags?: Array<{ id: number; tag_name: string; slug: string }>;
  gallery?: Array<{ id: number; image_url: string; alt_text?: string; caption?: string }>;
}

export interface PublicCategory {
  id: number;
  category_name: string;
  slug: string;
  description?: string;
  article_count?: number;
  status?: string;
}

export interface SectionConfig {
  slug: string;
  backendSlug: string;
  label: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}
