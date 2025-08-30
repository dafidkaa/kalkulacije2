// Type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Natural language math expression parser
export interface ParseResult {
  success: boolean;
  result?: number;
  expression?: string;
  error?: string;
}

// Word to number mapping
const wordToNumber: { [key: string]: number } = {
  'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
  'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
  'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
  'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19, 'twenty': 20,
  'thirty': 30, 'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70,
  'eighty': 80, 'ninety': 90, 'hundred': 100, 'thousand': 1000, 'million': 1000000,
  // Croatian numbers
  'nula': 0, 'jedan': 1, 'dva': 2, 'tri': 3, 'četiri': 4, 'pet': 5,
  'šest': 6, 'sedam': 7, 'osam': 8, 'devet': 9, 'deset': 10,
  'jedanaest': 11, 'dvanaest': 12, 'trinaest': 13, 'četrnaest': 14, 'petnaest': 15,
  'šesnaest': 16, 'sedamnaest': 17, 'osamnaest': 18, 'devetnaest': 19, 'dvadeset': 20,
  'trideset': 30, 'četrdeset': 40, 'pedeset': 50, 'šezdeset': 60, 'sedamdeset': 70,
  'osamdeset': 80, 'devedeset': 90, 'sto': 100, 'tisuću': 1000, 'tisuća': 1000, 'tisuca': 1000,
  'milijun': 1000000, 'milijuna': 1000000, 'milijunu': 1000000, 'milijunom': 1000000,
  'milijard': 1000000000, 'milijarda': 1000000000, 'milijardu': 1000000000, 'milijardom': 1000000000,
};

// Operation mapping
const operationWords: { [key: string]: string } = {
  // English
  'plus': '+', 'add': '+', 'added to': '+', 'sum': '+', 'total': '+',
  'minus': '-', 'subtract': '-', 'subtracted from': '-', 'less': '-', 'difference': '-',
  'times': '*', 'multiply': '*', 'multiplied by': '*', 'product': '*',
  'divide': '/', 'divided by': '/', 'over': '/', 'quotient': '/',
  'equals': '=', 'is': '=', 'equal to': '=',
  'percent': '%', 'percentage': '%', 'percent of': '%',
  'square root': 'sqrt', 'sqrt': 'sqrt', 'root': 'sqrt',
  'squared': '^2', 'cubed': '^3', 'power': '^', 'to the power of': '^',
  'sine': 'sin', 'cosine': 'cos', 'tangent': 'tan',
  'arcsine': 'asin', 'arccosine': 'acos', 'arctangent': 'atan',
  'logarithm': 'log', 'natural log': 'ln', 'log base 2': 'log2',
  'exponential': 'exp', 'absolute': 'abs', 'ceiling': 'ceil', 'floor': 'floor',
  // Croatian
  'dodaj': '+', 'zbrojiti': '+', 'zbroj': '+', 'uvećaj': '+', 'povećaj': '+',
  'oduzmi': '-', 'oduzeti': '-', 'razlika': '-', 'smanji': '-', 'umanji': '-',
  'puta': '*', 'množiti': '*', 'pomnožiti': '*', 'umnožak': '*', 'krat': '*',
  'podijeli': '/', 'podijeliti': '/', 'količnik': '/', 'kroz': '/',
  'jednako': '=', 'je': '=', 'iznosi': '=', 'čini': '=',
  'posto': '%', 'postotak': '%', 'postotaka': '%',
  'kvadratni korijen': 'sqrt', 'korijen': 'sqrt',
  'na kvadrat': '^2', 'na kub': '^3', 'na': '^', 'stepenovan': '^',
  'sinus': 'sin', 'kosinus': 'cos', 'tangens': 'tan',
  'arkus sinus': 'asin', 'arkus kosinus': 'acos', 'arkus tangens': 'atan',
  'logaritam': 'log', 'prirodni logaritam': 'ln', 'logaritam baza 2': 'log2',
  'eksponencijalna': 'exp', 'apsolutna vrijednost': 'abs', 'strop': 'ceil', 'pod': 'floor',
  'od': 'of', 'iz': 'of', 'sa': 'from', 'do': 'to',
  'koliko': 'what', 'što': 'what', 'koji': 'what', 'kakav': 'what',
  'rast': 'increase', 'porast': 'increase', 'pad': 'decrease', 'smanjenje': 'decrease',
};

