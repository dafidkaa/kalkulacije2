import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbSchema } from './SchemaMarkup';

interface BreadcrumbItem {
  name: string;
  url: string;
}

const routeNames: Record<string, string> = {
  '/': 'Početna',
  '/kalkulator-place': 'Kalkulator Plaće',
  '/pretvaranje-jedinica': 'Pretvarač Jedinica',
  '/kalkulator-bmi': 'BMI Kalkulator',
  '/kalkulator-postotaka': 'Kalkulator Postotaka',
  '/kalkulator-vremena': 'Kalkulator Vremena',
  '/kalkulator-povrsine': 'Kalkulator Površine',
  '/pretvarac-temperature': 'Pretvarač Temperature',
  '/kalkulator-datuma': 'Kalkulator Datuma',
  '/kalkulator': 'AI Kalkulator',
  '/blog': 'Blog',
};

// Helper function to convert slug to readable title
const slugToTitle = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Helper function to get blog post title from slug
const getBlogPostTitle = (slug: string): string => {
  // Map of known blog post slugs to titles
  const blogPostTitles: { [key: string]: string } = {
    'kako-izracunati-bmi': 'Kako izračunati BMI',
    'kako-izracunati-koliko-imam-godina-tocno': 'Kako izračunati Koliko imam godina',
    'kako-izracunati-postotak': 'Kako izračunati Postotak',
    'kako-izracunati-razliku-izmedu-datuma': 'Kako izračunati Razliku između datuma',
    'koliko-radnih-dana-izmedu-dva-datuma-hrvatska': 'Koliko radnih dana između dva datuma'
  };

  return blogPostTitles[slug] || slugToTitle(slug);
};

// Helper function to get category from blog post slug
const getBlogPostCategory = (slug: string): string => {
  // Map of known blog post slugs to categories
  const blogPostCategories: { [key: string]: string } = {
    'kako-izracunati-bmi': 'Zdravlje',
    'kako-izracunati-koliko-imam-godina-tocno': 'Datumi i dani',
    'kako-izracunati-postotak': 'Postotci i PDV',
    'kako-izracunati-razliku-izmedu-datuma': 'Datumi i dani',
    'koliko-radnih-dana-izmedu-dva-datuma-hrvatska': 'Datumi i dani'
  };

  return blogPostCategories[slug] || 'Blog';
};

export function Breadcrumb() {
  const location = useLocation();

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') {
    return null;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      name: 'Početna',
      url: 'https://kalkulacije.com/'
    }
  ];

  // Handle blog routes
  if (location.pathname === '/blog') {
    breadcrumbItems.push({
      name: 'Blog',
      url: 'https://kalkulacije.com/blog'
    });
  } else if (location.pathname.startsWith('/blog/category/')) {
    const categorySlug = location.pathname.split('/blog/category/')[1];
    const categoryName = slugToTitle(categorySlug);
    breadcrumbItems.push({
      name: 'Blog',
      url: 'https://kalkulacije.com/blog'
    });
    breadcrumbItems.push({
      name: `Kategorija: ${categoryName}`,
      url: `https://kalkulacije.com${location.pathname}`
    });
  } else if (location.pathname.startsWith('/blog/tag/')) {
    const tagSlug = location.pathname.split('/blog/tag/')[1];
    const tagName = slugToTitle(tagSlug);
    breadcrumbItems.push({
      name: 'Blog',
      url: 'https://kalkulacije.com/blog'
    });
    breadcrumbItems.push({
      name: `Tag: ${tagName}`,
      url: `https://kalkulacije.com${location.pathname}`
    });
  } else if (location.pathname.startsWith('/blog/')) {
    const slug = location.pathname.split('/blog/')[1];
    const postTitle = getBlogPostTitle(slug);
    const postCategory = getBlogPostCategory(slug);
    const categorySlug = postCategory.toLowerCase().replace(/\s+/g, '-');

    breadcrumbItems.push({
      name: 'Blog',
      url: 'https://kalkulacije.com/blog'
    });

    // Add category breadcrumb
    breadcrumbItems.push({
      name: `Kategorija: ${postCategory}`,
      url: `https://kalkulacije.com/blog/category/${categorySlug}`
    });

    // Add post title breadcrumb
    breadcrumbItems.push({
      name: postTitle,
      url: `https://kalkulacije.com${location.pathname}`
    });
  } else {
    breadcrumbItems.push({
      name: routeNames[location.pathname] || 'Stranica',
      url: `https://kalkulacije.com${location.pathname}`
    });
  }

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <nav className="bg-gray-50 border-b border-gray-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-3 text-sm">
            <Link 
              to="/" 
              className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              Početna
            </Link>
            
            <ChevronRight className="w-4 h-4 text-gray-400" />
            
            <span className="text-gray-900 font-medium">
              {routeNames[location.pathname] || 'Stranica'}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
