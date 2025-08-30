// Groq AI integration for mathematical calculations
export interface GroqResponse {
  success: boolean;
  result?: string;
  error?: string;
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Note: In production, this should be stored securely as an environment variable
// For now, we'll use a placeholder that needs to be replaced
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

export async function calculateWithGroqAI(expression: string): Promise<GroqResponse> {
  if (!GROQ_API_KEY) {
    return {
      success: false,
      error: 'Groq API ključ nije konfiguriran. Molimo kontaktirajte administratora.'
    };
  }

  try {
    const prompt = `You are a precise mathematical calculator that can solve both mathematical expressions and practical word problems. Calculate the following and return ONLY the numerical result, nothing else. No explanations, no text, just the number.

Expression: ${expression}

Important rules:
- Return only the numerical result
- Use standard mathematical notation
- For trigonometric functions, assume degrees unless specified
- For percentage calculations:
  * "X percent of Y" = (X * Y) / 100
  * "increase X by Y percent" = X * (1 + Y/100)
  * "decrease X by Y percent" = X * (1 - Y/100)
  * "what percent is X of Y" = (X / Y) * 100
- For practical calculations:
  * Fuel consumption: (liters / kilometers) * 100 = liters per 100km
  * Speed: distance / time = speed
  * Unit conversions: apply appropriate conversion factors
- For word problems, extract the numbers and apply the correct formula
- Round to maximum 4 decimal places for readability
- If the expression is invalid or cannot be calculated, return "ERROR"

Result:`;

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 100,
        top_p: 1,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: `Groq API greška: ${response.status} - ${errorData.error?.message || 'Nepoznata greška'}`
      };
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return {
        success: false,
        error: 'Nevaljan odgovor od Groq API-ja'
      };
    }

    const result = data.choices[0].message.content.trim();
    
    // Validate that the result is a number or ERROR
    if (result === 'ERROR') {
      return {
        success: false,
        error: 'AI nije mogao izračunati izraz'
      };
    }

    // Check if result is a valid number
    const numericResult = parseFloat(result);
    if (isNaN(numericResult)) {
      return {
        success: false,
        error: 'AI je vratio nevaljan rezultat'
      };
    }

    return {
      success: true,
      result: result
    };

  } catch (error) {
    console.error('Groq AI Error:', error);
    return {
      success: false,
      error: 'Greška u komunikaciji s AI servisom'
    };
  }
}

// Function to check if Groq AI is available
export function isGroqAIAvailable(): boolean {
  return !!GROQ_API_KEY;
}

