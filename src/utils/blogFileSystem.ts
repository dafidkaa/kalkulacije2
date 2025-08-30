import { BlogPost, BlogIndex, SearchIndex, RelatedCalculator } from '../types/blog';
import { parseMarkdown, calculateReadTime, generateExcerpt, validateFrontMatter } from './blogUtils';

/**
 * Blog File System Manager
 * Handles reading blog posts from the file system and processing them
 * This is a client-side implementation that would be replaced with server-side file reading in production
 */
export class BlogFileSystem {
  private static instance: BlogFileSystem;
  private posts: Map<string, BlogPost> = new Map();
  private relatedCalculators: Map<string, RelatedCalculator[]> = new Map();
  private isInitialized = false;

  static getInstance(): BlogFileSystem {
    if (!BlogFileSystem.instance) {
      BlogFileSystem.instance = new BlogFileSystem();
    }
    return BlogFileSystem.instance;
  }

  /**
   * Initialize the file system by loading all blog posts
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Load related calculators mapping
      await this.loadRelatedCalculators();
      
      // Load all blog posts
      await this.loadAllPosts();
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize blog file system:', error);
      throw error;
    }
  }

  /**
   * Load related calculators mapping from JSON file
   */
  private async loadRelatedCalculators(): Promise<void> {
    try {
      const response = await fetch('/content/related-calculators.json');
      if (!response.ok) {
        console.warn('Related calculators mapping not found, using empty mapping');
        return;
      }
      
      const mapping = await response.json();
      
      // Convert the mapping to our internal format
      Object.entries(mapping).forEach(([category, calculators]) => {
        this.relatedCalculators.set(category, calculators as RelatedCalculator[]);
      });
    } catch (error) {
      console.warn('Failed to load related calculators mapping:', error);
    }
  }

  /**
   * Load all blog posts from the content directory
   * In a real implementation, this would read from the file system
   * For now, we'll simulate with the sample content
   */
  private async loadAllPosts(): Promise<void> {
    // In a real implementation, this would:
    // 1. Read all .md files from /content/blog/
    // 2. Parse each file with gray-matter
    // 3. Process the markdown content
    // 4. Validate the front-matter
    // 5. Store the processed posts

    // For now, we'll load our sample post
    await this.loadSamplePost();
  }

  /**
   * Load the sample blog post for demonstration
   */
  private async loadSamplePost(): Promise<void> {
    try {
      const response = await fetch('/content/blog/kako-izracunati-razliku-izmedu-datuma.md');
      if (!response.ok) {
        console.warn('Sample blog post not found');
        return;
      }

      const markdownContent = await response.text();
      const slug = 'kako-izracunati-razliku-izmedu-datuma';
      
      const post = await this.processMarkdownFile(slug, markdownContent);
      if (post) {
        this.posts.set(slug, post);
      }
    } catch (error) {
      console.warn('Failed to load sample blog post:', error);
    }
  }

  /**
   * Process a markdown file into a BlogPost object
   */
  private async processMarkdownFile(slug: string, markdownContent: string): Promise<BlogPost | null> {
    try {
      const { frontMatter, htmlContent, content, toc } = await parseMarkdown(markdownContent);
      
      // Validate front-matter
      const errors = validateFrontMatter(frontMatter);
      if (errors.length > 0) {
        console.error(`Invalid front-matter for ${slug}:`, errors);
        return null;
      }

      // Skip draft posts in production
      if (frontMatter.status === 'draft' && process.env.NODE_ENV === 'production') {
        return null;
      }

      // Create the blog post object
      const post: BlogPost = {
        slug,
        title: frontMatter.title,
        description: frontMatter.description,
        date: frontMatter.date,
        updatedAt: frontMatter.updatedAt,
        status: frontMatter.status,
        tags: frontMatter.tags || [],
        category: frontMatter.category,
        heroImage: frontMatter.heroImage,
        canonical: frontMatter.canonical,
        faq: frontMatter.faq,
        content,
        htmlContent,
        excerpt: generateExcerpt(content, frontMatter.description),
        readTime: calculateReadTime(content),
        toc
      };

      return post;
    } catch (error) {
      console.error(`Failed to process markdown file ${slug}:`, error);
      return null;
    }
  }

