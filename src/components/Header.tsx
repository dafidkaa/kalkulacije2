import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, Menu, X, BookOpen } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Kalkulacije.com';
      case '/kalkulator-place':
        return 'Kalkulator Plaće';
      case '/pretvaranje-jedinica':
        return 'Pretvarač Jedinica';
      case '/kalkulator-bmi':
        return 'Kalkulator BMI';
      case '/kalkulator-postotaka':
        return 'Kalkulator Postotaka';
      case '/kalkulator-vremena':
        return 'Kalkulator Vremena';
      case '/kalkulator-povrsine':
        return 'Kalkulator Površine';
      case '/pretvarac-temperature':
        return 'Pretvarač Temperature';
      case '/kalkulator-datuma':
        return 'Kalkulator Datuma';
      case '/blog':
        return 'Kalkulacije Blog';
      default:
        if (location.pathname.startsWith('/blog/')) {
          return 'Kalkulacije Blog';
        }
        return 'Kalkulacije.com';
    }
  };

  const navigationItems = [
    { href: '/', label: 'Početna', icon: Calculator },
    { href: '/blog', label: 'Blog', icon: BookOpen },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Calculator className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">{getTitle()}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.href ||
                  (item.href === '/blog' && location.pathname.startsWith('/blog'))
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}

            {/* External Link */}
            <a
              href="https://ajde.online"
              className="inline-flex items-center px-4 py-2 rounded-lg
                       bg-gradient-to-r from-blue-600 to-blue-700
                       text-white font-medium shadow-lg shadow-blue-500/20
                       hover:shadow-blue-500/30 transition-all duration-200 text-sm"
            >
              Ajde.Online
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.href ||
                    (item.href === '/blog' && location.pathname.startsWith('/blog'))
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}

              {/* External Link for Mobile */}
              <a
                href="https://ajde.online"
                className="inline-flex items-center gap-3 px-3 py-3 rounded-lg
                         bg-gradient-to-r from-blue-600 to-blue-700
                         text-white font-medium shadow-lg shadow-blue-500/20
                         hover:shadow-blue-500/30 transition-all duration-200 text-sm mt-2"
              >
                <Calculator className="w-5 h-5" />
                Ajde.Online
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}