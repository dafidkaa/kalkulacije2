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
    const prompt = `You are a precise mathematical calculator. Calculate the following expression and return ONLY the numerical result, nothing else. No explanations, no text, just the number.

Expression: ${expression}

Important rules:
- Return only the numerical result
- Use standard mathematical notation
- For trigonometric functions, assume degrees unless specified
- For percentages, convert to decimal (e.g., 15% = 0.15)
- Round to maximum 10 decimal places
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
    'kvadratni korijen': 'square root',
    'korijen': 'square root',
    'sinus': 'sin',
    'kosinus': 'cos',
    'tangens': 'tan',
    'logaritam': 'log',
    'prirodni logaritam': 'ln',
    'na kvadrat': '^2',
    'na kub': '^3',
    'faktoriјal': '!',
    'posto': '%',
    'postotak': '%',
    'od': 'of',
    'plus': '+',
    'minus': '-',
    'puta': '*',
    'pomnoženo': '*',
    'podijeljeno': '/',
    'jednako': '=',
    'koliko je': '',
    'što je': '',
    'izračunaj': '',
    'calculate': '',
    'what is': '',
  };

  // Apply replacements
  Object.entries(replacements).forEach(([croatian, english]) => {
    const regex = new RegExp(`\\b${croatian}\\b`, 'gi');
    formatted = formatted.replace(regex, english);
  });

  // Clean up extra spaces
  formatted = formatted.replace(/\s+/g, ' ').trim();
  
  // Remove question marks and other punctuation
  formatted = formatted.replace(/[?!.]+$/, '');
  
  return formatted;
}
