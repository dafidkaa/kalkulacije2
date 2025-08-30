import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { BlogPost as BlogPostType, BlogIndex, RelatedCalculator } from '../types/blog';
import { blogFileSystem } from '../utils/blogFileSystem';
import ReadingProgressBar from '../components/blog/ReadingProgressBar';
import TableOfContents from '../components/blog/TableOfContents';

interface BlogPostProps {
  slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ slug }) => {
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogIndex[]>([]);
  const [relatedCalculators, setRelatedCalculators] = useState<RelatedCalculator[]>([]);
  const [nextPost, setNextPost] = useState<BlogIndex | null>(null);
  const [prevPost, setPrevPost] = useState<BlogIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    loadBlogPost();
  }, [slug]);

  useEffect(() => {
    // Handle scroll for table of contents highlighting
    const handleScroll = () => {
      if (!post?.toc.length) return;

      const sections = post.toc.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(post.toc[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  const loadBlogPost = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load the main post
      const postData = await blogFileSystem.getPost(slug);
      if (!postData) {
        setError('Članak nije pronađen');
        return;
      }

      setPost(postData);

      // Load related content
      const [related, calculators, adjacent] = await Promise.all([
        blogFileSystem.getRelatedPosts(slug, 3),
        Promise.resolve(blogFileSystem.getRelatedCalculators(postData.category)),
        blogFileSystem.getAdjacentPosts(slug)
      ]);

      setRelatedPosts(related);
      setRelatedCalculators(calculators);
      setNextPost(adjacent.nextPost || null);
      setPrevPost(adjacent.prevPost || null);
    } catch (err) {
      setError('Greška pri učitavanju članka');
      console.error('Error loading blog post:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateArticleSchema = () => {
    if (!post) return null;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.description,
      "image": post.heroImage ? `https://kalkulacije.com${post.heroImage}` : undefined,
      "datePublished": post.date,
      "dateModified": post.updatedAt || post.date,
      "author": {
        "@type": "Organization",
        "name": "Kalkulacije Tim"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Kalkulacije",
        "logo": {
          "@type": "ImageObject",
          "url": "https://kalkulacije.com/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": post.canonical || `https://kalkulacije.com/blog/${post.slug}`
      }
    };

    return JSON.stringify(schema);
  };

  const generateFAQSchema = () => {
    if (!post?.faq?.length) return null;

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.faq.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };

    return JSON.stringify(schema);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Učitavanje članka...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Članak nije pronađen</h1>
          <p className="text-gray-600 mb-6">{error || 'Traženi članak ne postoji.'}</p>
          <a
            href="/blog"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Povratak na blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar target="article" />

      {/* Floating Table of Contents */}
      <TableOfContents items={post.toc} />

      <Helmet>
        <title>{post.title} | Kalkulacije</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <link rel="canonical" href={post.canonical || `https://kalkulacije.com/blog/${post.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://kalkulacije.com/blog/${post.slug}`} />
        {post.heroImage && <meta property="og:image" content={`https://kalkulacije.com${post.heroImage}`} />}
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        {post.heroImage && <meta name="twitter:image" content={`https://kalkulacije.com${post.heroImage}`} />}
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {generateArticleSchema()}
        </script>
        
        {/* FAQ Schema */}
        {post.faq && (
          <script type="application/ld+json">
            {generateFAQSchema()}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-16 max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li><a href="/" className="hover:text-blue-600">Početna</a></li>
                <li>/</li>
                <li><a href="/blog" className="hover:text-blue-600">Blog</a></li>
                <li>/</li>
                <li className="text-gray-900">{post.title}</li>
              </ol>
            </nav>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('hr-HR')}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min čitanja
                </div>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6">
                {post.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-1 text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-blue-100 hover:text-blue-700"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </a>
                ))}
              </div>
            </header>

            {/* Hero Image */}
            {post.heroImage && (
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden mb-8">
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Article Content */}
          <div className="w-full">
              <article className="bg-white rounded-xl shadow-sm p-8">
                <div
                  className="blog-content max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                />
              </article>

              {/* Related Calculators */}
              {relatedCalculators.length > 0 && (
                <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Povezani Kalkulatori</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {relatedCalculators.map((calc) => (
                      <a
                        key={calc.href}
                        href={calc.href}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{calc.title}</h4>
                          {calc.description && (
                            <p className="text-sm text-gray-600">{calc.description}</p>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Povezani Članci</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <a
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="group"
                      >
                        <div className="bg-gray-50 rounded-lg p-4 group-hover:bg-blue-50 transition-colors">
                          <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {new Date(relatedPost.date).toLocaleDateString('hr-HR')}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              {(prevPost || nextPost) && (
                <div className="mt-8 flex justify-between items-center">
                  {prevPost ? (
                    <a
                      href={`/blog/${prevPost.slug}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <div className="text-left">
                        <div className="text-sm text-gray-500">Prethodni članak</div>
                        <div className="font-medium">{prevPost.title}</div>
                      </div>
                    </a>
                  ) : (
                    <div></div>
                  )}
                  
                  {nextPost && (
                    <a
                      href={`/blog/${nextPost.slug}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-right"
                    >
                      <div>
                        <div className="text-sm text-gray-500">Sljedeći članak</div>
                        <div className="font-medium">{nextPost.title}</div>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default BlogPost;
