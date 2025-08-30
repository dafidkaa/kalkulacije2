import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Calendar, Clock, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogIndex as BlogIndexType, BlogCategory, BlogTag, PaginationInfo } from '../types/blog';
import { blogFileSystem } from '../utils/blogFileSystem';

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

interface BlogIndexProps {
  page?: number;
  tag?: string;
  category?: string;
}

const BlogIndex: React.FC<BlogIndexProps> = ({ page = 1, tag, category }) => {
  const [posts, setPosts] = useState<BlogIndexType[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const postsPerPage = 12;

  useEffect(() => {
    loadBlogData();
  }, [page, tag, category]);

  const loadBlogData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load posts based on filters
      let allPosts: BlogIndexType[];
      
      if (tag) {
        const tagPosts = await blogFileSystem.getPostsByTag(tag);
        allPosts = tagPosts.map(post => ({
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
      } else if (category) {
        const categoryPosts = await blogFileSystem.getPostsByCategory(category);
        allPosts = categoryPosts.map(post => ({
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
      } else {
        allPosts = await blogFileSystem.getBlogIndex();
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

      // Load categories and tags
      const [categoriesData, tagsData] = await Promise.all([
        blogFileSystem.getCategories(),
        blogFileSystem.getTags()
      ]);

      setCategories(categoriesData);
      setTags(tagsData);
    } catch (err) {
      setError('Failed to load blog posts');
      console.error('Error loading blog data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      loadBlogData();
      return;
    }

    try {
      setLoading(true);
      const searchResults = await blogFileSystem.searchPosts(query);
      const searchIndex = searchResults.map(post => ({
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
      
      setPosts(searchIndex);
      setPagination(null); // Disable pagination for search results
    } catch (err) {
      setError('Search failed');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPageTitle = () => {
    if (tag) return `Blog - Tag: ${tag}`;
    if (category) return `Blog - Kategorija: ${category}`;
    if (page > 1) return `Blog - Stranica ${page}`;
    return 'Blog';
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
        <title>{getPageTitle()} | Kalkulacije</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content="blog, vodiči, kalkulatori, savjeti, objašnjenja, izračuni" />
        <link rel="canonical" href={`https://kalkulacije.com/blog${page > 1 ? `/page/${page}` : ''}`} />
        <link rel="alternate" type="application/rss+xml" title="Kalkulacije Blog" href="/blog/rss.xml" />
        
        {/* Pagination meta tags */}
        {pagination?.hasPrevPage && (
          <link rel="prev" href={`/blog${pagination.currentPage - 1 > 1 ? `/page/${pagination.currentPage - 1}` : ''}`} />
        )}
        {pagination?.hasNextPage && (
          <link rel="next" href={`/blog/page/${pagination.currentPage + 1}`} />
        )}
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">
              {tag ? `Tag: ${tag}` : category ? `Kategorija: ${category}` : 'Blog'}
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
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Pretraži članke..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => handleSearch(searchQuery)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 text-sm"
                  >
                    Pretraži
                  </button>
                </div>
              </div>

              {/* Posts Grid */}
              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Nema pronađenih članaka.</p>
                  {(tag || category || searchQuery) && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        window.location.href = '/blog';
                      }}
                      className="mt-4 text-blue-600 hover:text-blue-700"
                    >
                      Prikaži sve članke
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {posts.map((post) => (
                    <article key={post.slug} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      {post.heroImage && (
                        <div className="aspect-video bg-gray-200 rounded-t-xl overflow-hidden">
                          <img
                            src={post.heroImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
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
                          <a href={`/blog/${post.slug}`} className="hover:text-blue-600">
                            {post.title}
                          </a>
                        </h2>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <a
                                key={tag}
                                href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                                className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200"
                              >
                                <Tag className="w-3 h-3" />
                                {tag}
                              </a>
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
                        <a
                          key={cat.slug}
                          href={`/blog/category/${cat.slug}`}
                          className="flex items-center justify-between text-gray-600 hover:text-blue-600 py-1"
                        >
                          <span>{cat.name}</span>
                          <span className="text-sm bg-gray-100 px-2 py-0.5 rounded-full">{cat.count}</span>
                        </a>
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
                        <a
                          key={tag.slug}
                          href={`/blog/tag/${tag.slug}`}
                          className="inline-flex items-center gap-1 text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-blue-100 hover:text-blue-700"
                        >
                          <Tag className="w-3 h-3" />
                          {tag.name}
                          <span className="text-xs">({tag.count})</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* RSS Feed */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pretplati se</h3>
                  <a
                    href="/blog/rss.xml"
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.429 2.571c8.571 0 15.429 6.857 15.429 15.429h-3.429c0-6.857-5.714-12.571-12.571-12.571v-2.857zM3.429 7.429c5.714 0 10.286 4.571 10.286 10.286h-3.429c0-3.714-3.143-6.857-6.857-6.857v-3.429zM6.857 14.857c0 1.571-1.286 2.857-2.857 2.857s-2.857-1.286-2.857-2.857 1.286-2.857 2.857-2.857 2.857 1.286 2.857 2.857z"/>
                    </svg>
                    RSS Feed
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogIndex;