// Function to convert words to numbers
function convertWordsToNumbers(text: string): string {
  let result = text.toLowerCase();
  
  // Replace word numbers with digits
  Object.entries(wordToNumber).forEach(([word, number]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    result = result.replace(regex, number.toString());
  });
  
  return result;
}

// Function to convert operation words to symbols
function convertOperationsToSymbols(text: string): string {
  let result = text.toLowerCase();
  
  // Sort by length (longest first) to handle multi-word operations
  const sortedOperations = Object.entries(operationWords)
    .sort(([a], [b]) => b.length - a.length);
  
  sortedOperations.forEach(([word, symbol]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    result = result.replace(regex, ` ${symbol} `);
  });
  
  return result;
}

// Function to clean and normalize expression
function normalizeExpression(text: string): string {
  let result = text
    .replace(/\s+/g, ' ') // Multiple spaces to single space
    .trim();

  // Handle scientific notation (e.g., 1e5, 2.5E-3)
  result = result.replace(/(\d+(?:\.\d+)?)[eE]([+-]?\d+)/g, '$1 * Math.pow(10, $2)');

  // Handle implicit multiplication (e.g., 2x, 3(4+5))
  result = result.replace(/(\d+)\s*([a-zA-Z])/g, '$1 * $2');
  result = result.replace(/(\d+)\s*\(/g, '$1 * (');
  result = result.replace(/\)\s*(\d+)/g, ') * $1');
  result = result.replace(/\)\s*\(/g, ') * (');

  // Handle percentage as decimal conversion
  result = result.replace(/(\d+(?:\.\d+)?)\s*%/g, '($1 / 100)');

  return result;
}

