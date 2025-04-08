import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const SalaryCalculator = lazy(() => import('./pages/SalaryCalculator').then(module => ({ default: module.SalaryCalculator })));
const UnitConverter = lazy(() => import('./pages/UnitConverter').then(module => ({ default: module.UnitConverter })));
const BMICalculator = lazy(() => import('./pages/BMICalculator').then(module => ({ default: module.BMICalculator })));
const PercentageCalculator = lazy(() => import('./pages/PercentageCalculator').then(module => ({ default: module.PercentageCalculator })));
const TimeCalculator = lazy(() => import('./pages/TimeCalculator').then(module => ({ default: module.TimeCalculator })));
const AreaCalculator = lazy(() => import('./pages/AreaCalculator').then(module => ({ default: module.AreaCalculator })));
const TemperatureConverter = lazy(() => import('./pages/TemperatureConverter').then(module => ({ default: module.TemperatureConverter })));
const DateCalculator = lazy(() => import('./pages/DateCalculator').then(module => ({ default: module.DateCalculator })));

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={
            <div className="flex justify-center items-center min-h-[50vh]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }>
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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}