import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, Tag } from 'lucide-react';
import { BlogIndex, SearchIndex } from '../../types/blog';

interface BlogSearchProps {
  onSearch: (results: BlogIndex[]) => void;
  onClear: () => void;
  className?: string;
}

interface SearchResult extends BlogIndex {
  score: number;
  matchedFields: string[];
}

const BlogSearch: React.FC<BlogSearchProps> = ({ onSearch, onClear, className = '' }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchIndex, setSearchIndex] = useState<SearchIndex[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load search index
    loadSearchIndex();
    
    // Load recent searches from localStorage
    const saved = localStorage.getItem('blog-recent-searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to load recent searches');
      }
    }
  }, []);

  useEffect(() => {
    // Close search dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadSearchIndex = async () => {
    try {
      const response = await fetch('/blog/search-index.json');
      if (response.ok) {
        const index = await response.json();
        setSearchIndex(index);
      }
    } catch (error) {
      console.warn('Failed to load search index:', error);
    }
  };

  const performSearch = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim() || searchIndex.length === 0) {
      return [];
    }

    const terms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 1);
    const results: SearchResult[] = [];

    searchIndex.forEach(item => {
      let score = 0;
      const matchedFields: string[] = [];

      // Search in title (highest weight)
      const titleMatches = terms.filter(term => 
        item.title.toLowerCase().includes(term)
      );
      if (titleMatches.length > 0) {
        score += titleMatches.length * 10;
        matchedFields.push('title');
      }

      // Search in description (medium weight)
      const descMatches = terms.filter(term => 
        item.description.toLowerCase().includes(term)
      );
      if (descMatches.length > 0) {
        score += descMatches.length * 5;
        matchedFields.push('description');
      }

      // Search in tags (medium weight)
      const tagMatches = terms.filter(term => 
        item.tags.some(tag => tag.toLowerCase().includes(term))
      );
      if (tagMatches.length > 0) {
        score += tagMatches.length * 5;
        matchedFields.push('tags');
      }

      // Search in content (low weight)
      const contentMatches = terms.filter(term => 
        item.content.toLowerCase().includes(term)
      );
      if (contentMatches.length > 0) {
        score += contentMatches.length * 2;
        matchedFields.push('content');
      }

      if (score > 0) {
        results.push({
          ...item,
          score,
          matchedFields,
          excerpt: item.description, // Use description as excerpt for search results
          readTime: Math.ceil(item.content.split(' ').length / 200) // Estimate read time
        });
      }
    });

    // Sort by score (highest first)
    return results.sort((a, b) => b.score - a.score);
  };

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      onClear();
      return;
    }

    setIsLoading(true);
    
    // Simulate slight delay for better UX
    setTimeout(() => {
      const results = performSearch(searchQuery);
      onSearch(results);
      setIsLoading(false);
      
      // Save to recent searches
      saveRecentSearch(searchQuery);
    }, 100);
  };

  const saveRecentSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (trimmed.length < 2) return;

    const updated = [trimmed, ...recentSearches.filter(s => s !== trimmed)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('blog-recent-searches', JSON.stringify(updated));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0 || recentSearches.length > 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    onClear();
    inputRef.current?.focus();
  };

  const handleRecentSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    handleSearch(searchQuery);
    setIsOpen(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('blog-recent-searches');
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Pretraži članke..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(query.length > 0 || recentSearches.length > 0)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 text-sm transition-colors disabled:opacity-50"
          >
            {isLoading ? '...' : 'Pretraži'}
          </button>
        </div>
      </form>

      {/* Search Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {query.length > 0 ? (
            <div className="p-3">
              <div className="text-sm text-gray-500 mb-2">
                Pritisnite Enter za pretraživanje: "{query}"
              </div>
            </div>
          ) : recentSearches.length > 0 ? (
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Nedavne pretrage
                </h4>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Obriši
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearch(search)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3 text-sm text-gray-500 text-center">
              Počnite tipkati za pretraživanje...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogSearch;
