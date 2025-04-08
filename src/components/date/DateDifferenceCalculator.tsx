import React, { useState, useEffect } from 'react';
import { GradientCard } from '../GradientCard';
import { 
  calculateDateDifference, 
  calculateDetailedDifference,
  formatDate,
  DateFormat
} from '../../utils/dateCalculator';

export function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // Default to 7 days in the future
    return date;
  });
  const [showDetailedResult, setShowDetailedResult] = useState<boolean>(false);
  const [dateFormat, setDateFormat] = useState<DateFormat>('dd.MM.yyyy');
  const [swapped, setSwapped] = useState<boolean>(false);

  const [difference, setDifference] = useState({
    days: 0,
    weeks: 0,
    months: 0,
    years: 0,
    totalDays: 0
  });

  const [detailedDifference, setDetailedDifference] = useState({
    years: 0,
    months: 0,
    days: 0,
    totalDays: 0
  });

  useEffect(() => {
    // Calculate difference when dates change
    const diff = calculateDateDifference(startDate, endDate);
    setDifference(diff);
    
    const detailedDiff = calculateDetailedDifference(startDate, endDate);
    setDetailedDifference(detailedDiff);
    
    // Check if dates are swapped
    setSwapped(startDate > endDate);
  }, [startDate, endDate]);

  const handleSwapDates = () => {
    const temp = new Date(startDate);
    setStartDate(new Date(endDate));
    setEndDate(temp);
  };

  const handleReset = () => {
    const today = new Date();
    setStartDate(today);
    
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + 7);
    setEndDate(futureDate);
    
    setShowDetailedResult(false);
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GradientCard>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Izračun Razlike Između Datuma</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Početni datum
                  </label>
                  <input
                    type="date"
                    value={startDate.toISOString().split('T')[0]}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                    className={inputClasses}
                  />
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={handleSwapDates}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
                    title="Zamijeni datume"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                </div>

                <div className="col-span-2 space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Završni datum
                  </label>
                  <input
                    type="date"
                    value={endDate.toISOString().split('T')[0]}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Format datuma
                </label>
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value as DateFormat)}
                  className={inputClasses}
                >
                  <option value="dd.MM.yyyy">DD.MM.YYYY (31.12.2023)</option>
                  <option value="MM/dd/yyyy">MM/DD/YYYY (12/31/2023)</option>
                  <option value="yyyy-MM-dd">YYYY-MM-DD (2023-12-31)</option>
                  <option value="dd/MM/yyyy">DD/MM/YYYY (31/12/2023)</option>
                  <option value="dd. MMMM yyyy.">DD. MMMM YYYY. (31. prosinac 2023.)</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowDetailedResult(!showDetailedResult)}
                className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-lg
                         hover:bg-purple-700 transition-colors duration-200"
              >
                {showDetailedResult ? 'Prikaži sažeti rezultat' : 'Prikaži detaljni rezultat'}
              </button>
              <button
                onClick={handleReset}
                className="py-3 px-4 bg-gray-200 text-gray-700 rounded-lg
                         hover:bg-gray-300 transition-colors duration-200"
              >
                Resetiraj
              </button>
            </div>
          </div>
        </GradientCard>

        <GradientCard>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Rezultat</h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-2">
                  Od {formatDate(startDate, dateFormat)} do {formatDate(endDate, dateFormat)}
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {swapped ? '-' : ''}{difference.totalDays} {difference.totalDays === 1 ? 'dan' : (difference.totalDays % 10 >= 2 && difference.totalDays % 10 <= 4 && (difference.totalDays % 100 < 10 || difference.totalDays % 100 >= 20) ? 'dana' : 'dana')}
                </p>
              </div>
            </div>
            
            {showDetailedResult ? (
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="text-lg font-medium text-purple-800 mb-2">Detaljna razlika:</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Godine</p>
                      <p className="text-2xl font-bold text-purple-600">{detailedDifference.years}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Mjeseci</p>
                      <p className="text-2xl font-bold text-purple-600">{detailedDifference.months}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Dani</p>
                      <p className="text-2xl font-bold text-purple-600">{detailedDifference.days}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="text-lg font-medium text-purple-800 mb-2">Razlika u različitim jedinicama:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Tjedni:</span>
                      <span className="font-medium">{difference.weeks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Dani:</span>
                      <span className="font-medium">{difference.days}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Mjeseci:</span>
                      <span className="font-medium">{difference.months}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Godine:</span>
                      <span className="font-medium">{difference.years}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Dodatne informacije:</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  {swapped ? 'Početni datum je nakon završnog datuma. Rezultat prikazuje razliku s negativnim predznakom.' : ''}
                </p>
                <p className="text-gray-600">
                  Ukupno: {Math.floor(difference.totalDays / 7)} tjedana i {difference.totalDays % 7} dana
                </p>
                <p className="text-gray-600">
                  Približno: {(difference.totalDays / 365.25).toFixed(2)} godina
                </p>
                <p className="text-gray-600">
                  Sati: {difference.totalDays * 24} sati
                </p>
                <p className="text-gray-600">
                  Minute: {difference.totalDays * 24 * 60} minuta
                </p>
              </div>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
