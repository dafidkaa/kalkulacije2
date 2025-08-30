import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkToc from 'remark-toc';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export interface BlogPost {
  slug: string;
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

// Configure markdown processor
const processor = remark()
  .use(remarkGfm)
  .use(remarkToc, { heading: 'Sadržaj', tight: true })
  .use(remarkHtml, { sanitize: false })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: 'wrap',
    properties: {
      className: ['anchor-link']
    }
  })
  .use(rehypeHighlight);

/**
 * Parse markdown content with front-matter
 */
export async function parseMarkdown(markdownContent: string): Promise<{
  frontMatter: any;
  htmlContent: string;
  content: string;
  toc: Array<{ id: string; title: string; level: number }>;
}> {
  const { data: frontMatter, content } = matter(markdownContent);
  
  // Process markdown to HTML
  const result = await processor.process(content);
  const htmlContent = result.toString();
  
  // Extract table of contents from headings
  const toc = extractTableOfContents(content);
  
  return {
    frontMatter,
    htmlContent,
    content,
    toc
  };
}

/**
 * Extract table of contents from markdown content
 */
function extractTableOfContents(content: string): Array<{ id: string; title: string; level: number }> {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: Array<{ id: string; title: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = slugify(title);
    
    if (level >= 2 && level <= 3) {
      toc.push({ id, title, level });
    }
  }

  return toc;
}

/**
 * Generate URL-friendly slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Calculate reading time (approximately 200 words per minute)
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readTime); // Minimum 1 minute
}

/**
 * Generate excerpt from content or description
 */
export function generateExcerpt(content: string, description?: string, maxLength = 160): string {
  if (description && description.length <= maxLength) {
    return description;
  }
  
  // Remove markdown syntax and get first paragraph
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headings
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\n\s*\n/g, ' ') // Replace double newlines with space
    .replace(/\n/g, ' ') // Replace single newlines with space
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // Truncate at word boundary
  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

/**
 * Sort posts by date (newest first)
 */
export function sortPostsByDate(posts: BlogIndex[]): BlogIndex[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Filter posts by tag
 */
export function filterPostsByTag(posts: BlogIndex[], tag: string): BlogIndex[] {
  return posts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Filter posts by category
 */
export function filterPostsByCategory(posts: BlogIndex[], category: string): BlogIndex[] {
  return posts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get related posts based on shared tags
 */
export function getRelatedPosts(
  currentPost: BlogPost, 
  allPosts: BlogIndex[], 
  maxResults = 3
): BlogIndex[] {
  const related = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      const sharedTags = post.tags.filter(tag => 
        currentPost.tags.some(currentTag => 
          currentTag.toLowerCase() === tag.toLowerCase()
        )
      );
      return { post, score: sharedTags.length };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.post);

  // If not enough related posts by tags, fill with posts from same category
  if (related.length < maxResults) {
    const categoryPosts = allPosts
      .filter(post => 
        post.slug !== currentPost.slug &&
        post.category.toLowerCase() === currentPost.category.toLowerCase() &&
        !related.some(r => r.slug === post.slug)
      )
      .slice(0, maxResults - related.length);
    
    related.push(...categoryPosts);
  }

  return related;
}

/**
 * Validate blog post front-matter
 */
export function validateFrontMatter(frontMatter: any): string[] {
  const errors: string[] = [];
  
  if (!frontMatter.title) errors.push('Title is required');
  if (!frontMatter.description) errors.push('Description is required');
  if (!frontMatter.date) errors.push('Date is required');
  if (!frontMatter.status) errors.push('Status is required');
  if (!['draft', 'published'].includes(frontMatter.status)) {
    errors.push('Status must be "draft" or "published"');
  }
  if (!frontMatter.tags || !Array.isArray(frontMatter.tags)) {
    errors.push('Tags must be an array');
  }
  if (!frontMatter.category) errors.push('Category is required');
  
  // Validate date format
  if (frontMatter.date && isNaN(Date.parse(frontMatter.date))) {
    errors.push('Date must be in valid ISO format (YYYY-MM-DD)');
  }
  
  return errors;
}
