import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Breadcrumb } from './components/Breadcrumb';
import { Footer } from './components/Footer';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { initializeAnalytics } from './utils/analytics';
import { ScrollToTop } from './components/ScrollToTop';

// Page Imports
import { HomePage } from './pages/HomePage';
import { SalaryCalculator } from './pages/SalaryCalculator';
import { UnitConverter } from './pages/UnitConverter';
import { BMICalculator } from './pages/BMICalculator';
import { PercentageCalculator } from './pages/PercentageCalculator';
import { TimeCalculator } from './pages/TimeCalculator';
import { AreaCalculator } from './pages/AreaCalculator';
import { TemperatureConverter } from './pages/TemperatureConverter';
import { CreditCalculator } from './pages/CreditCalculator';
import { VatCalculator } from './pages/VatCalculator';
import { CalorieCalculator } from './pages/CalorieCalculator';
import { WaterCalculator } from './pages/WaterCalculator';
import { SavingsCalculator } from './pages/SavingsCalculator';
import { DateCalculator } from './pages/DateCalculator';
import { Calculator } from './pages/Calculator';
import BlogIndex from './pages/BlogIndex';
import { BlogPost } from './pages/BlogPost';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { FuelCalculator } from './pages/FuelCalculator';
import { DiscountCalculator } from './pages/DiscountCalculator';
import { GPACalculator } from './pages/GPACalculator';
import { AffordabilityCalculator } from './pages/AffordabilityCalculator';
import { BudgetCalculator } from './pages/BudgetCalculator';
import { EVChargingCalculator } from './pages/EVChargingCalculator';
import { VehiclePowerCalculator } from './pages/VehiclePowerCalculator';
import { FuelComparisonCalculator } from './pages/FuelComparisonCalculator';

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
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Header />
        <Breadcrumb />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Finance */}
            <Route path="/kalkulator-place" element={<SalaryCalculator />} />
            <Route path="/kreditni-kalkulator" element={<CreditCalculator />} />
            <Route path="/pdv-kalkulator" element={<VatCalculator />} />
            <Route path="/kalkulator-stednje" element={<SavingsCalculator />} />
            <Route path="/kalkulator-budzeta" element={<BudgetCalculator />} />
            <Route path="/kalkulator-popusta" element={<DiscountCalculator />} />
            <Route path="/kalkulator-priustivosti" element={<AffordabilityCalculator />} />
            <Route path="/kalkulator-punjenja-ev" element={<EVChargingCalculator />} />
            <Route path="/kalkulator-snage-vozila" element={<VehiclePowerCalculator />} />
            <Route path="/usporedba-goriva" element={<FuelComparisonCalculator />} />

            {/* Health */}
            <Route path="/kalkulator-bmi" element={<BMICalculator />} />
            <Route path="/kalkulator-kalorija" element={<CalorieCalculator />} />
            <Route path="/kalkulator-vode" element={<WaterCalculator />} />

            {/* Time & Date */}
            <Route path="/kalkulator-datuma" element={<DateCalculator />} />
            <Route path="/kalkulator-vremena" element={<TimeCalculator />} />

            {/* Conversions & Math */}
            <Route path="/pretvaranje-jedinica" element={<UnitConverter />} />
            <Route path="/pretvarac-temperature" element={<TemperatureConverter />} />
            <Route path="/kalkulator-postotaka" element={<PercentageCalculator />} />
            <Route path="/kalkulator-povrsine" element={<AreaCalculator />} />
            <Route path="/kalkulator" element={<Calculator />} />

            {/* Utility & Education */}
            <Route path="/kalkulator-goriva" element={<FuelCalculator />} />
            <Route path="/kalkulator-prosjeka" element={<GPACalculator />} />

            {/* Blog Routes */}
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/page/:page" element={<BlogIndex />} />
            <Route path="/blog/tag/:tag" element={<BlogIndex />} />
            <Route path="/blog/category/:category" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPostWrapper />} />

            {/* Legal Pages */}
            <Route path="/kolacici" element={<CookiePolicyPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsentBanner />
      </div>
    </Router>
  );
}