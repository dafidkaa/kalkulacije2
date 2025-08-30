import React, { useState, useEffect, useCallback } from 'react';
import { Delete, RotateCcw } from 'lucide-react';
import {
  CalculatorState,
  initialState,
  inputNumber,
  inputOperation,
  calculate,
  clearAll,
  clearEntry,
  inputDecimal,
  performScientificOperation,
  memoryStore,
  memoryRecall,
  memoryClear,
  memoryAdd,
  memorySubtract,
  keyboardMap
} from '../../utils/calculatorLogic';

interface ButtonCalculatorProps {
  isScientific: boolean;
}

export function ButtonCalculator({ isScientific }: ButtonCalculatorProps) {
  const [state, setState] = useState<CalculatorState>({ ...initialState, isScientific });
  const [showScientific, setShowScientific] = useState(isScientific);

  // Handle keyboard input
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const key = event.key;
    const mappedKey = keyboardMap[key];
    
    if (mappedKey) {
      event.preventDefault();
      handleButtonClick(mappedKey);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleButtonClick = (value: string) => {
    if (value >= '0' && value <= '9') {
      setState(prevState => inputNumber(prevState, value));
    } else if (['+', '-', '*', '/', '×', '÷'].includes(value)) {
      setState(prevState => inputOperation(prevState, value));
    } else if (value === '=') {
      setState(prevState => calculate(prevState));
    } else if (value === 'AC') {
      setState(clearAll());
    } else if (value === 'CE') {
      setState(prevState => clearEntry(prevState));
    } else if (value === '.') {
      setState(prevState => inputDecimal(prevState));
    } else if (value === '+/-') {
      setState(prevState => ({
        ...prevState,
        display: String(-parseFloat(prevState.display))
      }));
    } else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'square', 'factorial'].includes(value)) {
      setState(prevState => performScientificOperation(prevState, value));
    } else if (value === 'MS') {
      setState(prevState => memoryStore(prevState));
    } else if (value === 'MR') {
      setState(prevState => memoryRecall(prevState));
    } else if (value === 'MC') {
      setState(prevState => memoryClear(prevState));
    } else if (value === 'M+') {
      setState(prevState => memoryAdd(prevState));
    } else if (value === 'M-') {
      setState(prevState => memorySubtract(prevState));
    }
  };

  const formatDisplay = (value: string): string => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    
    // Format large numbers with scientific notation
    if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
      return num.toExponential(6);
    }
    
    // Format normal numbers
    return num.toString();
  };

  const regularButtons = [
    ['AC', 'CE', '+/-', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const scientificButtons = [
    ['sin', 'cos', 'tan', 'log'],
    ['ln', 'sqrt', 'square', 'factorial'],
    ['MS', 'MR', 'MC', 'M+', 'M-']
  ];

  return (
    <div className="space-y-6">
      {/* Display */}
      <div className="bg-gray-900 text-white p-6 rounded-2xl">
        <div className="text-right">
          <div className="text-3xl md:text-4xl font-mono font-light min-h-[3rem] flex items-center justify-end break-all">
            {formatDisplay(state.display)}
          </div>
          {state.memory !== 0 && (
            <div className="text-sm text-gray-300 mt-2 flex items-center justify-end">
              <span className="bg-blue-500 px-2 py-1 rounded text-xs">M: {state.memory}</span>
            </div>
          )}
        </div>
      </div>

      <div className={`grid gap-6 ${showScientific && isScientific ? 'lg:grid-cols-5' : 'grid-cols-1'} max-w-2xl mx-auto`}>
        {/* Scientific Functions (if enabled) */}
        {showScientific && isScientific && (
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-700 text-sm">Znanstvene Funkcije</h4>
              <button
                onClick={() => setShowScientific(false)}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors duration-200"
              >
                Sakrij
              </button>
            </div>
            {scientificButtons.map((row, rowIndex) => (
              <div key={rowIndex} className={`grid gap-2 ${rowIndex === 2 ? 'grid-cols-5' : 'grid-cols-4'}`}>
                {row.map((button) => (
                  <button
                    key={button}
                    onClick={() => handleButtonClick(button)}
                    className="h-12 bg-purple-100 hover:bg-purple-200 active:bg-purple-300 text-purple-800 font-semibold rounded-xl transition-colors duration-150 text-sm"
                  >
                    {button}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Main Calculator */}
        <div className={`${showScientific && isScientific ? 'lg:col-span-3' : 'col-span-1'} space-y-3`}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-700 text-sm">Kalkulator</h4>
            {isScientific && !showScientific && (
              <button
                onClick={() => setShowScientific(true)}
                className="text-xs px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors duration-200 font-medium"
              >
                + Znanstvene funkcije
              </button>
            )}
          </div>
          <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
            {regularButtons.map((row, rowIndex) => (
              row.map((button) => {
                let buttonClass = "h-14 font-semibold rounded-xl transition-colors duration-150 text-lg";

                if (button === '=') {
                  buttonClass += " bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white";
                } else if (['AC', 'CE', '+/-'].includes(button)) {
                  buttonClass += " bg-gray-300 hover:bg-gray-400 active:bg-gray-500 text-gray-800";
                } else if (['+', '-', '×', '÷'].includes(button)) {
                  buttonClass += " bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white";
                } else if (button === '0') {
                  buttonClass += " col-span-2 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800";
                } else {
                  buttonClass += " bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800";
                }

                return (
                  <button
                    key={`${rowIndex}-${button}`}
                    onClick={() => handleButtonClick(button)}
                    className={buttonClass}
                  >
                    {button}
                  </button>
                );
              })
            ))}
          </div>
        </div>
      </div>

      {/* History */}
      {state.history.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-700 text-sm">Povijest Izračuna</h4>
            <button
              onClick={() => setState(prevState => ({ ...prevState, history: [] }))}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title="Obriši povijest"
            >
              <Delete className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2 max-h-24 overflow-y-auto">
            {state.history.slice(-3).map((calculation, index) => (
              <div key={index} className="text-sm text-gray-700 font-mono bg-white p-2 rounded-lg">
                {calculation}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
