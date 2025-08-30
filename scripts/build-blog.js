#!/usr/bin/env node

/**
 * Blog Build Script
 * Generates static blog indexes and feeds for production
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.dirname(__dirname);
const CONTENT_DIR = path.join(projectRoot, 'content/blog');
const PUBLIC_DIR = path.join(projectRoot, 'public');
const PUBLIC_CONTENT_DIR = path.join(PUBLIC_DIR, 'content/blog');
const BLOG_INDEX_FILE = path.join(PUBLIC_DIR, 'blog-index.json');
const SEARCH_INDEX_FILE = path.join(PUBLIC_DIR, 'blog', 'search-index.json');
const RSS_FILE = path.join(PUBLIC_DIR, 'blog', 'rss.xml');
const SITEMAP_FILE = path.join(PUBLIC_DIR, 'sitemap-blog.xml');

const SITE_URL = 'https://kalkulacije.com';
const BLOG_URL = `${SITE_URL}/blog`;

/**
 * Calculate reading time (approximately 200 words per minute)
 */
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readTime);
}

/**
 * Generate excerpt from content or description
 */
function generateExcerpt(content, description, maxLength = 160) {
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
 * Read and parse all blog posts
 */
async function loadBlogPosts() {
  try {
    // Check if content directory exists
    try {
      await fs.access(CONTENT_DIR);
    } catch {
      console.log('Blog content directory not found, creating empty indexes...');
      return [];
    }

    const files = await fs.readdir(CONTENT_DIR);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    const posts = [];
    
    for (const file of markdownFiles) {
      try {
        const filePath = path.join(CONTENT_DIR, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data: frontMatter, content } = matter(fileContent);
        
        // Validate required fields
        if (!frontMatter.title || !frontMatter.description || !frontMatter.date || !frontMatter.status) {
          console.warn(`Skipping ${file}: Missing required front-matter fields`);
          continue;
        }
        
        // Skip draft posts in production
        if (frontMatter.status === 'draft' && process.env.NODE_ENV === 'production') {
          console.log(`Skipping draft post: ${file}`);
          continue;
        }
        
        const slug = path.basename(file, '.md');
        const excerpt = generateExcerpt(content, frontMatter.description);
        const readTime = calculateReadTime(content);
        
        posts.push({
          slug,
          title: frontMatter.title,
          description: frontMatter.description,
          date: frontMatter.date,
          updatedAt: frontMatter.updatedAt,
          status: frontMatter.status,
          tags: frontMatter.tags || [],
          category: frontMatter.category || 'Općenito',
          heroImage: frontMatter.heroImage,
          canonical: frontMatter.canonical,
          faq: frontMatter.faq,
          excerpt,
          readTime,
          content
        });
        
        console.log(`Processed: ${file}`);
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return posts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

/**
 * Generate blog index JSON
 */
async function generateBlogIndex(posts) {
  const index = posts
    .filter(post => post.status === 'published')
    .map(post => ({
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
  
  await fs.writeFile(BLOG_INDEX_FILE, JSON.stringify(index, null, 2));
  console.log(`Generated blog index: ${BLOG_INDEX_FILE}`);
}

/**
 * Generate search index JSON
 */
async function generateSearchIndex(posts) {
  // Ensure blog directory exists
  const blogDir = path.dirname(SEARCH_INDEX_FILE);
  await fs.mkdir(blogDir, { recursive: true });
  
  const searchIndex = posts
    .filter(post => post.status === 'published')
    .map(post => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      tags: post.tags,
      content: post.content.substring(0, 1000) // Limit content for search index size
    }));
  
  await fs.writeFile(SEARCH_INDEX_FILE, JSON.stringify(searchIndex, null, 2));
  console.log(`Generated search index: ${SEARCH_INDEX_FILE}`);
}

/**
 * Generate RSS feed
 */
async function generateRSSFeed(posts) {
  const publishedPosts = posts
    .filter(post => post.status === 'published')
    .slice(0, 20); // Latest 20 posts
  
  const rssItems = publishedPosts.map(post => {
    const postUrl = `${BLOG_URL}/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();
    
    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <category><![CDATA[${post.category}]]></category>
    </item>`;
  }).join('\n');
  
  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kalkulacije Blog</title>
    <link>${BLOG_URL}</link>
    <description>Vodič za kalkulatore, izračune i praktične savjete</description>
    <language>hr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`;
  
  // Ensure blog directory exists
  const blogDir = path.dirname(RSS_FILE);
  await fs.mkdir(blogDir, { recursive: true });
  
  await fs.writeFile(RSS_FILE, rssContent);
  console.log(`Generated RSS feed: ${RSS_FILE}`);
}

/**
 * Generate blog sitemap
 */
async function generateBlogSitemap(posts) {
  const publishedPosts = posts.filter(post => post.status === 'published');
  
  const urlEntries = publishedPosts.map(post => {
    const postUrl = `${BLOG_URL}/${post.slug}`;
    const lastmod = post.updatedAt || post.date;
    
    return `  <url>
    <loc>${postUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('\n');
  
  // Add blog index page
  const blogIndexEntry = `  <url>
    <loc>${BLOG_URL}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogIndexEntry}
${urlEntries}
</urlset>`;
  
  await fs.writeFile(SITEMAP_FILE, sitemapContent);
  console.log(`Generated blog sitemap: ${SITEMAP_FILE}`);
}

/**
 * Copy markdown files to public directory
 */
async function copyMarkdownFiles() {
  try {
    // Ensure public content directory exists
    await fs.mkdir(PUBLIC_CONTENT_DIR, { recursive: true });

    // Get all markdown files
    const files = await fs.readdir(CONTENT_DIR);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    // Copy each markdown file
    for (const file of markdownFiles) {
      const sourcePath = path.join(CONTENT_DIR, file);
      const destPath = path.join(PUBLIC_CONTENT_DIR, file);
      await fs.copyFile(sourcePath, destPath);
    }

    console.log(`Copied ${markdownFiles.length} markdown files to public directory`);
  } catch (error) {
    console.error('Failed to copy markdown files:', error);
    throw error;
  }
}

/**
 * Main build function
 */
async function buildBlog() {
  console.log('Building blog indexes and feeds...');

  try {
    // Ensure public directory exists
    await fs.mkdir(PUBLIC_DIR, { recursive: true });

    // Copy markdown files to public directory
    await copyMarkdownFiles();

    // Load all blog posts
    const posts = await loadBlogPosts();
    console.log(`Loaded ${posts.length} blog posts`);

    // Generate all indexes and feeds
    await Promise.all([
      generateBlogIndex(posts),
      generateSearchIndex(posts),
      generateRSSFeed(posts),
      generateBlogSitemap(posts)
    ]);

    console.log('Blog build completed successfully!');
  } catch (error) {
    console.error('Blog build failed:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the build if this script is executed directly
const scriptPath = fileURLToPath(import.meta.url);
if (process.argv[1] === scriptPath) {
  buildBlog();
}

export { buildBlog };