// Function to handle percentage calculations
function handlePercentage(expression: string): string {
  let result = expression.toLowerCase();

  // Handle "what is X percent of Y" or "koliko je X posto od Y" -> "X * Y / 100"
  const whatIsPercentOfRegex = /(?:what\s+is\s+|koliko\s+je\s+)?(\d+(?:\.\d+)?)\s*(?:%|posto|postotak)\s*(?:of|od)\s*(\d+(?:\.\d+)?)/gi;
  result = result.replace(whatIsPercentOfRegex, '($1 * $2 / 100)');

  // Handle "X percent of Y" or "X posto od Y" -> "X * Y / 100" (fallback)
  const percentOfRegex = /(\d+(?:\.\d+)?)\s*(?:%|posto|postotak)\s*(?:of|od)\s*(\d+(?:\.\d+)?)/gi;
  result = result.replace(percentOfRegex, '($1 * $2 / 100)');

  // Handle "increase X by Y percent" or "povećaj X za Y posto"
  const increaseRegex = /(?:increase|povećaj|povećati|dodaj)\s*(\d+(?:\.\d+)?)\s*(?:by|za|na)\s*(\d+(?:\.\d+)?)\s*(?:%|posto|postotak)/gi;
  result = result.replace(increaseRegex, '($1 * (1 + $2 / 100))');

  // Handle "decrease X by Y percent" or "smanji X za Y posto"
  const decreaseRegex = /(?:decrease|smanji|smanjiti|oduzmi)\s*(\d+(?:\.\d+)?)\s*(?:by|za|sa)\s*(\d+(?:\.\d+)?)\s*(?:%|posto|postotak)/gi;
  result = result.replace(decreaseRegex, '($1 * (1 - $2 / 100))');

  // Handle "what percent is X of Y" or "koliko posto je X od Y"
  const whatPercentRegex = /(?:what|koliko|koji)\s*(?:percent|posto|postotak)\s*(?:is|je)\s*(\d+(?:\.\d+)?)\s*(?:of|od)\s*(\d+(?:\.\d+)?)/gi;
  result = result.replace(whatPercentRegex, '(($1 / $2) * 100)');

  // Handle "X is what percent of Y" or "X je koliko posto od Y"
  const isWhatPercentRegex = /(\d+(?:\.\d+)?)\s*(?:is|je)\s*(?:what|koliko|koji)\s*(?:percent|posto|postotak)\s*(?:of|od)\s*(\d+(?:\.\d+)?)/gi;
  result = result.replace(isWhatPercentRegex, '(($1 / $2) * 100)');

  // Handle percentage change: "from X to Y, what is the change"
  const percentChangeRegex = /(?:from|od|sa)\s*(\d+(?:\.\d+)?)\s*(?:to|na|do)\s*(\d+(?:\.\d+)?)\s*(?:percent|posto|postotak)?\s*(?:change|promjena|rast|pad)/gi;
  result = result.replace(percentChangeRegex, '((($2 - $1) / $1) * 100)');

  // Handle compound percentage: "X percent of Y percent of Z"
  const compoundPercentRegex = /(\d+(?:\.\d+)?)\s*(?:%|posto|postotak)\s*(?:of|od)\s*(\d+(?:\.\d+)?)\s*(?:%|posto|postotak)\s*(?:of|od)\s*(\d+(?:\.\d+)?)/gi;
  result = result.replace(compoundPercentRegex, '(($1 / 100) * ($2 / 100) * $3)');

  // Handle "add X percent to Y" or "dodaj X posto na Y"
  const addPercentRegex = /(?:add|dodaj)\s*(\d+(?:\.\d+)?)\s*(?:%|posto|postotak)\s*(?:to|na)\s*(\d+(?:\.\d+)?)/gi;
  result = result.replace(addPercentRegex, '($2 * (1 + $1 / 100))');

  // Handle "subtract X percent from Y" or "oduzmi X posto od Y"
  const subtractPercentRegex = /(?:subtract|oduzmi)\s*(\d+(?:\.\d+)?)\s*(?:%|posto|postotak)\s*(?:from|od)\s*(\d+(?:\.\d+)?)/gi;
  result = result.replace(subtractPercentRegex, '($2 * (1 - $1 / 100))');

  // Handle standalone percentages "X percent" -> "X / 100"
  const percentRegex = /(\d+(?:\.\d+)?)\s*(?:%|posto|postotak)(?!\s*(?:of|od|je|is|na|to|from|sa))/gi;
  result = result.replace(percentRegex, '($1 / 100)');

  return result;
}