// Function to format mathematical expressions for better AI understanding
export function formatExpressionForAI(expression: string): string {
  let formatted = expression.toLowerCase().trim();

  // Replace common Croatian mathematical terms with English
  const replacements: { [key: string]: string } = {
    // Mathematical functions
    'kvadratni korijen': 'square root',
    'korijen': 'square root',
    'sinus': 'sin',
    'kosinus': 'cos',
    'tangens': 'tan',
    'logaritam': 'log',
    'prirodni logaritam': 'ln',
    'na kvadrat': '^2',
    'na kub': '^3',
    'stepenovan': 'to the power of',
    'faktoriјal': '!',

    // Percentages and calculations
    'posto': 'percent',
    'postotak': 'percent',
    'postotaka': 'percent',
    'od': 'of',
    'iz': 'of',
    'sa': 'from',
    'do': 'to',
    'na': 'to',

    // Basic operations
    'plus': '+',
    'dodaj': 'add',
    'dodati': 'add',
    'zbroj': 'sum',
    'minus': '-',
    'oduzmi': 'subtract',
    'oduzeti': 'subtract',
    'razlika': 'difference',
    'puta': 'times',
    'krat': 'times',
    'pomnoženo': 'multiplied by',
    'množiti': 'multiply',
    'umnožak': 'product',
    'podijeljeno': 'divided by',
    'podijeliti': 'divide',
    'kroz': 'divided by',
    'količnik': 'quotient',
    'jednako': 'equals',
    'je': 'is',
    'iznosi': 'equals',
    'čini': 'equals',

    // Question words and phrases
    'koliko je': 'what is',
    'što je': 'what is',
    'koliko': 'what',
    'koji': 'what',
    'kakav': 'what',
    'kako': 'how',

    // Percentage operations
    'povećaj': 'increase',
    'povećati': 'increase',
    'uvećaj': 'increase',
    'rast': 'increase',
    'porast': 'increase',
    'smanji': 'decrease',
    'smanjiti': 'decrease',
    'umanji': 'decrease',
    'pad': 'decrease',
    'smanjenje': 'decrease',
    'za': 'by',

    // Practical terms
    'litara': 'liters',
    'litr': 'liters',
    'kilometara': 'kilometers',
    'km': 'kilometers',
    'sati': 'hours',
    'sat': 'hour',
    'brzina': 'speed',
    'potrošnja': 'consumption',
    'gorivo': 'fuel',
    'benzin': 'petrol',
    'nafta': 'diesel',
    'napunio': 'filled',
    'natočio': 'filled',
    'prešao': 'traveled',
    'prošao': 'traveled',
    'vozio': 'drove',

    // Commands
    'izračunaj': 'calculate',
    'calculate': 'calculate',
    'what is': 'what is',
  };

  // Apply replacements
  Object.entries(replacements).forEach(([croatian, english]) => {
    const regex = new RegExp(`\\b${croatian}\\b`, 'gi');
    formatted = formatted.replace(regex, english);
  });

  // Handle specific practical calculation patterns

  // Fuel consumption pattern: "auto sa X l goriva i prešao Y km"
  const fuelConsumptionRegex = /(?:auto|car|vehicle|vozilo|automobil).*?(\d+(?:\.\d+)?)\s*(?:l|liter|litr).*?(?:goriva|fuel|benzina|nafta).*?(?:prešao|prošao|traveled|crossed|vozio).*?(\d+(?:\.\d+)?)\s*(?:km|kilometer).*?(?:troši|consumption|potrošnja|potroši)/gi;
  if (fuelConsumptionRegex.test(formatted)) {
    const match = formatted.match(/(\d+(?:\.\d+)?)\s*(?:l|liter|litr).*?(\d+(?:\.\d+)?)\s*(?:km|kilometer)/i);
    if (match) {
      const liters = match[1];
      const kilometers = match[2];
      formatted = `fuel consumption calculation: car used ${liters} liters for ${kilometers} km, calculate consumption per 100 km using formula (${liters} / ${kilometers}) * 100`;
    }
  }

  // Speed calculation: "X km in Y hours, what is speed"
  const speedRegex = /(\d+(?:\.\d+)?)\s*(?:km|kilometer).*?(\d+(?:\.\d+)?)\s*(?:h|hour|sat|sati).*?(?:speed|brzina)/gi;
  if (speedRegex.test(formatted)) {
    const match = formatted.match(/(\d+(?:\.\d+)?)\s*(?:km|kilometer).*?(\d+(?:\.\d+)?)\s*(?:h|hour|sat|sati)/i);
    if (match) {
      const distance = match[1];
      const time = match[2];
      formatted = `speed calculation: ${distance} km in ${time} hours`;
    }
  }

  // Unit conversion patterns
  formatted = formatted.replace(/(\d+(?:\.\d+)?)\s*(?:km|kilometer)\s*(?:to|u|na)\s*(?:m|meter|metr)/gi, '$1 * 1000');
  formatted = formatted.replace(/(\d+(?:\.\d+)?)\s*(?:m|meter|metr)\s*(?:to|u|na)\s*(?:cm|centimeter|centimetr)/gi, '$1 * 100');

  // Clean up extra spaces
  formatted = formatted.replace(/\s+/g, ' ').trim();

  // Remove question marks and other punctuation
  formatted = formatted.replace(/[?!.]+$/, '');

  return formatted;
}
