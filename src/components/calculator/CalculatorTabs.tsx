import React from 'react';
import { Calculator, Beaker, MousePointer, Type, Keyboard, Mic } from 'lucide-react';
import { ButtonCalculator } from './ButtonCalculator';
import { TextCalculator } from './TextCalculator';

type CalculatorMode = 'regular' | 'scientific';
type InputMode = 'buttons' | 'text';

interface CalculatorTabsProps {
  calculatorMode: CalculatorMode;
  inputMode: InputMode;
  onCalculatorModeChange: (mode: CalculatorMode) => void;
  onInputModeChange: (mode: InputMode) => void;
}

export function CalculatorTabs({ 
  calculatorMode, 
  inputMode, 
  onCalculatorModeChange, 
  onInputModeChange 
}: CalculatorTabsProps) {
  
  const calculatorModes = [
    {
      id: 'regular' as CalculatorMode,
      label: 'Osnovni Kalkulator',
      icon: <Calculator className="w-5 h-5" />,
      description: 'Osnovne matematičke operacije'
    },
    {
      id: 'scientific' as CalculatorMode,
      label: 'Znanstveni Kalkulator',
      icon: <Beaker className="w-5 h-5" />,
      description: 'Napredne matematičke funkcije'
    }
  ];

  const inputModes = [
    {
      id: 'buttons' as InputMode,
      label: 'Gumbovi',
      icon: <MousePointer className="w-5 h-5" />,
      description: 'Kliknite gumbove za unos'
    },
    {
      id: 'text' as InputMode,
      label: 'Tekstualni Unos',
      icon: <Type className="w-5 h-5" />,
      description: 'Tipkajte ili govorite izraze'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Compact Mode Selection */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Calculator Mode Toggle */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-gray-700">Tip:</span>
            <div className="flex bg-gray-100 rounded-xl p-1">
              {calculatorModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => onCalculatorModeChange(mode.id)}
                  className={`
                    flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200
                    ${calculatorMode === mode.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}
                  `}
                  title={mode.description}
                >
                  <span className="mr-2">{mode.icon}</span>
                  {mode.id === 'regular' ? 'Osnovni' : 'Znanstveni'}
                </button>
              ))}
            </div>
          </div>

          {/* Input Mode Toggle */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-gray-700">Unos:</span>
            <div className="flex bg-gray-100 rounded-xl p-1">
              {inputModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => onInputModeChange(mode.id)}
                  className={`
                    flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200
                    ${inputMode === mode.id
                      ? 'bg-green-500 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}
                  `}
                  title={mode.description}
                >
                  <span className="mr-2">{mode.icon}</span>
                  {mode.id === 'buttons' ? 'Gumbovi' : 'Tekst/Glas'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Interface */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        {/* Calculator Component */}
        {inputMode === 'buttons' ? (
          <ButtonCalculator isScientific={calculatorMode === 'scientific'} />
        ) : (
          <TextCalculator isScientific={calculatorMode === 'scientific'} />
        )}
      </div>

      {/* Compact Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <Keyboard className="w-4 h-4" />
            <span><strong>Tipkovnica:</strong> 0-9, +, -, *, /, Enter, Escape</span>
          </div>
          <div className="flex items-center space-x-1">
            <Mic className="w-4 h-4" />
            <span><strong>Glas:</strong> "25 plus 37", "korijen od 144"</span>
          </div>
          <div className="flex items-center space-x-1">
            <Type className="w-4 h-4" />
            <span><strong>Tekst:</strong> Prirodni jezik na hrvatskom/engleskom</span>
          </div>
        </div>
      </div>
    </div>
  );
}
