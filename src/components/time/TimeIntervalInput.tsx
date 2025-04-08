import React, { useState } from 'react';

interface TimeIntervalInputProps {
  onCalculate: (startDate: string, endDate: string) => void;
}

export function TimeIntervalInput({ onCalculate }: TimeIntervalInputProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateDates = () => {
    if (!startDate || !endDate) return false;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      setError('Završni datum mora biti nakon početnog datuma');
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = () => {
    if (startDate && endDate && validateDates()) {
      onCalculate(startDate, endDate);
    }
  };

  const inputClasses = `
    w-full rounded-lg border-gray-300 shadow-sm px-4 py-3
    focus:border-indigo-500 focus:ring-indigo-500
    text-base
  `;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-base font-medium text-gray-700">
          Početni datum i vrijeme
        </label>
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-base font-medium text-gray-700">
          Završni datum i vrijeme
        </label>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={inputClasses}
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!startDate || !endDate}
        className="w-full px-6 py-3 text-sm font-medium text-white
                 bg-indigo-600 rounded-lg hover:bg-indigo-700
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Izračunaj
      </button>
    </div>
  );
}