import React, { useState, useEffect } from 'react';
import { GradientCard } from '../GradientCard';
import { 
  calculateAge,
  formatDate,
  DateFormat
} from '../../utils/dateCalculator';

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<Date>(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 30); // Default to 30 years ago
    return date;
  });
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const [useCustomTargetDate, setUseCustomTargetDate] = useState<boolean>(false);
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
    totalDays: 0
  });
  const [dateFormat, setDateFormat] = useState<DateFormat>('dd.MM.yyyy');

  useEffect(() => {
    // Calculate age when inputs change
    const calculatedAge = calculateAge(birthDate, useCustomTargetDate ? targetDate : new Date());
    setAge(calculatedAge);
  }, [birthDate, targetDate, useCustomTargetDate]);

  const handleReset = () => {
    const today = new Date();
    const defaultBirthDate = new Date();
    defaultBirthDate.setFullYear(today.getFullYear() - 30);
    
    setBirthDate(defaultBirthDate);
    setTargetDate(today);
    setUseCustomTargetDate(false);
  };

  const getNextBirthday = (): { date: Date; daysUntil: number } => {
    const today = new Date();
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    
    // If birthday has already occurred this year, set to next year
    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    // Calculate days until next birthday
    const daysUntil = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return { date: nextBirthday, daysUntil };
  };

  const getZodiacSign = (): string => {
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Ovan';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Bik';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Blizanci';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Rak';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Lav';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Djevica';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Vaga';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Škorpion';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Strijelac';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Jarac';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Vodenjak';
    return 'Ribe';
  };

  const getChineseZodiac = (): string => {
    const year = birthDate.getFullYear();
    const animals = ['Majmun', 'Pijetao', 'Pas', 'Svinja', 'Štakor', 'Vol', 'Tigar', 'Zec', 'Zmaj', 'Zmija', 'Konj', 'Koza'];
    return animals[(year - 4) % 12];
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GradientCard>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Kalkulator Starosti</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Datum rođenja
                </label>
                <input
                  type="date"
                  value={birthDate.toISOString().split('T')[0]}
                  onChange={(e) => setBirthDate(new Date(e.target.value))}
                  className={inputClasses}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="useCustomTargetDate"
                  checked={useCustomTargetDate}
                  onChange={(e) => setUseCustomTargetDate(e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="useCustomTargetDate" className="ml-2 block text-sm text-gray-700">
                  Izračunaj starost na određeni datum
                </label>
              </div>

              {useCustomTargetDate && (
                <div className="space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Ciljani datum
                  </label>
                  <input
                    type="date"
                    value={targetDate.toISOString().split('T')[0]}
                    onChange={(e) => setTargetDate(new Date(e.target.value))}
                    className={inputClasses}
                  />
                </div>
              )}

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
                  Rođen(a) {formatDate(birthDate, dateFormat)}
                  {useCustomTargetDate ? ` (starost na ${formatDate(targetDate, dateFormat)})` : ''}
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {age.years} {age.years === 1 ? 'godina' : (age.years % 10 >= 2 && age.years % 10 <= 4 && (age.years % 100 < 10 || age.years % 100 >= 20) ? 'godine' : 'godina')}, {age.months} {age.months === 1 ? 'mjesec' : (age.months % 10 >= 2 && age.months % 10 <= 4 && (age.months % 100 < 10 || age.months % 100 >= 20) ? 'mjeseca' : 'mjeseci')} i {age.days} {age.days === 1 ? 'dan' : (age.days % 10 >= 2 && age.days % 10 <= 4 && (age.days % 100 < 10 || age.days % 100 >= 20) ? 'dana' : 'dana')}
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800 mb-2">Starost u različitim jedinicama:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Ukupno dana</p>
                  <p className="text-xl font-bold text-purple-600">{age.totalDays.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Ukupno tjedana</p>
                  <p className="text-xl font-bold text-purple-600">{Math.floor(age.totalDays / 7).toLocaleString()}</p>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Ukupno mjeseci</p>
                  <p className="text-xl font-bold text-purple-600">{Math.floor(age.years * 12 + age.months).toLocaleString()}</p>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Približno godina</p>
                  <p className="text-xl font-bold text-purple-600">{(age.totalDays / 365.25).toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            {!useCustomTargetDate && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Sljedeći rođendan:</h3>
                <div className="space-y-2">
                  <p className="text-blue-700">
                    <span className="font-medium">Datum:</span> {formatDate(getNextBirthday().date, dateFormat)}
                  </p>
                  <p className="text-blue-700">
                    <span className="font-medium">Dani do rođendana:</span> {getNextBirthday().daysUntil}
                  </p>
                  <p className="text-blue-700">
                    <span className="font-medium">Napunit ćete:</span> {age.years + 1} {age.years + 1 === 1 ? 'godinu' : (age.years + 1 % 10 >= 2 && age.years + 1 % 10 <= 4 && (age.years + 1 % 100 < 10 || age.years + 1 % 100 >= 20) ? 'godine' : 'godina')}
                  </p>
                </div>
              </div>
            )}
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Zanimljivosti:</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Horoskopski znak:</span> {getZodiacSign()}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Kineski zodijak:</span> {getChineseZodiac()}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Dan u tjednu rođenja:</span> {
                    ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota'][birthDate.getDay()]
                  }
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Prijestupna godina rođenja:</span> {
                    ((birthDate.getFullYear() % 4 === 0 && birthDate.getFullYear() % 100 !== 0) || birthDate.getFullYear() % 400 === 0) ? 'Da' : 'Ne'
                  }
                </p>
              </div>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
