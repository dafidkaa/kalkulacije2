import React, { useState, useEffect } from 'react';
import { GradientCard } from '../GradientCard';
import { 
  addDays, 
  addMonths, 
  addYears,
  formatDate,
  DateFormat
} from '../../utils/dateCalculator';

type TimeUnit = 'days' | 'weeks' | 'months' | 'years';

export function DateAddSubtract() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState<number>(7);
  const [unit, setUnit] = useState<TimeUnit>('days');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [resultDate, setResultDate] = useState<Date>(new Date());
  const [dateFormat, setDateFormat] = useState<DateFormat>('dd.MM.yyyy');

  useEffect(() => {
    // Calculate result date when inputs change
    calculateResultDate();
  }, [startDate, amount, unit, operation]);

  const calculateResultDate = () => {
    const multiplier = operation === 'add' ? 1 : -1;
    let result = new Date(startDate);
    
    switch (unit) {
      case 'days':
        result = addDays(startDate, amount * multiplier);
        break;
      case 'weeks':
        result = addDays(startDate, amount * 7 * multiplier);
        break;
      case 'months':
        result = addMonths(startDate, amount * multiplier);
        break;
      case 'years':
        result = addYears(startDate, amount * multiplier);
        break;
    }
    
    setResultDate(result);
  };

  const handleReset = () => {
    setStartDate(new Date());
    setAmount(7);
    setUnit('days');
    setOperation('add');
  };

  const getDayOfWeek = (date: Date): string => {
    const days = ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'];
    return days[date.getDay()];
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GradientCard>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dodavanje ili Oduzimanje od Datuma</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
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

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Operacija
                  </label>
                  <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value as 'add' | 'subtract')}
                    className={inputClasses}
                  >
                    <option value="add">Dodaj</option>
                    <option value="subtract">Oduzmi</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Količina
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                    min="0"
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Jedinica
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as TimeUnit)}
                    className={inputClasses}
                  >
                    <option value="days">Dana</option>
                    <option value="weeks">Tjedana</option>
                    <option value="months">Mjeseci</option>
                    <option value="years">Godina</option>
                  </select>
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
                onClick={calculateResultDate}
                className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-lg
                         hover:bg-purple-700 transition-colors duration-200"
              >
                Izračunaj
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
                  {operation === 'add' ? 'Dodavanje' : 'Oduzimanje'} {amount} {
                    unit === 'days' ? (amount === 1 ? 'dan' : 'dana') :
                    unit === 'weeks' ? (amount === 1 ? 'tjedan' : 'tjedana') :
                    unit === 'months' ? (amount === 1 ? 'mjesec' : (amount % 10 >= 2 && amount % 10 <= 4 && (amount % 100 < 10 || amount % 100 >= 20) ? 'mjeseca' : 'mjeseci')) :
                    (amount === 1 ? 'godina' : (amount % 10 >= 2 && amount % 10 <= 4 && (amount % 100 < 10 || amount % 100 >= 20) ? 'godine' : 'godina'))
                  } od {formatDate(startDate, dateFormat)}
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {formatDate(resultDate, dateFormat)}
                </p>
                <p className="text-gray-600 mt-2">
                  {getDayOfWeek(resultDate)}
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800 mb-2">Dodatne informacije:</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Tjedan u godini:</span> {getWeekNumber(resultDate)}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Dan u godini:</span> {getDayOfYear(resultDate)}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Preostalo dana u godini:</span> {getDaysLeftInYear(resultDate)}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Prijestupna godina:</span> {isLeapYear(resultDate.getFullYear()) ? 'Da' : 'Ne'}
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Brzi izračuni:</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-600">
                  <span className="font-medium">+1 dan:</span> {formatDate(addDays(startDate, 1), dateFormat)}
                </div>
                <div className="text-gray-600">
                  <span className="font-medium">+1 tjedan:</span> {formatDate(addDays(startDate, 7), dateFormat)}
                </div>
                <div className="text-gray-600">
                  <span className="font-medium">+1 mjesec:</span> {formatDate(addMonths(startDate, 1), dateFormat)}
                </div>
                <div className="text-gray-600">
                  <span className="font-medium">+1 godina:</span> {formatDate(addYears(startDate, 1), dateFormat)}
                </div>
              </div>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}

// Helper functions
function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getDaysLeftInYear(date: Date): number {
  const lastDayOfYear = new Date(date.getFullYear(), 11, 31);
  const diff = lastDayOfYear.getTime() - date.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
