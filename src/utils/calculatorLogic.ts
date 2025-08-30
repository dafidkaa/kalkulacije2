export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForNewValue: boolean;
  memory: number;
  history: string[];
  isScientific: boolean;
}

export const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForNewValue: false,
  memory: 0,
  history: [],
  isScientific: false,
};

// Basic arithmetic operations
export const basicOperations = {
  '+': (a: number, b: number) => a + b,
  '-': (a: number, b: number) => a - b,
  '*': (a: number, b: number) => a * b,
  '×': (a: number, b: number) => a * b,
  '/': (a: number, b: number) => a / b,
  '÷': (a: number, b: number) => a / b,
  '=': (a: number, b: number) => b,
};

// Scientific operations
export const scientificOperations = {
  'sin': (x: number) => Math.sin(x * Math.PI / 180),
  'cos': (x: number) => Math.cos(x * Math.PI / 180),
  'tan': (x: number) => Math.tan(x * Math.PI / 180),
  'log': (x: number) => Math.log10(x),
  'ln': (x: number) => Math.log(x),
  'sqrt': (x: number) => Math.sqrt(x),
  'square': (x: number) => x * x,
  'cube': (x: number) => x * x * x,
  'pow': (base: number, exp: number) => Math.pow(base, exp),
  'factorial': (n: number) => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  },
  'percent': (x: number) => x / 100,
};

export function inputNumber(state: CalculatorState, num: string): CalculatorState {
  if (state.waitingForNewValue) {
    return {
      ...state,
      display: num,
      waitingForNewValue: false,
    };
  }

  return {
    ...state,
    display: state.display === '0' ? num : state.display + num,
  };
}

export function inputOperation(state: CalculatorState, nextOperation: string): CalculatorState {
  const inputValue = parseFloat(state.display);

  if (state.previousValue === null) {
    return {
      ...state,
      previousValue: inputValue,
      operation: nextOperation,
      waitingForNewValue: true,
    };
  }

  if (state.operation && state.waitingForNewValue) {
    return {
      ...state,
      operation: nextOperation,
    };
  }

  const currentValue = state.previousValue || 0;
  const operation = basicOperations[state.operation as keyof typeof basicOperations];
  
  if (operation) {
    const result = operation(currentValue, inputValue);
    const calculation = `${currentValue} ${state.operation} ${inputValue} = ${result}`;
    
    return {
      ...state,
      display: String(result),
      previousValue: result,
      operation: nextOperation,
      waitingForNewValue: true,
      history: [...state.history, calculation].slice(-10), // Keep last 10 calculations
    };
  }

  return state;
}

export function calculate(state: CalculatorState): CalculatorState {
  const inputValue = parseFloat(state.display);

  if (state.previousValue === null || !state.operation) {
    return state;
  }

  const currentValue = state.previousValue;
  const operation = basicOperations[state.operation as keyof typeof basicOperations];
  
  if (operation) {
    const result = operation(currentValue, inputValue);
    const calculation = `${currentValue} ${state.operation} ${inputValue} = ${result}`;
    
    return {
      ...state,
      display: String(result),
      previousValue: null,
      operation: null,
      waitingForNewValue: true,
      history: [...state.history, calculation].slice(-10),
    };
  }

  return state;
}

export function clearAll(): CalculatorState {
  return { ...initialState };
}

export function clearEntry(state: CalculatorState): CalculatorState {
  return {
    ...state,
    display: '0',
  };
}

export function inputDecimal(state: CalculatorState): CalculatorState {
  if (state.waitingForNewValue) {
    return {
      ...state,
      display: '0.',
      waitingForNewValue: false,
    };
  }

  if (state.display.indexOf('.') === -1) {
    return {
      ...state,
      display: state.display + '.',
    };
  }

  return state;
}

export function performScientificOperation(state: CalculatorState, operation: string): CalculatorState {
  const inputValue = parseFloat(state.display);
  const scientificOp = scientificOperations[operation as keyof typeof scientificOperations];
  
  if (scientificOp) {
    const result = scientificOp(inputValue);
    const calculation = `${operation}(${inputValue}) = ${result}`;
    
    return {
      ...state,
      display: String(result),
      waitingForNewValue: true,
      history: [...state.history, calculation].slice(-10),
    };
  }

  return state;
}

export function memoryStore(state: CalculatorState): CalculatorState {
  return {
    ...state,
    memory: parseFloat(state.display),
  };
}

export function memoryRecall(state: CalculatorState): CalculatorState {
  return {
    ...state,
    display: String(state.memory),
    waitingForNewValue: true,
  };
}

export function memoryClear(state: CalculatorState): CalculatorState {
  return {
    ...state,
    memory: 0,
  };
}

export function memoryAdd(state: CalculatorState): CalculatorState {
  return {
    ...state,
    memory: state.memory + parseFloat(state.display),
  };
}

export function memorySubtract(state: CalculatorState): CalculatorState {
  return {
    ...state,
    memory: state.memory - parseFloat(state.display),
  };
}

// Keyboard mapping
export const keyboardMap: { [key: string]: string } = {
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  '+': '+', '-': '-', '*': '*', '/': '/',
  'Enter': '=', '=': '=', '.': '.',
  'Escape': 'AC', 'Backspace': 'CE',
  'c': 'AC', 'C': 'AC',
};