  /**
   * Get all published posts
   */
  async getAllPosts(): Promise<BlogPost[]> {
    await this.initialize();
    
    return Array.from(this.posts.values())
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  /**
   * Get a single post by slug
   */
  async getPost(slug: string): Promise<BlogPost | null> {
    await this.initialize();
    return this.posts.get(slug) || null;
  }

  /**
   * Get posts for blog index
   */
  async getBlogIndex(): Promise<BlogIndex[]> {
    const posts = await this.getAllPosts();
    
    return posts.map(post => ({
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
  }

  /**
   * Get search index for client-side search
   */
  async getSearchIndex(): Promise<SearchIndex[]> {
    const posts = await this.getAllPosts();
    
    return posts.map(post => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      tags: post.tags,
      content: post.content
    }));
  }

  /**
   * Get related calculators for a category
   */
  getRelatedCalculators(category: string): RelatedCalculator[] {
    return this.relatedCalculators.get(category) || this.relatedCalculators.get('Općenito') || [];
  }

  /**
   * Get all categories with post counts
   */
  async getCategories(): Promise<Array<{ name: string; slug: string; count: number }>> {
    const posts = await this.getAllPosts();
    const categoryMap = new Map<string, number>();
    
    posts.forEach(post => {
      const count = categoryMap.get(post.category) || 0;
      categoryMap.set(post.category, count + 1);
    });

    return Array.from(categoryMap.entries()).map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count
    }));
  }

  /**
   * Get all tags with post counts
   */
  async getTags(): Promise<Array<{ name: string; slug: string; count: number }>> {
    const posts = await this.getAllPosts();
    const tagMap = new Map<string, number>();
    
    posts.forEach(post => {
      post.tags.forEach(tag => {
        const count = tagMap.get(tag) || 0;
        tagMap.set(tag, count + 1);
      });
    });

    return Array.from(tagMap.entries()).map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count
    }));
  }

  /**
   * Get posts by tag
   */
  async getPostsByTag(tag: string): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter(post => 
      post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  /**
   * Get posts by category
   */
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    return posts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Search posts by query
   */
  async searchPosts(query: string): Promise<BlogPost[]> {
    const posts = await this.getAllPosts();
    const searchTerms = query.toLowerCase().split(' ');
    
    return posts.filter(post => {
      const searchableText = `${post.title} ${post.description} ${post.tags.join(' ')} ${post.content}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    });
  }

  /**
   * Get related posts based on tags and category
   */
  async getRelatedPosts(currentSlug: string, maxResults = 3): Promise<BlogIndex[]> {
    const currentPost = await this.getPost(currentSlug);
    if (!currentPost) return [];

    const allPosts = await this.getBlogIndex();
    const otherPosts = allPosts.filter(post => post.slug !== currentSlug);

    // Score posts based on shared tags
    const scoredPosts = otherPosts.map(post => {
      let score = 0;
      
      // Points for shared tags
      const sharedTags = post.tags.filter(tag => 
        currentPost.tags.some(currentTag => 
          currentTag.toLowerCase() === tag.toLowerCase()
        )
      );
      score += sharedTags.length * 3;
      
      // Points for same category
      if (post.category.toLowerCase() === currentPost.category.toLowerCase()) {
        score += 2;
      }
      
      return { post, score };
    });

    // Sort by score and return top results
    return scoredPosts
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map(item => item.post);
  }

  /**
   * Get next and previous posts by date
   */
  async getAdjacentPosts(currentSlug: string): Promise<{
    nextPost?: BlogIndex;
    prevPost?: BlogIndex;
  }> {
    const posts = await this.getBlogIndex();
    const currentIndex = posts.findIndex(post => post.slug === currentSlug);
    
    if (currentIndex === -1) return {};

    return {
      nextPost: currentIndex > 0 ? posts[currentIndex - 1] : undefined,
      prevPost: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined
    };
  }
}

// Export singleton instance
export const blogFileSystem = BlogFileSystem.getInstance();
