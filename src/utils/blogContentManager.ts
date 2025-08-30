import { 
  BlogPost, 
  BlogIndex, 
  SearchIndex, 
  BlogCategory, 
  BlogTag,
  PaginationInfo,
  defaultBlogConfig 
} from '../types/blog';
import { 
  parseMarkdown, 
  calculateReadTime, 
  generateExcerpt, 
  sortPostsByDate,
  filterPostsByTag,
  filterPostsByCategory,
  getRelatedPosts,
  validateFrontMatter,
  slugify
} from './blogUtils';

/**
 * Blog Content Manager
 * Handles all blog content operations including reading, parsing, and indexing
 */
export class BlogContentManager {
  private posts: Map<string, BlogPost> = new Map();
  private index: BlogIndex[] = [];
  private searchIndex: SearchIndex[] = [];
  private categories: BlogCategory[] = [];
  private tags: BlogTag[] = [];
  private isInitialized = false;

  /**
   * Initialize the blog content manager
   * In a real implementation, this would read from the file system
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // For now, we'll create some sample content
    // In the actual implementation, this would read from /content/blog/
    await this.loadSampleContent();
    
    this.buildIndexes();
    this.isInitialized = true;
  }

  /**
   * Load sample blog content for demonstration
   * This will be replaced with actual file system reading
   */
  private async loadSampleContent(): Promise<void> {
    const samplePosts = [
      {
        slug: 'kako-izracunati-razliku-izmedu-datuma',
        frontMatter: {
          title: 'Kako izračunati razliku između datuma (uz primjere)',
          description: 'Jednostavan vodič za izračun razlike između datuma, uključujući radne dane i blagdane.',
          date: '2025-01-30',
          status: 'published' as const,
          tags: ['datumi', 'radni dani', 'računanje'],
          category: 'Datumi i dani',
          heroImage: '/images/blog/kako-izracunati-razliku/hero.jpg',
          canonical: 'https://kalkulacije.com/blog/kako-izracunati-razliku-izmedu-datuma',
          faq: [
            {
              q: 'Kako izračunati dane između datuma?',
              a: 'Unesite početni i završni datum i kliknite Izračunaj. Alat prikazuje ukupan broj dana, a opcionalno i radne dane.'
            },
            {
              q: 'Računate li blagdane?',
              a: 'Da, za Hrvatsku; listu je moguće prilagoditi.'
            }
          ]
        },
        content: `## Sažetak
Izračun razlike između datuma je česta potreba u svakodnevnom životu i poslovanju. Ovaj vodič objašnjava kako jednostavno izračunati broj dana između dva datuma.

## Sadržaj
- [Što je razlika datuma](#sto-je-razlika-datuma)
- [Kako izračunati razliku](#kako-izracunati-razliku)
- [Primjeri](#primjeri)
- [ČPP](#cpp)

## Što je razlika datuma
Razlika datuma predstavlja broj dana između dva specifična datuma. Može uključivati ili isključivati vikende i blagdane.

## Kako izračunati razliku
1. Odaberite početni datum
2. Odaberite završni datum  
3. Definirajte želite li uključiti vikende
4. Odaberite želite li uključiti blagdane

## Primjeri
### Primjer 1: Osnovni izračun
Od 1. siječnja do 31. siječnja = 30 dana

### Primjer 2: Radni dani
Od 1. siječnja do 31. siječnja (samo radni dani) = 22 dana

## ČPP
Najčešća pitanja o izračunu razlike datuma.

> Povezano: [Kalkulator Datuma](/kalkulator-datuma) • [Kalkulator Vremena](/kalkulator-vremena)`
      }
    ];

    for (const samplePost of samplePosts) {
      const { frontMatter, htmlContent, content, toc } = await parseMarkdown(samplePost.content);
      
      const post: BlogPost = {
        slug: samplePost.slug,
        ...samplePost.frontMatter,
        content: samplePost.content,
        htmlContent,
        excerpt: generateExcerpt(content, samplePost.frontMatter.description),
        readTime: calculateReadTime(content),
        toc
      };

      this.posts.set(samplePost.slug, post);
    }
  }

