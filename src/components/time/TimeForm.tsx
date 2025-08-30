import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { GradientCard } from '../GradientCard';
import { calculateTimeDifference } from '../../utils/timeCalculator';
import { TimeArithmeticInput } from './TimeArithmeticInput';
import { TimeIntervalInput } from './TimeIntervalInput';
import { TimeConversionInput } from './TimeConversionInput';

type CalculationType = 'arithmetic' | 'interval' | 'conversion';

interface TimeFormProps {
  calculationType?: CalculationType;
  onCalculationTypeChange?: (type: CalculationType) => void;
}

export function TimeForm({ calculationType: externalCalculationType, onCalculationTypeChange }: TimeFormProps) {
  const [internalCalculationType, setInternalCalculationType] = useState<CalculationType>('arithmetic');

  const calculationType = externalCalculationType || internalCalculationType;
  const [result, setResult] = useState<{ mainResult: string; breakdown?: Record<string, string> } | null>(null);

  const handleCalculationTypeChange = (type: CalculationType) => {
    if (onCalculationTypeChange) {
      onCalculationTypeChange(type);
    } else {
      setInternalCalculationType(type);
    }
    setResult(null); // Reset result when switching calculator type
  };

  const handleArithmeticCalculate = (entries: any[]) => {
    const result = calculateTimeDifference(entries, 'arithmetic');
    setResult(result);
  };

  const handleIntervalCalculate = (startDate: string, endDate: string) => {
    const result = calculateTimeDifference({ startDate, endDate }, 'interval');
    setResult(result);
  };

  const handleConversionCalculate = (amount: number, from: string, to: string) => {
    const result = calculateTimeDifference({ amount, from, to }, 'conversion');
    setResult(result);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => handleCalculationTypeChange('arithmetic')}
          className={`
            py-3 px-4 rounded-lg text-sm font-medium
            transition-all duration-200
            ${calculationType === 'arithmetic'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
          `}
        >
          Zbrajanje Vremena
        </button>
        <button
          onClick={() => handleCalculationTypeChange('interval')}
          className={`
            py-3 px-4 rounded-lg text-sm font-medium
            transition-all duration-200
            ${calculationType === 'interval'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
          `}
        >
          Vremenski Interval
        </button>
        <button
          onClick={() => handleCalculationTypeChange('conversion')}
          className={`
            py-3 px-4 rounded-lg text-sm font-medium
            transition-all duration-200
            ${calculationType === 'conversion'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
          `}
        >
          Pretvaranje Vremena
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <GradientCard>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {calculationType === 'arithmetic' && 'Zbrajanje i Oduzimanje Vremena'}
              {calculationType === 'interval' && 'Izračun Vremenskog Intervala'}
              {calculationType === 'conversion' && 'Pretvaranje Vremenskih Jedinica'}
            </h2>

            {calculationType === 'arithmetic' && (
              <TimeArithmeticInput onCalculate={handleArithmeticCalculate} />
            )}
            {calculationType === 'interval' && (
              <TimeIntervalInput onCalculate={handleIntervalCalculate} />
            )}
            {calculationType === 'conversion' && (
              <TimeConversionInput onCalculate={handleConversionCalculate} />
            )}
          </div>
        </GradientCard>

        <GradientCard>
          {result ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Rezultat</h2>
              <p className="text-2xl font-bold text-indigo-600">{result.mainResult}</p>
              {result.breakdown && (
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-medium text-gray-700">Detaljna Razrada</h3>
                  {Object.entries(result.breakdown).map(([label, value]) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-gray-600">{label}:</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 space-y-6">
              <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Unesite vrijednosti i kliknite "Izračunaj"</p>
              
              <div className="text-left p-4 bg-gray-50 rounded-lg">
                {calculationType === 'arithmetic' && (
                  <>
                    <h3 className="font-medium text-gray-900 mb-2">Kako koristiti zbrajanje vremena:</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Odaberite + za dodavanje ili - za oduzimanje vremena</li>
                      <li>• Unesite sate, minute i sekunde za svaki vremenski period</li>
                      <li>• Dodajte više vremenskih perioda pomoću gumba ispod</li>
                      <li>• Rezultat će pokazati ukupno vrijeme nakon svih operacija</li>
                    </ul>
                  </>
                )}

                {calculationType === 'interval' && (
                  <>
                    <h3 className="font-medium text-gray-900 mb-2">Kako koristiti vremenski interval:</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Odaberite početni datum i vrijeme</li>
                      <li>• Odaberite završni datum i vrijeme</li>
                      <li>• Kalkulator će izračunati točno trajanje između ta dva trenutka</li>
                      <li>• Rezultat uključuje godine, mjesece, dane, sate, minute i sekunde</li>
                    </ul>
                  </>
                )}

                {calculationType === 'conversion' && (
                  <>
                    <h3 className="font-medium text-gray-900 mb-2">Kako koristiti pretvaranje vremena:</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Unesite količinu koju želite pretvoriti</li>
                      <li>• Odaberite početnu jedinicu (iz)</li>
                      <li>• Odaberite željenu jedinicu (u)</li>
                      <li>• Rezultat će prikazati pretvorenu vrijednost s detaljnom razradom</li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}
        </GradientCard>
      </div>
    </div>
  );
}