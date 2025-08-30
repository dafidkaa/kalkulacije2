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
  'osamdeset': 80, 'devedeset': 90, 'sto': 100, 'tisuću': 1000, 'milijun': 1000000,
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
  'log': 'log', 'logarithm': 'log', 'natural log': 'ln',
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
  return text
    .replace(/\s+/g, ' ') // Multiple spaces to single space
    .replace(/[^\d+\-*/().^%\s]/g, '') // Remove non-math characters
    .trim();
}

// Function to handle percentage calculations
function handlePercentage(expression: string): string {
  let result = expression.toLowerCase();

  // Handle "X percent of Y" or "X posto od Y" -> "X * Y / 100"
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
  // Handle sqrt
  expression = expression.replace(/sqrt\s*\(?\s*(\d+(?:\.\d+)?)\s*\)?/gi, 'Math.sqrt($1)');
  expression = expression.replace(/sqrt\s+(\d+(?:\.\d+)?)/gi, 'Math.sqrt($1)');
  
  // Handle trigonometric functions
  expression = expression.replace(/sin\s*\(?\s*(\d+(?:\.\d+)?)\s*\)?/gi, 'Math.sin($1 * Math.PI / 180)');
  expression = expression.replace(/cos\s*\(?\s*(\d+(?:\.\d+)?)\s*\)?/gi, 'Math.cos($1 * Math.PI / 180)');
  expression = expression.replace(/tan\s*\(?\s*(\d+(?:\.\d+)?)\s*\)?/gi, 'Math.tan($1 * Math.PI / 180)');
  
  // Handle logarithms
  expression = expression.replace(/log\s*\(?\s*(\d+(?:\.\d+)?)\s*\)?/gi, 'Math.log10($1)');
  expression = expression.replace(/ln\s*\(?\s*(\d+(?:\.\d+)?)\s*\)?/gi, 'Math.log($1)');
  
  // Handle powers
  expression = expression.replace(/(\d+(?:\.\d+)?)\s*\^\s*(\d+(?:\.\d+)?)/g, 'Math.pow($1, $2)');
  
  return expression;
}

// Main parsing function
export function parseNaturalLanguageMath(input: string): ParseResult {
  try {
    let expression = input.trim();
    
    if (!expression) {
      return { success: false, error: 'Prazan unos' };
    }
    
    // Convert words to numbers
    expression = convertWordsToNumbers(expression);
    
    // Convert operation words to symbols
    expression = convertOperationsToSymbols(expression);
    
    // Handle percentage calculations
    expression = handlePercentage(expression);
    
    // Handle scientific operations
    expression = handleScientificOperations(expression);
    
    // Normalize expression
    expression = normalizeExpression(expression);
    
    // Handle simple patterns like "what is X + Y"
    expression = expression.replace(/^(what\s+is\s+|calculate\s+|compute\s+)/i, '');
    expression = expression.replace(/\?+$/, ''); // Remove question marks
    
    // Replace × and ÷ with * and /
    expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
    
    if (!expression || expression === '0') {
      return { success: false, error: 'Nevaljan izraz' };
    }
    
    // Evaluate the expression safely
    const result = evaluateExpression(expression);
    
    if (isNaN(result) || !isFinite(result)) {
      return { success: false, error: 'Nevaljan rezultat' };
    }
    
    return {
      success: true,
      result: result,
      expression: expression
    };
    
  } catch (error) {
    return {
      success: false,
      error: 'Greška u parsiranju izraza'
    };
  }
}

// Safe expression evaluator
function evaluateExpression(expression: string): number {
  try {
    // Remove any potentially dangerous characters
    const safeExpression = expression.replace(/[^0-9+\-*/().\s]/g, '');
    
    // Use Function constructor for safer evaluation than eval
    const result = new Function('Math', `return ${safeExpression}`)(Math);
    
    return Number(result);
  } catch {
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