  /**
   * Build search indexes and category/tag lists
   */
  private buildIndexes(): void {
    const publishedPosts = Array.from(this.posts.values())
      .filter(post => post.status === 'published');

    // Build blog index
    this.index = publishedPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      tags: post.tags,
      category: post.category,
      heroImage: post.heroImage,
      excerpt: post.excerpt,
      readTime: post.readTime
    }));

    // Sort by date
    this.index = sortPostsByDate(this.index);

    // Build search index
    this.searchIndex = publishedPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      tags: post.tags,
      content: post.content
    }));

    // Build categories
    const categoryMap = new Map<string, number>();
    publishedPosts.forEach(post => {
      const count = categoryMap.get(post.category) || 0;
      categoryMap.set(post.category, count + 1);
    });

    this.categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      slug: slugify(name),
      count
    }));

    // Build tags
    const tagMap = new Map<string, number>();
    publishedPosts.forEach(post => {
      post.tags.forEach(tag => {
        const count = tagMap.get(tag) || 0;
        tagMap.set(tag, count + 1);
      });
    });

    this.tags = Array.from(tagMap.entries()).map(([name, count]) => ({
      name,
      slug: slugify(name),
      count
    }));
  }

  /**
   * Get all published posts with pagination
   */
  async getPosts(page = 1, postsPerPage = defaultBlogConfig.postsPerPage): Promise<{
    posts: BlogIndex[];
    pagination: PaginationInfo;
  }> {
    await this.initialize();

    const totalPosts = this.index.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    
    const posts = this.index.slice(startIndex, endIndex);

    const pagination: PaginationInfo = {
      currentPage: page,
      totalPages,
      totalPosts,
      postsPerPage,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };

    return { posts, pagination };
  }

  /**
   * Get a single post by slug
   */
  async getPost(slug: string): Promise<BlogPost | null> {
    await this.initialize();
    return this.posts.get(slug) || null;
  }

  /**
   * Get posts by tag
   */
  async getPostsByTag(tag: string, page = 1): Promise<{
    posts: BlogIndex[];
    pagination: PaginationInfo;
  }> {
    await this.initialize();
    
    const filteredPosts = filterPostsByTag(this.index, tag);
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / defaultBlogConfig.postsPerPage);
    const startIndex = (page - 1) * defaultBlogConfig.postsPerPage;
    const endIndex = startIndex + defaultBlogConfig.postsPerPage;
    
    const posts = filteredPosts.slice(startIndex, endIndex);

    const pagination: PaginationInfo = {
      currentPage: page,
      totalPages,
      totalPosts,
      postsPerPage: defaultBlogConfig.postsPerPage,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };

    return { posts, pagination };
  }

  /**
   * Get posts by category
   */
  async getPostsByCategory(category: string, page = 1): Promise<{
    posts: BlogIndex[];
    pagination: PaginationInfo;
  }> {
    await this.initialize();
    
    const filteredPosts = filterPostsByCategory(this.index, category);
    const totalPosts = filteredPosts.length;
    const totalPages = Math.ceil(totalPosts / defaultBlogConfig.postsPerPage);
    const startIndex = (page - 1) * defaultBlogConfig.postsPerPage;
    const endIndex = startIndex + defaultBlogConfig.postsPerPage;
    
    const posts = filteredPosts.slice(startIndex, endIndex);

    const pagination: PaginationInfo = {
      currentPage: page,
      totalPages,
      totalPosts,
      postsPerPage: defaultBlogConfig.postsPerPage,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    };

    return { posts, pagination };
  }

  /**
   * Get related posts for a given post
   */
  async getRelatedPosts(slug: string, maxResults = 3): Promise<BlogIndex[]> {
    await this.initialize();
    
    const post = this.posts.get(slug);
    if (!post) return [];

    return getRelatedPosts(post, this.index, maxResults);
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<BlogCategory[]> {
    await this.initialize();
    return this.categories;
  }

  /**
   * Get all tags
   */
  async getTags(): Promise<BlogTag[]> {
    await this.initialize();
    return this.tags;
  }

  /**
   * Get search index for client-side search
   */
  async getSearchIndex(): Promise<SearchIndex[]> {
    await this.initialize();
    return this.searchIndex;
  }

  /**
   * Search posts (simple implementation)
   */
  async searchPosts(query: string): Promise<BlogIndex[]> {
    await this.initialize();
    
    const searchTerms = query.toLowerCase().split(' ');
    
    const results = this.index.filter(post => {
      const searchableText = `${post.title} ${post.description} ${post.tags.join(' ')}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    });

    return results;
  }
}

// Export singleton instance
export const blogContentManager = new BlogContentManager();
