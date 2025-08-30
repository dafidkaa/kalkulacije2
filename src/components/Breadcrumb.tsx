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
    breadcrumbItems.push({
      name: 'Blog',
      url: 'https://kalkulacije.com/blog'
    });
    breadcrumbItems.push({
      name: 'Kategorija',
      url: `https://kalkulacije.com${location.pathname}`
    });
  } else if (location.pathname.startsWith('/blog/tag/')) {
    breadcrumbItems.push({
      name: 'Blog',
      url: 'https://kalkulacije.com/blog'
    });
    breadcrumbItems.push({
      name: 'Tag',
      url: `https://kalkulacije.com${location.pathname}`
    });
  } else if (location.pathname.startsWith('/blog/')) {
    breadcrumbItems.push({
      name: 'Blog',
      url: 'https://kalkulacije.com/blog'
    });
    breadcrumbItems.push({
      name: 'Članak',
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
