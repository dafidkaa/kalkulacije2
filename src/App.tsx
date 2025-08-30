import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Breadcrumb } from './components/Breadcrumb';
import { Footer } from './components/Footer';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { initializeAnalytics } from './utils/analytics';

// Import page components directly for now to fix deployment issues
import { HomePage } from './pages/HomePage';
import { SalaryCalculator } from './pages/SalaryCalculator';
import { UnitConverter } from './pages/UnitConverter';
import { BMICalculator } from './pages/BMICalculator';
import { PercentageCalculator } from './pages/PercentageCalculator';
import { TimeCalculator } from './pages/TimeCalculator';
import { AreaCalculator } from './pages/AreaCalculator';
import { TemperatureConverter } from './pages/TemperatureConverter';
import { DateCalculator } from './pages/DateCalculator';
import { Calculator } from './pages/Calculator';
import BlogIndex from './pages/BlogIndex';
import { BlogPost } from './pages/BlogPost';
import { CookiePolicyPage } from './pages/CookiePolicyPage';

// Wrapper component to extract slug from URL params
function BlogPostWrapper() {
  return <BlogPost />;
}

export function App() {
  // Initialize analytics on app start
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Breadcrumb />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kalkulator-place" element={<SalaryCalculator />} />
            <Route path="/pretvaranje-jedinica" element={<UnitConverter />} />
            <Route path="/kalkulator-bmi" element={<BMICalculator />} />
            <Route path="/kalkulator-postotaka" element={<PercentageCalculator />} />
            <Route path="/kalkulator-vremena" element={<TimeCalculator />} />
            <Route path="/kalkulator-povrsine" element={<AreaCalculator />} />
            <Route path="/pretvarac-temperature" element={<TemperatureConverter />} />
            <Route path="/kalkulator-datuma" element={<DateCalculator />} />
            <Route path="/kalkulator" element={<Calculator />} />

            {/* Blog Routes */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/page/:page" element={<BlogIndex />} />
            <Route path="/blog/tag/:tag" element={<BlogIndex />} />
            <Route path="/blog/category/:category" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPostWrapper />} />

            {/* Legal Pages */}
            <Route path="/kolacici" element={<CookiePolicyPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsentBanner />
      </div>
    </Router>
  );
}