// Function to handle scientific operations
function handleScientificOperations(expression: string): string {
  let result = expression;

  // Handle square root - more flexible patterns
  result = result.replace(/sqrt\s*\(\s*([^)]+)\s*\)/gi, 'Math.sqrt($1)');
  result = result.replace(/sqrt\s+(\d+(?:\.\d+)?)/gi, 'Math.sqrt($1)');
  result = result.replace(/√\s*(\d+(?:\.\d+)?)/gi, 'Math.sqrt($1)');

  // Handle trigonometric functions (degrees to radians)
  result = result.replace(/sin\s*\(\s*([^)]+)\s*\)/gi, 'Math.sin(($1) * Math.PI / 180)');
  result = result.replace(/cos\s*\(\s*([^)]+)\s*\)/gi, 'Math.cos(($1) * Math.PI / 180)');
  result = result.replace(/tan\s*\(\s*([^)]+)\s*\)/gi, 'Math.tan(($1) * Math.PI / 180)');

  // Handle inverse trigonometric functions (result in degrees)
  result = result.replace(/asin\s*\(\s*([^)]+)\s*\)/gi, 'Math.asin($1) * 180 / Math.PI');
  result = result.replace(/acos\s*\(\s*([^)]+)\s*\)/gi, 'Math.acos($1) * 180 / Math.PI');
  result = result.replace(/atan\s*\(\s*([^)]+)\s*\)/gi, 'Math.atan($1) * 180 / Math.PI');

  // Handle logarithms
  result = result.replace(/log\s*\(\s*([^)]+)\s*\)/gi, 'Math.log10($1)');
  result = result.replace(/ln\s*\(\s*([^)]+)\s*\)/gi, 'Math.log($1)');
  result = result.replace(/log2\s*\(\s*([^)]+)\s*\)/gi, 'Math.log2($1)');

  // Handle exponential
  result = result.replace(/exp\s*\(\s*([^)]+)\s*\)/gi, 'Math.exp($1)');

  // Handle powers - more flexible
  result = result.replace(/(\d+(?:\.\d+)?|\([^)]+\))\s*\^\s*(\d+(?:\.\d+)?|\([^)]+\))/g, 'Math.pow($1, $2)');
  result = result.replace(/(\d+(?:\.\d+)?|\([^)]+\))\s*\*\*\s*(\d+(?:\.\d+)?|\([^)]+\))/g, 'Math.pow($1, $2)');

  // Handle absolute value
  result = result.replace(/abs\s*\(\s*([^)]+)\s*\)/gi, 'Math.abs($1)');

  // Handle ceiling and floor
  result = result.replace(/ceil\s*\(\s*([^)]+)\s*\)/gi, 'Math.ceil($1)');
  result = result.replace(/floor\s*\(\s*([^)]+)\s*\)/gi, 'Math.floor($1)');
  result = result.replace(/round\s*\(\s*([^)]+)\s*\)/gi, 'Math.round($1)');

  // Handle min and max
  result = result.replace(/min\s*\(\s*([^)]+)\s*\)/gi, 'Math.min($1)');
  result = result.replace(/max\s*\(\s*([^)]+)\s*\)/gi, 'Math.max($1)');

  // Handle factorial (simple implementation for small numbers)
  result = result.replace(/(\d+)!/g, (match, num) => {
    const n = parseInt(num);
    if (n > 20) return 'Infinity'; // Prevent overflow
    let factorial = 1;
    for (let i = 2; i <= n; i++) {
      factorial *= i;
    }
    return factorial.toString();
  });

  // Handle constants
  result = result.replace(/\bpi\b/gi, 'Math.PI');
  result = result.replace(/\be\b/gi, 'Math.E');

  // Handle Croatian constants
  result = result.replace(/\bpi\b/gi, 'Math.PI');
  result = result.replace(/\beuler\b/gi, 'Math.E');

  return result;
}

// Function to handle complex word problems
function handleWordProblems(input: string): ParseResult | null {
  const text = input.toLowerCase();

  // Fuel consumption pattern: "auto sa X l goriva i prešao Y km"
  const fuelPattern = /(?:auto|vozilo|automobil).*?(\d+(?:\.\d+)?)\s*(?:l|litar|litr).*?(?:goriva|benzina|nafta).*?(?:prešao|prošao|vozio).*?(\d+(?:\.\d+)?)\s*(?:km|kilometer).*?(?:troši|potrošnja|potroši)/i;
  const fuelMatch = text.match(fuelPattern);

  if (fuelMatch) {
    const liters = parseFloat(fuelMatch[1]);
    const kilometers = parseFloat(fuelMatch[2]);

    if (liters > 0 && kilometers > 0) {
      const consumptionPer100km = (liters / kilometers) * 100;
      return {
        success: true,
        result: consumptionPer100km,
        expression: `(${liters} / ${kilometers}) * 100`
      };
    }
  }

  // Speed calculation pattern: "prešao X km za Y sati"
  const speedPattern = /(?:prešao|prošao|vozio).*?(\d+(?:\.\d+)?)\s*(?:km|kilometer).*?(?:za|u|tijekom).*?(\d+(?:\.\d+)?)\s*(?:h|sat|sati|sata).*?(?:brzina|brzo)/i;
  const speedMatch = text.match(speedPattern);

  if (speedMatch) {
    const distance = parseFloat(speedMatch[1]);
    const time = parseFloat(speedMatch[2]);

    if (distance > 0 && time > 0) {
      const speed = distance / time;
      return {
        success: true,
        result: speed,
        expression: `${distance} / ${time}`
      };
    }
  }

  return null;
}

