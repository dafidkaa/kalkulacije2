export interface BlogPostFrontMatter {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  status: 'draft' | 'published';
  tags: string[];
  category: string;
  heroImage?: string;
  canonical?: string;
  faq?: Array<{
    q: string;
    a: string;
  }>;
}

export interface BlogPost extends BlogPostFrontMatter {
  slug: string;
  content: string;
  htmlContent: string;
  excerpt: string;
  readTime: number;
  toc: Array<{
    id: string;
    title: string;
    level: number;
  }>;
}

export interface BlogIndex {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  heroImage?: string;
  excerpt: string;
  readTime: number;
}

export interface SearchIndex {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  content: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

export interface BlogTag {
  name: string;
  slug: string;
  count: number;
}

export interface RelatedCalculator {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface BlogPageProps {
  posts: BlogIndex[];
  pagination: PaginationInfo;
  categories: BlogCategory[];
  tags: BlogTag[];
}

export interface BlogPostPageProps {
  post: BlogPost;
  relatedPosts: BlogIndex[];
  relatedCalculators: RelatedCalculator[];
  nextPost?: BlogIndex;
  prevPost?: BlogIndex;
}

export interface BlogSearchResult {
  post: BlogIndex;
  score: number;
  matchedFields: string[];
}

export interface BlogConfig {
  postsPerPage: number;
  excerptLength: number;
  wordsPerMinute: number;
  enableComments: boolean;
  enableSearch: boolean;
  enableRSS: boolean;
  enableSitemap: boolean;
  defaultAuthor: string;
  siteUrl: string;
  blogPath: string;
}

export const defaultBlogConfig: BlogConfig = {
  postsPerPage: 12,
  excerptLength: 160,
  wordsPerMinute: 200,
  enableComments: false,
  enableSearch: true,
  enableRSS: true,
  enableSitemap: true,
  defaultAuthor: 'Kalkulacije Tim',
  siteUrl: 'https://kalkulacije.com',
  blogPath: '/blog'
};
