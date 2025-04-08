import React, { useState, useEffect } from 'react';
import { GradientCard } from '../GradientCard';
import { 
  calculateWorkingDays, 
  addWorkingDays,
  formatDate,
  DateFormat,
  croatianHolidays,
  isWeekend,
  isHoliday
} from '../../utils/dateCalculator';

export function WorkingDaysCalculator() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14); // Default to 14 days in the future
    return date;
  });
  const [excludeWeekends, setExcludeWeekends] = useState<boolean>(true);
  const [excludeHolidays, setExcludeHolidays] = useState<boolean>(true);
  const [customHolidays, setCustomHolidays] = useState<Date[]>([]);
  const [newHolidayDate, setNewHolidayDate] = useState<string>('');
  const [workingDays, setWorkingDays] = useState<number>(0);
  const [calculationMode, setCalculationMode] = useState<'difference' | 'add'>('difference');
  const [daysToAdd, setDaysToAdd] = useState<number>(10);
  const [resultDate, setResultDate] = useState<Date | null>(null);
  const [dateFormat, setDateFormat] = useState<DateFormat>('dd.MM.yyyy');

  useEffect(() => {
    // Calculate working days when inputs change
    if (calculationMode === 'difference') {
      const days = calculateWorkingDays(startDate, endDate, {
        excludeWeekends,
        excludeHolidays,
        holidays: customHolidays
      });
      setWorkingDays(days);
    } else {
      const result = addWorkingDays(startDate, daysToAdd, {
        excludeWeekends,
        excludeHolidays,
        holidays: customHolidays
      });
      setResultDate(result);
    }
  }, [startDate, endDate, excludeWeekends, excludeHolidays, customHolidays, calculationMode, daysToAdd]);

  const handleAddCustomHoliday = () => {
    if (newHolidayDate) {
      const holidayDate = new Date(newHolidayDate);
      if (!isNaN(holidayDate.getTime())) {
        setCustomHolidays([...customHolidays, holidayDate]);
        setNewHolidayDate('');
      }
    }
  };

  const handleRemoveCustomHoliday = (index: number) => {
    const updatedHolidays = [...customHolidays];
    updatedHolidays.splice(index, 1);
    setCustomHolidays(updatedHolidays);
  };

  const handleReset = () => {
    const today = new Date();
    setStartDate(today);
    
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + 14);
    setEndDate(futureDate);
    
    setExcludeWeekends(true);
    setExcludeHolidays(true);
    setCustomHolidays([]);
    setDaysToAdd(10);
    setCalculationMode('difference');
  };

  const getDateStatus = (date: Date): { isWorkingDay: boolean; reason?: string } => {
    if (excludeWeekends && isWeekend(date)) {
      return { isWorkingDay: false, reason: 'Vikend' };
    }
    
    if (excludeHolidays) {
      // Check Croatian holidays
      for (const holiday of croatianHolidays) {
        if (date.getDate() === holiday.day && date.getMonth() + 1 === holiday.month) {
          return { isWorkingDay: false, reason: `Praznik: ${holiday.name}` };
        }
      }
      
      // Check custom holidays
      for (const holiday of customHolidays) {
        if (
          date.getDate() === holiday.getDate() && 
          date.getMonth() === holiday.getMonth() && 
          date.getFullYear() === holiday.getFullYear()
        ) {
          return { isWorkingDay: false, reason: 'Prilagođeni neradni dan' };
        }
      }
    }
    
    return { isWorkingDay: true };
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GradientCard>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Kalkulator Radnih Dana</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Način izračuna
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setCalculationMode('difference')}
                    className={`py-2 px-4 rounded-lg text-sm font-medium ${
                      calculationMode === 'difference' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Razlika između datuma
                  </button>
                  <button
                    onClick={() => setCalculationMode('add')}
                    className={`py-2 px-4 rounded-lg text-sm font-medium ${
                      calculationMode === 'add' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Dodaj radne dane
                  </button>
                </div>
              </div>

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

              {calculationMode === 'difference' ? (
                <div className="space-y-2">
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
              ) : (
                <div className="space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Broj radnih dana za dodati
                  </label>
                  <input
                    type="number"
                    value={daysToAdd}
                    onChange={(e) => setDaysToAdd(parseInt(e.target.value) || 0)}
                    min="1"
                    className={inputClasses}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Opcije
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="excludeWeekends"
                      checked={excludeWeekends}
                      onChange={(e) => setExcludeWeekends(e.target.checked)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="excludeWeekends" className="ml-2 block text-sm text-gray-700">
                      Isključi vikende (subota i nedjelja)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="excludeHolidays"
                      checked={excludeHolidays}
                      onChange={(e) => setExcludeHolidays(e.target.checked)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="excludeHolidays" className="ml-2 block text-sm text-gray-700">
                      Isključi praznike
                    </label>
                  </div>
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

              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Dodaj prilagođeni neradni dan
                </label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={newHolidayDate}
                    onChange={(e) => setNewHolidayDate(e.target.value)}
                    className={`${inputClasses} flex-1`}
                  />
                  <button
                    onClick={handleAddCustomHoliday}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                    disabled={!newHolidayDate}
                  >
                    Dodaj
                  </button>
                </div>
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
                {calculationMode === 'difference' ? (
                  <>
                    <p className="text-lg text-gray-600 mb-2">
                      Od {formatDate(startDate, dateFormat)} do {formatDate(endDate, dateFormat)}
                    </p>
                    <p className="text-3xl font-bold text-purple-600">
                      {workingDays} {workingDays === 1 ? 'radni dan' : (workingDays % 10 >= 2 && workingDays % 10 <= 4 && (workingDays % 100 < 10 || workingDays % 100 >= 20) ? 'radna dana' : 'radnih dana')}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-lg text-gray-600 mb-2">
                      {daysToAdd} {daysToAdd === 1 ? 'radni dan' : (daysToAdd % 10 >= 2 && daysToAdd % 10 <= 4 && (daysToAdd % 100 < 10 || daysToAdd % 100 >= 20) ? 'radna dana' : 'radnih dana')} nakon {formatDate(startDate, dateFormat)}
                    </p>
                    <p className="text-3xl font-bold text-purple-600">
                      {resultDate ? formatDate(resultDate, dateFormat) : ''}
                    </p>
                  </>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800 mb-2">Prilagođeni neradni dani:</h3>
              {customHolidays.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {customHolidays.map((holiday, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-2 rounded">
                      <span>{formatDate(holiday, dateFormat)}</span>
                      <button
                        onClick={() => handleRemoveCustomHoliday(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Nema prilagođenih neradnih dana.</p>
              )}
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Kalendar:</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {(() => {
                  const days = [];
                  const currentDate = new Date(startDate);
                  const end = calculationMode === 'difference' ? new Date(endDate) : (resultDate || new Date(endDate));
                  
                  while (currentDate <= end) {
                    const status = getDateStatus(currentDate);
                    days.push(
                      <div 
                        key={currentDate.toISOString()} 
                        className={`flex justify-between items-center p-2 rounded ${
                          status.isWorkingDay ? 'bg-green-50' : 'bg-red-50'
                        }`}
                      >
                        <span>{formatDate(new Date(currentDate), dateFormat)}</span>
                        <span className={status.isWorkingDay ? 'text-green-600' : 'text-red-600'}>
                          {status.isWorkingDay ? 'Radni dan' : status.reason}
                        </span>
                      </div>
                    );
                    currentDate.setDate(currentDate.getDate() + 1);
                  }
                  
                  return days;
                })()}
              </div>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
