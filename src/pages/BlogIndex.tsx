import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Search, Calendar, Clock, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogIndex as BlogIndexType, BlogCategory, BlogTag, PaginationInfo } from '../types/blog';
import { blogFileSystem } from '../utils/blogFileSystem';
import { blogAnalytics } from '../utils/analytics';

import BlogSearch from '../components/blog/BlogSearch';


// Add line-clamp utility classes
const lineClampStyles = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const BlogIndex: React.FC = () => {
  const { page: pageParam, tag, category } = useParams<{ page?: string; tag?: string; category?: string }>();
  const navigate = useNavigate();
  const page = pageParam ? parseInt(pageParam) : 1;
  const [posts, setPosts] = useState<BlogIndexType[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const postsPerPage = 12;

  useEffect(() => {
    loadBlogData();
  }, [page, tag, category]);

  const loadBlogData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load posts from static JSON file
      const response = await fetch('/blog-index.json');
      if (!response.ok) {
        throw new Error('Failed to load blog posts');
      }

      let allPosts: BlogIndexType[] = await response.json();

      // Apply filters
      if (tag) {
        allPosts = allPosts.filter(post =>
          post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
        );
        // Track tag filter usage
        blogAnalytics.trackTagFilter(tag, allPosts.length);
      } else if (category) {
        allPosts = allPosts.filter(post =>
          post.category.toLowerCase() === category.toLowerCase()
        );
        // Track category filter usage
        blogAnalytics.trackCategoryFilter(category, allPosts.length);
      }

      // Implement pagination
      const totalPosts = allPosts.length;
      const totalPages = Math.ceil(totalPosts / postsPerPage);
      const startIndex = (page - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const paginatedPosts = allPosts.slice(startIndex, endIndex);

      setPosts(paginatedPosts);
      setPagination({
        currentPage: page,
        totalPages,
        totalPosts,
        postsPerPage,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      });

      // Generate categories and tags from posts
      const categoriesMap = new Map<string, number>();
      const tagsMap = new Map<string, number>();

      allPosts.forEach(post => {
        // Count categories
        const count = categoriesMap.get(post.category) || 0;
        categoriesMap.set(post.category, count + 1);

        // Count tags
        post.tags.forEach(tag => {
          const tagCount = tagsMap.get(tag) || 0;
          tagsMap.set(tag, tagCount + 1);
        });
      });

      const categoriesData = Array.from(categoriesMap.entries()).map(([name, count]) => ({
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        count
      }));

      const tagsData = Array.from(tagsMap.entries()).map(([name, count]) => ({
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        count
      })).sort((a, b) => b.count - a.count);

      setCategories(categoriesData);
      setTags(tagsData);
    } catch (err) {
      setError('Failed to load blog posts');
      console.error('Error loading blog data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchResults: BlogIndexType[], searchQuery?: string) => {
    setPosts(searchResults);
    setPagination(null); // Disable pagination for search results
    setIsSearchActive(true);

    // Track search analytics
    if (searchQuery) {
      blogAnalytics.trackBlogSearch(searchQuery, searchResults.length);
    }
  };

  const handleClearSearch = () => {
    setIsSearchActive(false);
    loadBlogData(); // Reload original data
  };

  const getPageTitle = () => {
    if (tag) return `Kalkulacije Blog - Tag: ${tag}`;
    if (category) return `Kalkulacije Blog - Kategorija: ${category}`;
    if (page > 1) return `Kalkulacije Blog - Stranica ${page}`;
    return 'Kalkulacije Blog';
  };

  const getPageDescription = () => {
    if (tag) return `Članci označeni s "${tag}" - praktični savjeti i vodiči za kalkulatore.`;
    if (category) return `Članci iz kategorije "${category}" - korisni savjeti i objašnjenja.`;
    return 'Praktični vodiči, savjeti i objašnjenja za sve naše kalkulatore. Naučite kako efikasno koristiti alate za svakodnevne izračune.';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Učitavanje članaka...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadBlogData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Pokušaj ponovno
          </button>
        </div>
      </div>
    );
  }

  return (
    <>

      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content="kalkulacije blog, vodiči za kalkulatore, savjeti za izračune, objašnjenja kalkulatora, kako koristiti kalkulatore, BMI kalkulator, kalkulator plaće, kalkulator postotaka, kalkulator datuma, pretvarač jedinica" />
        <link rel="canonical" href={`https://kalkulacije.com/blog${page > 1 ? `/page/${page}` : ''}`} />
        <link rel="alternate" type="application/rss+xml" title="Kalkulacije Blog" href="/blog/rss.xml" />

        {/* Open Graph */}
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getPageDescription()} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://kalkulacije.com/blog${page > 1 ? `/page/${page}` : ''}`} />
        <meta property="og:site_name" content="Kalkulacije.com" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getPageDescription()} />
        
        {/* Pagination meta tags */}
        {pagination?.hasPrevPage && (
          <link rel="prev" href={`/blog${pagination.currentPage - 1 > 1 ? `/page/${pagination.currentPage - 1}` : ''}`} />
        )}
        {pagination?.hasNextPage && (
          <link rel="next" href={`/blog/page/${pagination.currentPage + 1}`} />
        )}

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Kalkulacije Blog",
            "description": getPageDescription(),
            "url": `https://kalkulacije.com/blog${page > 1 ? `/page/${page}` : ''}`,
            "publisher": {
              "@type": "Organization",
              "name": "Kalkulacije.com",
              "url": "https://kalkulacije.com"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://kalkulacije.com/blog${page > 1 ? `/page/${page}` : ''}`
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">
              {tag ? `Tag: ${tag}` : category ? `Kategorija: ${category}` : 'Kalkulacije Blog'}
            </h1>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
              {getPageDescription()}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Enhanced Search Bar */}
              <div className="mb-8">
                <BlogSearch
                  onSearch={handleSearch}
                  onClear={handleClearSearch}
                />
              </div>

              {/* Posts Grid */}
              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    {isSearchActive ? 'Nema rezultata pretrage.' : 'Nema pronađenih članaka.'}
                  </p>
                  {(tag || category || isSearchActive) && (
                    <button
                      onClick={() => {
                        if (isSearchActive) {
                          handleClearSearch();
                        } else {
                          navigate('/blog');
                        }
                      }}
                      className="mt-4 text-blue-600 hover:text-blue-700"
                    >
                      Prikaži sve članke
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {posts.map((post, index) => (
                    <article key={post.slug} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">

                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString('hr-HR')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime} min čitanja
                          </div>
                        </div>
                        
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                          <a
                            href={`/blog/${post.slug}`}
                            onClick={() => {
                              if (isSearchActive) {
                                // Track search result click
                                blogAnalytics.trackBlogSearchClick('', post.slug, index);
                              }
                            }}
                            className="hover:text-blue-600"
                          >
                            {post.title}
                          </a>
                        </h2>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Link
                                key={tag}
                                to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                                className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200"
                              >
                                <Tag className="w-3 h-3" />
                                {tag}
                              </Link>
                            ))}
                          </div>
                          
                          <a
                            href={`/blog/${post.slug}`}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            Čitaj više →
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  {pagination.hasPrevPage && (
                    <a
                      href={`/blog${pagination.currentPage - 1 > 1 ? `/page/${pagination.currentPage - 1}` : ''}`}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Prethodna
                    </a>
                  )}
                  
                  <span className="px-4 py-2 text-gray-600">
                    Stranica {pagination.currentPage} od {pagination.totalPages}
                  </span>
                  
                  {pagination.hasNextPage && (
                    <a
                      href={`/blog/page/${pagination.currentPage + 1}`}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Sljedeća
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Categories */}
                {categories.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategorije</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          to={`/blog/category/${cat.slug}`}
                          className="flex items-center justify-between text-gray-600 hover:text-blue-600 py-1"
                        >
                          <span>{cat.name}</span>
                          <span className="text-sm bg-gray-100 px-2 py-0.5 rounded-full">{cat.count}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Tags */}
                {tags.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Popularne oznake</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.slice(0, 10).map((tag) => (
                        <Link
                          key={tag.slug}
                          to={`/blog/tag/${tag.slug}`}
                          className="inline-flex items-center gap-1 text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-blue-100 hover:text-blue-700"
                        >
                          <Tag className="w-3 h-3" />
                          {tag.name}
                          <span className="text-xs">({tag.count})</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogIndex;