// Main parsing function
export function parseNaturalLanguageMath(input: string): ParseResult {
  try {
    let expression = input.trim();

    if (!expression) {
      return { success: false, error: 'Prazan unos' };
    }

    // First, try to handle complex word problems
    const wordProblemResult = handleWordProblems(expression);
    if (wordProblemResult) {
      return wordProblemResult;
    }

    // Handle common question patterns first
    expression = expression.replace(/^(what\s+is\s+|calculate\s+|compute\s+|koliko\s+je\s+|što\s+je\s+|izračunaj\s+)/i, '');
    expression = expression.replace(/\?+$/, ''); // Remove question marks

    // Convert words to numbers
    expression = convertWordsToNumbers(expression);

    // Convert operation words to symbols
    expression = convertOperationsToSymbols(expression);

    // Handle percentage calculations (before normalization)
    expression = handlePercentage(expression);

    // Handle scientific operations
    expression = handleScientificOperations(expression);

    // Normalize expression (handles scientific notation, implicit multiplication)
    expression = normalizeExpression(expression);

    // Replace mathematical symbols with operators
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
    expression = expression.replace(/−/g, '-'); // En dash to minus

    // Handle special cases
    if (!expression || expression.trim() === '' || expression === '0') {
      return { success: false, error: 'Nevaljan izraz' };
    }

    // Additional validation for balanced parentheses
    const openParens = (expression.match(/\(/g) || []).length;
    const closeParens = (expression.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      return { success: false, error: 'Neusklađene zagrade' };
    }

    // Evaluate the expression safely
    const result = evaluateExpression(expression);

    if (isNaN(result)) {
      return { success: false, error: 'Nevaljan matematički izraz' };
    }

    if (!isFinite(result)) {
      return { success: false, error: 'Rezultat je beskonačan ili previše velik' };
    }

    return {
      success: true,
      result: result,
      expression: expression
    };

  } catch (error) {
    console.warn('Parsing error:', error);
    return {
      success: false,
      error: 'Greška u parsiranju izraza'
    };
  }
}

// Safe expression evaluator
function evaluateExpression(expression: string): number {
  try {
    // Allow Math functions, numbers, operators, parentheses, and dots
    // This regex allows: Math.function, numbers, +, -, *, /, (, ), ., spaces
    const safeExpression = expression.replace(/[^0-9+\-*/().\sMath]/g, '');

    // Additional safety: ensure only allowed Math functions
    const allowedMathFunctions = [
      'Math.sqrt', 'Math.sin', 'Math.cos', 'Math.tan',
      'Math.asin', 'Math.acos', 'Math.atan', 'Math.atan2',
      'Math.log', 'Math.log10', 'Math.log2', 'Math.exp',
      'Math.pow', 'Math.abs', 'Math.ceil', 'Math.floor', 'Math.round',
      'Math.PI', 'Math.E', 'Math.max', 'Math.min'
    ];

    // Check if expression contains only allowed Math functions
    const mathFunctionRegex = /Math\.[a-zA-Z0-9]+/g;
    const foundFunctions = safeExpression.match(mathFunctionRegex) || [];

    for (const func of foundFunctions) {
      if (!allowedMathFunctions.some(allowed => func.startsWith(allowed))) {
        console.warn(`Potentially unsafe Math function: ${func}`);
        return NaN;
      }
    }

    // Use Function constructor for safer evaluation than eval
    const result = new Function('Math', `return ${safeExpression}`)(Math);

    return Number(result);
  } catch (error) {
    console.warn('Expression evaluation error:', error);
    return NaN;
  }
}

// Voice recognition setup
export function setupVoiceRecognition(
  onResult: (text: string) => void,
  onError: (error: string) => void
): SpeechRecognition | null {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    onError('Prepoznavanje govora nije podržano u ovom pregledniku');
    return null;
  }
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'hr-HR'; // Croatian language
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };
  
  recognition.onerror = (event) => {
    onError(`Greška prepoznavanja govora: ${event.error}`);
  };
  
  return recognition;
}
