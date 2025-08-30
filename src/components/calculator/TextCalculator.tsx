import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, History, Trash2, Brain, Loader } from 'lucide-react';
import { parseNaturalLanguageMath, setupVoiceRecognition } from '../../utils/mathParser';
import { calculateWithGroqAI, formatExpressionForAI, isGroqAIAvailable } from '../../utils/groqAI';

interface TextCalculatorProps {
  isScientific: boolean;
}

interface CalculationHistory {
  input: string;
  result: number;
  expression?: string;
  timestamp: Date;
}

export function TextCalculator({ isScientific }: TextCalculatorProps) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isCalculatingWithAI, setIsCalculatingWithAI] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Setup voice recognition
    recognitionRef.current = setupVoiceRecognition(
      (transcript) => {
        setInput(transcript);
        setIsListening(false);
        // Auto-calculate after voice input
        setTimeout(() => handleCalculate(transcript), 100);
      },
      (error) => {
        setError(error);
        setIsListening(false);
      }
    );

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) {
      setError('Prepoznavanje govora nije dostupno');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setError(null);
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleCalculate = (inputText?: string) => {
    const textToCalculate = inputText || input;
    if (!textToCalculate.trim()) {
      setError('Unesite matematički izraz');
      return;
    }

    setError(null);
    const parseResult = parseNaturalLanguageMath(textToCalculate);

    if (parseResult.success && parseResult.result !== undefined) {
      setResult(parseResult.result);

      // Add to history
      const newCalculation: CalculationHistory = {
        input: textToCalculate,
        result: parseResult.result,
        expression: parseResult.expression,
        timestamp: new Date()
      };

      setHistory(prev => [newCalculation, ...prev].slice(0, 20)); // Keep last 20 calculations
    } else {
      setError(parseResult.error || 'Greška u izračunu');
      setResult(null);
    }
  };

  const handleCalculateWithAI = async () => {
    if (!input.trim()) return;

    setIsCalculatingWithAI(true);
    setError(null);

    try {
      const formattedExpression = formatExpressionForAI(input);
      const aiResult = await calculateWithGroqAI(formattedExpression);

      if (aiResult.success && aiResult.result) {
        const numericResult = parseFloat(aiResult.result);
        setResult(numericResult);
        setError(null);

        // Add to history
        const newCalculation: CalculationHistory = {
          input: input + ' (AI)',
          result: numericResult,
          expression: formattedExpression,
          timestamp: new Date()
        };

        setHistory(prev => [newCalculation, ...prev].slice(0, 20));
      } else {
        setError(aiResult.error || 'AI nije mogao riješiti izraz');
      }
    } catch (error) {
      setError('Greška u komunikaciji s AI servisom');
    } finally {
      setIsCalculatingWithAI(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleHistoryItemClick = (calculation: CalculationHistory) => {
    setInput(calculation.input);
    setResult(calculation.result);
    setError(null);
    setShowHistory(false);
  };

  const clearHistory = () => {
    setHistory([]);
    setShowHistory(false);
  };

  const formatResult = (value: number): string => {
    // Format large numbers with scientific notation
    if (Math.abs(value) >= 1e10 || (Math.abs(value) < 1e-6 && value !== 0)) {
      return value.toExponential(6);
    }
    
    // Format normal numbers with appropriate decimal places
    if (Number.isInteger(value)) {
      return value.toString();
    }
    
    return parseFloat(value.toFixed(10)).toString();
  };

  const exampleQueries = isScientific ? [
    "kvadratni korijen od 144",
    "sinus od 30 stupnjeva",
    "logaritam od 100",
    "2 na treću",
    "faktoriјal od 5"
  ] : [
    "25 plus 37",
    "100 minus 23",
    "15 puta 8",
    "144 podijeljeno s 12",
    "15 posto od 200"
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Input Section */}
      <div className="space-y-3">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Unesite matematički izraz ili kliknite mikrofon..."
            className="w-full p-4 pr-20 text-lg border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-200"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
            <button
              onClick={handleVoiceToggle}
              className={`p-2 rounded-xl transition-colors duration-200 ${
                isListening
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
              title={isListening ? 'Zaustaviti slušanje' : 'Počni govoriti'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button
              onClick={() => handleCalculate()}
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors duration-200"
              title="Izračunaj"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isListening && (
          <div className="flex items-center justify-center p-3 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center space-x-3 text-red-700">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Slušam... Govorite svoj matematički izraz</span>
            </div>
          </div>
        )}
      </div>

      {/* Result Section */}
      <div className="bg-gray-900 text-white p-6 rounded-2xl">
        <div className="text-right">
          {error ? (
            <div className="space-y-4">
              <div className="text-red-400 text-lg">{error}</div>
              {isGroqAIAvailable() && (
                <div className="flex justify-end">
                  <button
                    onClick={handleCalculateWithAI}
                    disabled={isCalculatingWithAI}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-xl transition-colors duration-200"
                  >
                    {isCalculatingWithAI ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Brain className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {isCalculatingWithAI ? 'AI računa...' : 'Pokušaj s AI'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          ) : result !== null ? (
            <div className="text-3xl md:text-4xl font-mono font-light">{formatResult(result)}</div>
          ) : (
            <div className="text-gray-400 text-lg">Unesite izraz za izračun</div>
          )}
        </div>
      </div>

      {/* Examples */}
      <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
        <h4 className="font-semibold text-blue-900 mb-3 text-sm">Primjeri izraza:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {exampleQueries.slice(0, 4).map((example, index) => (
            <button
              key={index}
              onClick={() => {
                setInput(example);
                handleCalculate(example);
              }}
              className="text-sm px-3 py-2 text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-50 rounded-xl transition-colors duration-200 border border-blue-200 hover:border-blue-300 text-left"
            >
              "{example}"
            </button>
          ))}
        </div>
      </div>

      {/* History Section */}
      {history.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              <History className="w-5 h-5" />
              <span>Povijest izračuna ({history.length})</span>
            </button>
            <button
              onClick={clearHistory}
              className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Obriši sve</span>
            </button>
          </div>

          {showHistory && (
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 max-h-40 overflow-y-auto">
              <div className="space-y-2">
                {history.slice(0, 5).map((calculation, index) => (
                  <button
                    key={index}
                    onClick={() => handleHistoryItemClick(calculation)}
                    className="w-full text-left p-3 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                  >
                    <div className="text-sm text-gray-900 truncate font-medium">{calculation.input}</div>
                    <div className="text-blue-600 font-mono text-lg mt-1">{formatResult(calculation.result)}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {calculation.timestamp.toLocaleTimeString('hr-HR')}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}


    </div>
  );
}
