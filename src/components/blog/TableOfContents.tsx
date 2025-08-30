import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';
import { blogAnalytics } from '../../utils/analytics';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
  postSlug?: string; // For analytics tracking
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ items, className = '', postSlug = '' }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const handleScroll = () => {
      // Show TOC when user starts reading
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 200);

      // Find the currently active section
      const sections = items.map(item => {
        const element = document.getElementById(item.id);
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        return {
          id: item.id,
          top: rect.top,
          element
        };
      }).filter(Boolean);

      // Find the section that's currently in view (closest to top of viewport)
      let currentSection = '';
      let minDistance = Infinity;

      sections.forEach(section => {
        if (section) {
          const distance = Math.abs(section.top - 100); // 100px offset for header
          if (distance < minDistance && section.top <= 150) {
            minDistance = distance;
            currentSection = section.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Track TOC click analytics
      if (postSlug) {
        const item = items.find(item => item.id === id);
        if (item) {
          const sectionIndex = items.findIndex(item => item.id === id);
          blogAnalytics.trackTOCClick(postSlug, item.title, sectionIndex);
        }
      }
    }
  };

  if (items.length === 0 || !isVisible) {
    return null;
  }

  return (
    <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 ${className}`}>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 max-w-xs">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-gray-900">Sadržaj</h3>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            aria-label={isCollapsed ? 'Proširi sadržaj' : 'Smanji sadržaj'}
          >
            {isCollapsed ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isCollapsed ? 'max-h-0' : 'max-h-96'
        }`}>
          <nav className="p-4">
            <ul className="space-y-1 max-h-80 overflow-y-auto">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left text-sm py-2 px-3 rounded-md transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 ${
                      activeSection === item.id
                        ? 'bg-blue-100 text-blue-700 font-medium border-l-2 border-blue-500'
                        : 'text-gray-600 hover:text-gray-900'
                    } ${
                      item.level === 3 ? 'ml-4 text-xs' : ''
                    }`}
                  >
                    <span className="block truncate" title={item.title}>
                      {item.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Progress indicator */}
        <div className="px-4 pb-3">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300 ease-out"
              style={{ 
                width: `${items.length > 0 ? ((items.findIndex(item => item.id === activeSection) + 1) / items.length) * 100 : 0}%` 
              }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1 text-center">
            {activeSection ? `${items.findIndex(item => item.id === activeSection) + 1} od ${items.length}` : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

// Throttle function to limit scroll event frequency
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
}

export default TableOfContents;
