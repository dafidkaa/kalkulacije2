import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator } from 'lucide-react';

export function Header() {
  const location = useLocation();
  
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
      default:
        return 'Kalkulacije.com';
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Calculator className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">{getTitle()}</span>
          </Link>
          <a
            href="https://ajde.online"
            className="inline-flex items-center px-6 py-2.5 rounded-lg
                     bg-gradient-to-r from-blue-600 to-blue-700
                     text-white font-medium shadow-lg shadow-blue-500/20
                     hover:shadow-blue-500/30 transition-all duration-200"
          >
            Ajde.Online
          </a>
        </div>
      </div>
    </header>
  );
}