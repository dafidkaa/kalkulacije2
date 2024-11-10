import React, { useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';

interface TimeEntry {
  hours: number;
  minutes: number;
  seconds: number;
  operation: 'add' | 'subtract';
}

interface TimeArithmeticInputProps {
  onCalculate: (entries: TimeEntry[]) => void;
}

export function TimeArithmeticInput({ onCalculate }: TimeArithmeticInputProps) {
  const [entries, setEntries] = useState<TimeEntry[]>([
    { hours: 0, minutes: 0, seconds: 0, operation: 'add' }
  ]);

  const handleChange = (index: number, field: keyof TimeEntry, value: any) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { hours: 0, minutes: 0, seconds: 0, operation: 'add' }]);
  };

  const removeEntry = (index: number) => {
    if (entries.length > 1) {
      const newEntries = entries.filter((_, i) => i !== index);
      setEntries(newEntries);
    }
  };

  const handleSubmit = () => {
    onCalculate(entries);
  };

  const inputClasses = `
    w-full rounded-lg border-gray-300 shadow-sm px-4 py-3
    focus:border-indigo-500 focus:ring-indigo-500
    text-base placeholder-gray-400
  `;

  return (
    <div className="space-y-6">
      {entries.map((entry, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleChange(index, 'operation', entry.operation === 'add' ? 'subtract' : 'add')}
              className={`
                flex items-center justify-center
                w-10 h-10 rounded-lg text-lg font-medium
                ${entry.operation === 'add' 
                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                  : 'bg-red-100 text-red-600 hover:bg-red-200'}
              `}
            >
              {entry.operation === 'add' ? '+' : '−'}
            </button>
            
            <div className="flex-1 grid grid-cols-3 gap-4">
              <div>
                <input
                  type="number"
                  min="0"
                  value={entry.hours || ''}
                  onChange={(e) => handleChange(index, 'hours', parseInt(e.target.value) || 0)}
                  className={inputClasses}
                  placeholder="sat"
                />
                <div className="text-xs text-gray-500 mt-1 text-center">Sati</div>
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={entry.minutes || ''}
                  onChange={(e) => handleChange(index, 'minutes', parseInt(e.target.value) || 0)}
                  className={inputClasses}
                  placeholder="min"
                />
                <div className="text-xs text-gray-500 mt-1 text-center">Minute</div>
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={entry.seconds || ''}
                  onChange={(e) => handleChange(index, 'seconds', parseInt(e.target.value) || 0)}
                  className={inputClasses}
                  placeholder="sek"
                />
                <div className="text-xs text-gray-500 mt-1 text-center">Sekunde</div>
              </div>
            </div>

            {entries.length > 1 && (
              <button
                onClick={() => removeEntry(index)}
                className="w-10 h-10 flex items-center justify-center text-gray-400 
                         hover:text-gray-600 rounded-lg hover:bg-gray-100"
                title="Ukloni"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="flex gap-4 pt-2">
        <button
          onClick={addEntry}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-indigo-600 
                   bg-indigo-50 rounded-lg hover:bg-indigo-100"
        >
          <Plus className="w-4 h-4" />
          Dodaj još vremena
        </button>
        
        <button
          onClick={handleSubmit}
          className="flex-1 px-6 py-3 text-sm font-medium text-white 
                   bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Izračunaj
        </button>
      </div>
    </div>
  );
}