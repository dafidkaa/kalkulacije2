import React, { useState, useEffect } from 'react';
import { GradientCard } from '../GradientCard';
import { 
  getDaysUntil,
  formatDate,
  DateFormat,
  commonEvents,
  CommonEvent
} from '../../utils/dateCalculator';

interface CustomEvent {
  name: string;
  date: Date;
  category: 'holiday' | 'personal' | 'business';
}

export function EventCountdown() {
  const [targetDate, setTargetDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30); // Default to 30 days in the future
    return date;
  });
  const [eventName, setEventName] = useState<string>('Moj događaj');
  const [daysUntil, setDaysUntil] = useState<number>(0);
  const [customEvents, setCustomEvents] = useState<CustomEvent[]>([]);
  const [selectedCommonEvent, setSelectedCommonEvent] = useState<string>('');
  const [dateFormat, setDateFormat] = useState<DateFormat>('dd.MM.yyyy');
  const [eventCategory, setEventCategory] = useState<'holiday' | 'personal' | 'business'>('personal');

  useEffect(() => {
    // Calculate days until target date
    setDaysUntil(getDaysUntil(targetDate));
    
    // Update countdown every day
    const interval = setInterval(() => {
      setDaysUntil(getDaysUntil(targetDate));
    }, 86400000); // 24 hours
    
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleAddEvent = () => {
    if (eventName.trim()) {
      const newEvent: CustomEvent = {
        name: eventName,
        date: new Date(targetDate),
        category: eventCategory
      };
      
      setCustomEvents([...customEvents, newEvent]);
      
      // Reset form
      setEventName('Moj događaj');
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + 30);
      setTargetDate(newDate);
    }
  };

  const handleRemoveEvent = (index: number) => {
    const updatedEvents = [...customEvents];
    updatedEvents.splice(index, 1);
    setCustomEvents(updatedEvents);
  };

  const handleSelectCommonEvent = (eventName: string) => {
    setSelectedCommonEvent(eventName);
    
    const event = commonEvents.find(e => e.name === eventName);
    if (event) {
      setTargetDate(event.getNextDate());
      setEventName(event.name);
      setEventCategory(event.category);
    }
  };

  const getProgressPercentage = (daysUntil: number): number => {
    // Assuming 100 days is the maximum for the progress bar
    const maxDays = 100;
    const percentage = 100 - (daysUntil / maxDays) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  };

  const getTimeRemaining = (daysUntil: number): { days: number; hours: number; minutes: number; seconds: number } => {
    const now = new Date();
    const targetDateTime = new Date(targetDate);
    
    // Set target date to end of day
    targetDateTime.setHours(23, 59, 59, 999);
    
    const totalSeconds = Math.max(0, Math.floor((targetDateTime.getTime() - now.getTime()) / 1000));
    
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    return { days, hours, minutes, seconds };
  };

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(daysUntil));

  useEffect(() => {
    // Update countdown every second
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(daysUntil));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [daysUntil, targetDate]);

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GradientCard>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Odbrojavanje do Događaja</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Uobičajeni događaji
                </label>
                <select
                  value={selectedCommonEvent}
                  onChange={(e) => handleSelectCommonEvent(e.target.value)}
                  className={inputClasses}
                >
                  <option value="">-- Odaberite događaj --</option>
                  {commonEvents.map((event, index) => (
                    <option key={index} value={event.name}>
                      {event.name} ({formatDate(event.getNextDate(), 'dd.MM.yyyy')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Naziv događaja
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Datum događaja
                </label>
                <input
                  type="date"
                  value={targetDate.toISOString().split('T')[0]}
                  onChange={(e) => setTargetDate(new Date(e.target.value))}
                  className={inputClasses}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Kategorija
                </label>
                <select
                  value={eventCategory}
                  onChange={(e) => setEventCategory(e.target.value as 'holiday' | 'personal' | 'business')}
                  className={inputClasses}
                >
                  <option value="holiday">Praznik</option>
                  <option value="personal">Osobno</option>
                  <option value="business">Poslovno</option>
                </select>
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
                onClick={handleAddEvent}
                className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-lg
                         hover:bg-purple-700 transition-colors duration-200"
              >
                Dodaj u moje događaje
              </button>
            </div>
          </div>
        </GradientCard>

        <GradientCard>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Odbrojavanje</h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-2">
                  {eventName} ({formatDate(targetDate, dateFormat)})
                </p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{timeRemaining.days}</p>
                    <p className="text-xs text-purple-600">dana</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{timeRemaining.hours}</p>
                    <p className="text-xs text-purple-600">sati</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{timeRemaining.minutes}</p>
                    <p className="text-xs text-purple-600">minuta</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{timeRemaining.seconds}</p>
                    <p className="text-xs text-purple-600">sekundi</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full" 
                    style={{ width: `${getProgressPercentage(daysUntil)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {daysUntil <= 0 ? 'Događaj je prošao!' : `Još ${daysUntil} dana do događaja`}
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800 mb-2">Moji događaji:</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {customEvents.length > 0 ? (
                  customEvents.map((event, index) => {
                    const daysLeft = getDaysUntil(event.date);
                    return (
                      <div 
                        key={index} 
                        className={`flex justify-between items-center p-3 rounded-lg ${
                          daysLeft <= 0 ? 'bg-gray-100' : 
                          daysLeft <= 7 ? 'bg-red-50' : 
                          daysLeft <= 30 ? 'bg-yellow-50' : 'bg-green-50'
                        }`}
                      >
                        <div>
                          <p className="font-medium">{event.name}</p>
                          <p className="text-sm text-gray-600">{formatDate(event.date, dateFormat)}</p>
                          <div className="flex items-center mt-1">
                            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                              event.category === 'holiday' ? 'bg-red-500' : 
                              event.category === 'personal' ? 'bg-blue-500' : 'bg-green-500'
                            }`}></span>
                            <span className="text-xs text-gray-500">
                              {event.category === 'holiday' ? 'Praznik' : 
                               event.category === 'personal' ? 'Osobno' : 'Poslovno'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${
                            daysLeft <= 0 ? 'text-gray-500' : 
                            daysLeft <= 7 ? 'text-red-600' : 
                            daysLeft <= 30 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {daysLeft <= 0 ? 'Prošao' : `${daysLeft} dana`}
                          </p>
                          <button
                            onClick={() => handleRemoveEvent(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Ukloni
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-600">Nema spremljenih događaja.</p>
                )}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Nadolazeći praznici:</h3>
              <div className="space-y-2">
                {commonEvents
                  .filter(event => event.category === 'holiday')
                  .map((event, index) => {
                    const eventDate = event.getNextDate();
                    const daysLeft = getDaysUntil(eventDate);
                    return (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">{event.name}:</span>
                        <span className="text-gray-700">{formatDate(eventDate, dateFormat)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          daysLeft <= 7 ? 'bg-red-100 text-red-800' : 
                          daysLeft <= 30 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {daysLeft} dana
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
