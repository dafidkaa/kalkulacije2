import React, { useState } from 'react';
import { GradientCard } from '../GradientCard';
import { calculatePercentage, parseTextInput } from '../../utils/percentageCalculator';

const DefaultTextHelp = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium text-gray-700">Kako Koristiti Tekstualni Kalkulator</h3>
    <p className="text-gray-600">
      Unesite svoj upit prirodnim jezikom. Na primjer:
    </p>
    <ul className="space-y-2 text-gray-600">
      <li>• "Koliko je 20% od 150?"</li>
      <li>• "Koji postotak je 30 od 120?"</li>
      <li>• "Povećanje sa 50 na 75?"</li>
      <li>• "100 povećano za 20%"</li>
      <li>• "Dodaj 10% na 50"</li>
      <li>• "Oduzmi 15% od 100"</li>
    </ul>
    <div className="mt-6 p-4 bg-orange-50 rounded-lg">
      <p className="text-sm text-orange-800">
        <strong>Pro Tip:</strong> Možete koristiti decimalne brojeve i različite 
        formulacije pitanja. Kalkulator će automatski prepoznati što želite izračunati.
      </p>
    </div>
  </div>
);

export function PercentageForm() {
  const [useText, setUseText] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [textResult, setTextResult] = useState<{ result: number; explanation: string } | null>(null);
  const [calculationType, setCalculationType] = useState<'basic' | 'whatPercent' | 'increase' | 'decrease'>('basic');
  const [value1, setValue1] = useState<number>(100);
  const [value2, setValue2] = useState<number>(20);
  const [result, setResult] = useState<number>(20);

  const handleTextCalculate = () => {
    if (!textInput.trim()) {
      setTextResult(null);
      return;
    }

    try {
      const result = parseTextInput(textInput);
      if (result) {
        setTextResult(result);
      } else {
        setTextResult({
          result: 0,
          explanation: 'Nismo uspjeli prepoznati vaš upit. Pokušajte s drugačijom formulacijom.',
        });
      }
    } catch (error) {
      setTextResult({
        result: 0,
        explanation: 'Nismo uspjeli prepoznati vaš upit. Pokušajte s drugačijom formulacijom.',
      });
    }
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
    if (!e.target.value.trim()) {
      setTextResult(null);
    }
  };

  const handleStandardCalculate = () => {
    const result = calculatePercentage(calculationType, value1, value2);
    setResult(result);
  };

  React.useEffect(() => {
    handleStandardCalculate();
  }, [calculationType, value1, value2]);

  const inputClasses = `
    block w-full rounded-lg 
    border-2 border-gray-200 
    focus:border-orange-500 focus:ring-orange-500
    shadow-sm hover:border-gray-300
    text-base py-3 px-4
    transition-colors duration-200
  `;

  return (
    <div className="space-y-8">
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            setUseText(false);
            setTextResult(null);
          }}
          className={`
            px-6 py-3 rounded-lg text-base font-medium
            transition-all duration-200
            ${!useText
              ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
          `}
        >
          Standardni Izračun
        </button>
        <button
          onClick={() => setUseText(true)}
          className={`
            px-6 py-3 rounded-lg text-base font-medium
            transition-all duration-200
            ${useText
              ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
          `}
        >
          Tekstualni Izračun
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <GradientCard>
          {useText ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Unesite Vaš Upit
                </label>
                <textarea
                  value={textInput}
                  onChange={handleTextInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleTextCalculate();
                    }
                  }}
                  className={`${inputClasses} h-32 resize-none`}
                  placeholder="Npr: Koliko je 20% od 150?"
                />
              </div>
              <button
                onClick={handleTextCalculate}
                className="w-full py-3 px-4 bg-orange-600 text-white rounded-lg
                         hover:bg-orange-700 transition-colors duration-200"
              >
                Izračunaj
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { type: 'basic', label: 'X% od Y' },
                  { type: 'whatPercent', label: 'X je koji % od Y' },
                  { type: 'increase', label: 'Povećaj za X%' },
                  { type: 'decrease', label: 'Smanji za X%' },
                ].map(({ type, label }) => (
                  <button
                    key={type}
                    onClick={() => setCalculationType(type as any)}
                    className={`
                      py-3 px-4 rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${calculationType === type
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    {calculationType === 'basic' ? 'Postotak (%)' :
                     calculationType === 'whatPercent' ? 'Broj' :
                     calculationType === 'increase' ? 'Početni broj' :
                     'Početni broj'}
                  </label>
                  <input
                    type="number"
                    value={value1}
                    onChange={(e) => setValue1(parseFloat(e.target.value) || 0)}
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    {calculationType === 'basic' ? 'Broj' :
                     calculationType === 'whatPercent' ? 'Od broja' :
                     calculationType === 'increase' ? 'Postotak povećanja (%)' :
                     'Postotak smanjenja (%)'}
                  </label>
                  <input
                    type="number"
                    value={value2}
                    onChange={(e) => setValue2(parseFloat(e.target.value) || 0)}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>
          )}
        </GradientCard>

        <GradientCard>
          {useText ? (
            textInput.trim() ? (
              textResult && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Rezultat</h2>
                  <p className="text-gray-600">{textResult.explanation}</p>
                  <p className="text-3xl font-bold text-orange-500">
                    {textResult.result.toLocaleString('hr-HR', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2
                    })}
                    {textResult.explanation.includes('posto') ? '%' : ''}
                  </p>
                </div>
              )
            ) : (
              <DefaultTextHelp />
            )
          ) : (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Rezultat</h2>
              <p className="text-3xl font-bold text-orange-500">
                {result.toLocaleString('hr-HR', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                })}
                {calculationType === 'whatPercent' ? '%' : ''}
              </p>
            </div>
          )}
        </GradientCard>
      </div>
    </div>
  );
}