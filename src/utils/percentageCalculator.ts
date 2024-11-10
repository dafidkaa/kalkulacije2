export type CalculationType = 'basic' | 'whatPercent' | 'increase' | 'decrease';

interface TextCalculationResult {
  result: number;
  explanation: string;
}

export function calculatePercentage(
  type: CalculationType,
  value1: number,
  value2: number
): number {
  switch (type) {
    case 'basic':
      return (value1 * value2) / 100;
    case 'whatPercent':
      return (value1 / value2) * 100;
    case 'increase':
      return value1 * (1 + value2 / 100);
    case 'decrease':
      return value1 * (1 - value2 / 100);
    default:
      return 0;
  }
}

export function parseTextInput(text: string): TextCalculationResult {
  // Convert text to lowercase and remove multiple spaces
  const normalizedText = text.toLowerCase().replace(/\s+/g, ' ').trim();

  // Pattern for "Add X% to Y" or "Dodaj X% na Y"
  if (normalizedText.match(/(?:dodaj|add) (\d+(?:\.\d+)?)%? (?:na|to) (\d+(?:\.\d+)?)/)) {
    const [_, percentage, number] = normalizedText.match(/(?:dodaj|add) (\d+(?:\.\d+)?)%? (?:na|to) (\d+(?:\.\d+)?)/);
    const baseNum = parseFloat(number);
    const percentageNum = parseFloat(percentage);
    const result = baseNum * (1 + percentageNum / 100);
    return {
      result,
      explanation: `${baseNum.toLocaleString('hr-HR')} povećano za ${percentageNum}% iznosi:`,
    };
  }

  // Pattern for "What percentage is X of Y" or "Koji postotak je X od Y"
  if (normalizedText.match(/(?:koji|what|koliki) (?:postotak|percentage) (?:je|is) (\d+(?:\.\d+)?) (?:od|of) (\d+(?:\.\d+)?)/)) {
    const [_, number, total] = normalizedText.match(/(?:koji|what|koliki) (?:postotak|percentage) (?:je|is) (\d+(?:\.\d+)?) (?:od|of) (\d+(?:\.\d+)?)/);
    const result = (parseFloat(number) / parseFloat(total)) * 100;
    return {
      result,
      explanation: `${parseFloat(number).toLocaleString('hr-HR')} je sljedeći postotak od ${parseFloat(total).toLocaleString('hr-HR')}:`,
    };
  }

  // Pattern for "Subtract X% from Y" or "Oduzmi X% od Y"
  if (normalizedText.match(/(?:oduzmi|subtract) (\d+(?:\.\d+)?)%? (?:od|from) (\d+(?:\.\d+)?)/)) {
    const [_, percentage, number] = normalizedText.match(/(?:oduzmi|subtract) (\d+(?:\.\d+)?)%? (?:od|from) (\d+(?:\.\d+)?)/);
    const baseNum = parseFloat(number);
    const percentageNum = parseFloat(percentage);
    const result = baseNum * (1 - percentageNum / 100);
    return {
      result,
      explanation: `${baseNum.toLocaleString('hr-HR')} smanjeno za ${percentageNum}% iznosi:`,
    };
  }

  // Pattern for "Increase from X to Y" or "Povećanje sa X na Y"
  if (normalizedText.match(/(?:povećanje|porast|increase) (?:sa|od|from) (\d+(?:\.\d+)?) (?:na|do|to) (\d+(?:\.\d+)?)/)) {
    const [_, initial, final] = normalizedText.match(/(?:povećanje|porast|increase) (?:sa|od|from) (\d+(?:\.\d+)?) (?:na|do|to) (\d+(?:\.\d+)?)/);
    const initialNum = parseFloat(initial);
    const finalNum = parseFloat(final);
    const result = ((finalNum - initialNum) / initialNum) * 100;
    return {
      result,
      explanation: `Povećanje sa ${initialNum.toLocaleString('hr-HR')} na ${finalNum.toLocaleString('hr-HR')} iznosi:`,
    };
  }

  // Basic percentage calculation patterns
  if (normalizedText.match(/(?:koliko|što|what) (?:je|iznosi|is) (\d+(?:\.\d+)?)%? (?:od|of) (\d+(?:\.\d+)?)/)) {
    const [_, percentage, number] = normalizedText.match(/(?:koliko|što|what) (?:je|iznosi|is) (\d+(?:\.\d+)?)%? (?:od|of) (\d+(?:\.\d+)?)/);
    const result = (parseFloat(number) * parseFloat(percentage)) / 100;
    return {
      result,
      explanation: `${percentage}% od ${parseFloat(number).toLocaleString('hr-HR')} je:`,
    };
  }

  throw new Error('Nismo uspjeli prepoznati vaš upit. Pokušajte s drugačijom formulacijom.');
}