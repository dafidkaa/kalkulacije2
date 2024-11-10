import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SalaryCalculator } from './pages/SalaryCalculator';
import { UnitConverter } from './pages/UnitConverter';
import { BMICalculator } from './pages/BMICalculator';
import { PercentageCalculator } from './pages/PercentageCalculator';
import { TimeCalculator } from './pages/TimeCalculator';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kalkulator-place" element={<SalaryCalculator />} />
            <Route path="/pretvaranje-jedinica" element={<UnitConverter />} />
            <Route path="/kalkulator-bmi" element={<BMICalculator />} />
            <Route path="/kalkulator-postotaka" element={<PercentageCalculator />} />
            <Route path="/kalkulator-vremena" element={<TimeCalculator />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}