import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, Calendar, User, Tag, Share2, BookOpen, Calculator, Scale, Heart, Percent, Ruler, Thermometer } from 'lucide-react';
import { BlogPostType, BlogIndex, RelatedCalculator } from '../types/blog';
import { parseMarkdown } from '../utils/markdownParser';
import TableOfContents from '../components/blog/TableOfContents';
import { Helmet } from 'react-helmet-async';
import { blogAnalytics } from '../utils/analytics';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogIndex[]>([]);
  const [relatedCalculators, setRelatedCalculators] = useState<RelatedCalculator[]>([]);
  const [nextPost, setNextPost] = useState<BlogIndex | null>(null);
  const [prevPost, setPrevPost] = useState<BlogIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);

  // Analytics tracking
  const startTimeRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);
  const hasTrackedViewRef = useRef<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    loadBlogPost();
  }, [slug]);

  // Track reading progress and scroll behavior
  useEffect(() => {
    if (!post) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.min(Math.round((scrollTop / docHeight) * 100), 100);

      // Update reading progress state
      setReadingProgress(scrollPercentage);

      // Track maximum scroll depth
      if (scrollPercentage > maxScrollRef.current) {
        maxScrollRef.current = scrollPercentage;

        // Track reading milestones
        if ([25, 50, 75, 90, 100].includes(scrollPercentage)) {
          const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
          blogAnalytics.trackBlogPostRead(slug!, scrollPercentage, timeSpent);
        }
      }
    };

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      blogAnalytics.trackBlogPostRead(slug, maxScrollRef.current, timeSpent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [post, slug]);

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
      // Force cache refresh

      // Load blog index to find the post
      const indexResponse = await fetch('/blog-index.json');
      if (!indexResponse.ok) {
        throw new Error('Failed to load blog index');
      }

      const allPosts: BlogIndex[] = await indexResponse.json();
      const postIndex = allPosts.find(p => p.slug === slug);

      if (!postIndex) {
        setError('Članak nije pronađen');
        return;
      }

      // Create fallback content first
      const fallbackContent: BlogPostType = {
        ...postIndex,
        htmlContent: `
          <h1>${postIndex.title}</h1>
          <p><strong>Opis:</strong> ${postIndex.description}</p>
          <p>Ovaj članak je dio kategorije <strong>${postIndex.category}</strong> i pokriva teme vezane uz ${postIndex.tags.join(', ')}.</p>
          <p>Sadržaj članka će biti dostupan uskoro s detaljnim objašnjenjima, primjerima i korak-po-korak uputama.</p>
          <h2>Povezani kalkulatori</h2>
          <p>Za brže izračune, koristite naše kalkulatore:</p>
        `,
        toc: [
          { id: 'section-1', title: 'Povezani kalkulatori', level: 2 }
        ],
        faq: [],
        canonical: `https://kalkulacije.com/blog/${slug}`,
        updatedAt: postIndex.date
      };

      // Try to load markdown content, fallback if it fails
      let finalPostData = fallbackContent;

      try {
        const contentResponse = await fetch(`/content/blog/${slug}.md`);
        if (contentResponse.ok) {
          const markdownContent = await contentResponse.text();

          // Parse markdown using our improved parser
          const { htmlContent, toc, frontMatter } = parseMarkdown(markdownContent);

          finalPostData = {
            ...postIndex,
            htmlContent,
            toc,
            faq: frontMatter.faq || [],
            canonical: frontMatter.canonical || `https://kalkulacije.com/blog/${slug}`,
            updatedAt: frontMatter.updatedAt || postIndex.date
          };
        }
      } catch (contentError) {
        console.warn('Could not load markdown content, using fallback');
      }

      setPost(finalPostData);

      // Track blog post view
      if (!hasTrackedViewRef.current) {
        blogAnalytics.trackBlogPostView(slug, postIndex.title, postIndex.category);
        hasTrackedViewRef.current = true;
      }

      // Load related content
      const related = allPosts
        .filter(p => p.slug !== slug && p.category === postIndex.category)
        .slice(0, 3);

      const calculators = getRelatedCalculators(postIndex.category);

      // Find adjacent posts
      const currentIndex = allPosts.findIndex(p => p.slug === slug);
      const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
      const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

      setRelatedPosts(related);
      setRelatedCalculators(calculators);
      setNextPost(nextPost);
      setPrevPost(prevPost);
    } catch (err) {
      setError('Greška pri učitavanju članka');
      console.error('Error loading blog post:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRelatedCalculators = (category: string): RelatedCalculator[] => {
    const calculatorMap: Record<string, RelatedCalculator[]> = {
      'Datumi i dani': [
        {
          title: 'Kalkulator Datuma',
          href: '/kalkulator-datuma',
          description: 'Izračunajte razliku između datuma ili dodajte/oduzmite dane',
          icon: 'Calendar',
          color: 'text-purple-500'
        },
        {
          title: 'Kalkulator Vremena',
          href: '/kalkulator-vremena',
          description: 'Zbrajajte i oduzimajte vrijeme, računajte razlike između vremenskih zona',
          icon: 'Clock',
          color: 'text-indigo-500'
        }
      ],
      'Postotci i PDV': [
        {
          title: 'Kalkulator Postotaka',
          href: '/kalkulator-postotaka',
          description: 'Izračunajte postotke, povećanja, smanjenja i omjere',
          icon: 'Percent',
          color: 'text-orange-500'
        },
        {
          title: 'Kalkulator Plaće',
          href: '/kalkulator-place',
          description: 'Izračunajte neto plaću iz bruto iznosa ili obrnuto, uz sve poreze i doprinose',
          icon: 'Calculator',
          color: 'text-blue-500'
        }
      ],
      'Zdravlje': [
        {
          title: 'BMI Kalkulator',
          href: '/kalkulator-bmi',
          description: 'Izračunajte indeks tjelesne mase i saznajte idealnu težinu',
          icon: 'Heart',
          color: 'text-[#f17273]'
        }
      ]
    };

    return calculatorMap[category] || [
      {
        title: 'Kalkulator Datuma',
        href: '/kalkulator-datuma',
        description: 'Osnovni kalkulatori',
        icon: 'Calendar',
        color: 'text-purple-500'
      }
    ];
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
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Table of Contents */}
      <TableOfContents items={post.toc} postSlug={slug} />

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


          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl xl:max-w-5xl xl:pr-80">
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
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedCalculators.map((calc) => {
                      // Get the icon component based on the icon name
                      const getIconComponent = (iconName: string) => {
                        const iconMap: Record<string, any> = {
                          Calculator,
                          Scale,
                          Heart,
                          Percent,
                          Clock,
                          Ruler,
                          Thermometer,
                          Calendar
                        };
                        return iconMap[iconName] || Calculator;
                      };

                      const IconComponent = getIconComponent(calc.icon || 'Calculator');

                      return (
                        <Link
                          key={calc.href}
                          to={calc.href}
                          onClick={() => blogAnalytics.trackRelatedCalculatorClick(slug!, calc.href, calc.title)}
                          className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block bg-white p-6 h-full hover:bg-gray-50"
                        >
                          <IconComponent className={`w-10 h-10 ${calc.color || 'text-blue-500'} mb-4`} />
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">
                            {calc.title}
                          </h4>
                          {calc.description && (
                            <p className="text-sm text-gray-600">{calc.description}</p>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Povezani Članci</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost, index) => (
                      <a
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        onClick={() => blogAnalytics.trackRelatedPostClick(slug, relatedPost.slug, index)}
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
