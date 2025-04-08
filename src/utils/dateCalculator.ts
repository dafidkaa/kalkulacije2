// Date calculation utility functions

export interface DateDifference {
  days: number;
  weeks: number;
  months: number;
  years: number;
  totalDays: number;
}

export interface DateDifferenceDetailed {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

export interface WorkingDaysOptions {
  excludeWeekends: boolean;
  excludeHolidays: boolean;
  holidays?: Date[];
}

export type DateFormat = 'dd.MM.yyyy' | 'MM/dd/yyyy' | 'yyyy-MM-dd' | 'dd/MM/yyyy' | 'dd. MMMM yyyy.' | 'MMMM dd, yyyy';

// Croatian holidays (fixed dates)
export const croatianHolidays = [
  { month: 1, day: 1, name: 'Nova godina' },
  { month: 1, day: 6, name: 'Sveta tri kralja' },
  { month: 5, day: 1, name: 'Praznik rada' },
  { month: 5, day: 30, name: 'Dan državnosti' },
  { month: 6, day: 22, name: 'Dan antifašističke borbe' },
  { month: 8, day: 5, name: 'Dan pobjede i domovinske zahvalnosti' },
  { month: 8, day: 15, name: 'Velika Gospa' },
  { month: 11, day: 1, name: 'Svi sveti' },
  { month: 11, day: 18, name: 'Dan sjećanja na žrtve Domovinskog rata' },
  { month: 12, day: 25, name: 'Božić' },
  { month: 12, day: 26, name: 'Sveti Stjepan' }
];

// Calculate difference between two dates
export const calculateDateDifference = (startDate: Date, endDate: Date): DateDifference => {
  // Ensure dates are in the correct order
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }
  
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const years = endDate.getFullYear() - startDate.getFullYear();
  
  // Calculate months difference
  let months = endDate.getMonth() - startDate.getMonth();
  if (endDate.getDate() < startDate.getDate()) {
    months--;
  }
  if (months < 0) {
    months += 12;
  }
  
  // Calculate weeks
  const weeks = Math.floor(totalDays / 7);
  
  return {
    days: totalDays % 7,
    weeks,
    months: months % 12,
    years,
    totalDays
  };
};

// Calculate detailed difference (exact years, months, days)
export const calculateDetailedDifference = (startDate: Date, endDate: Date): DateDifferenceDetailed => {
  // Ensure dates are in the correct order
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }
  
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();
  
  // Adjust for negative days
  if (days < 0) {
    months--;
    // Get the last day of the previous month
    const lastDayOfPrevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
    days += lastDayOfPrevMonth;
  }
  
  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return {
    years,
    months,
    days,
    totalDays
  };
};

// Add days to a date
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Add months to a date
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

// Add years to a date
export const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

// Check if a date is a weekend
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
};

// Check if a date is a holiday
export const isHoliday = (date: Date, holidays: Date[] = []): boolean => {
  // Check fixed Croatian holidays
  const isFixedHoliday = croatianHolidays.some(
    holiday => date.getMonth() + 1 === holiday.month && date.getDate() === holiday.day
  );
  
  if (isFixedHoliday) return true;
  
  // Check custom holidays
  return holidays.some(holiday => 
    holiday.getFullYear() === date.getFullYear() && 
    holiday.getMonth() === date.getMonth() && 
    holiday.getDate() === date.getDate()
  );
};

// Calculate working days between two dates
export const calculateWorkingDays = (
  startDate: Date, 
  endDate: Date, 
  options: WorkingDaysOptions = { excludeWeekends: true, excludeHolidays: true }
): number => {
  // Ensure dates are in the correct order
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }
  
  let workingDays = 0;
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const isWorkingDay = 
      (!options.excludeWeekends || !isWeekend(currentDate)) && 
      (!options.excludeHolidays || !isHoliday(currentDate, options.holidays));
    
    if (isWorkingDay) {
      workingDays++;
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return workingDays;
};

// Add working days to a date
export const addWorkingDays = (
  date: Date, 
  days: number, 
  options: WorkingDaysOptions = { excludeWeekends: true, excludeHolidays: true }
): Date => {
  const result = new Date(date);
  let daysAdded = 0;
  
  while (daysAdded < days) {
    result.setDate(result.getDate() + 1);
    
    const isWorkingDay = 
      (!options.excludeWeekends || !isWeekend(result)) && 
      (!options.excludeHolidays || !isHoliday(result, options.holidays));
    
    if (isWorkingDay) {
      daysAdded++;
    }
  }
  
  return result;
};

// Calculate age
export const calculateAge = (birthDate: Date, currentDate: Date = new Date()): DateDifferenceDetailed => {
  return calculateDetailedDifference(birthDate, currentDate);
};

// Format date according to specified format
export const formatDate = (date: Date, format: DateFormat = 'dd.MM.yyyy'): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  
  const monthNames = [
    'siječanj', 'veljača', 'ožujak', 'travanj', 'svibanj', 'lipanj',
    'srpanj', 'kolovoz', 'rujan', 'listopad', 'studeni', 'prosinac'
  ];
  
  const monthNamesEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  switch (format) {
    case 'dd.MM.yyyy':
      return `${day}.${month}.${year}`;
    case 'MM/dd/yyyy':
      return `${month}/${day}/${year}`;
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`;
    case 'dd/MM/yyyy':
      return `${day}/${month}/${year}`;
    case 'dd. MMMM yyyy.':
      return `${day}. ${monthNames[date.getMonth()]} ${year}.`;
    case 'MMMM dd, yyyy':
      return `${monthNamesEn[date.getMonth()]} ${day}, ${year}`;
    default:
      return `${day}.${month}.${year}`;
  }
};

// Parse date from string
export const parseDate = (dateString: string): Date | null => {
  // Try different date formats
  const formats = [
    // dd.MM.yyyy
    {
      regex: /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/,
      createDate: (match: RegExpMatchArray) => new Date(
        parseInt(match[3]), 
        parseInt(match[2]) - 1, 
        parseInt(match[1])
      )
    },
    // MM/dd/yyyy
    {
      regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
      createDate: (match: RegExpMatchArray) => new Date(
        parseInt(match[3]), 
        parseInt(match[1]) - 1, 
        parseInt(match[2])
      )
    },
    // yyyy-MM-dd
    {
      regex: /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
      createDate: (match: RegExpMatchArray) => new Date(
        parseInt(match[1]), 
        parseInt(match[2]) - 1, 
        parseInt(match[3])
      )
    },
    // dd/MM/yyyy
    {
      regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
      createDate: (match: RegExpMatchArray) => new Date(
        parseInt(match[3]), 
        parseInt(match[2]) - 1, 
        parseInt(match[1])
      )
    }
  ];
  
  for (const format of formats) {
    const match = dateString.match(format.regex);
    if (match) {
      const date = format.createDate(match);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
  }
  
  // If no format matches, try built-in Date parsing
  const date = new Date(dateString);
  return !isNaN(date.getTime()) ? date : null;
};

// Get days until a specific date
export const getDaysUntil = (targetDate: Date): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  
  return Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

// Common events for countdown
export interface CommonEvent {
  name: string;
  getNextDate: () => Date;
  category: 'holiday' | 'personal' | 'business';
}

export const commonEvents: CommonEvent[] = [
  {
    name: 'Nova godina',
    getNextDate: () => {
      const today = new Date();
      const nextEvent = new Date(today.getFullYear(), 0, 1); // January 1st
      if (today > nextEvent) {
        nextEvent.setFullYear(today.getFullYear() + 1);
      }
      return nextEvent;
    },
    category: 'holiday'
  },
  {
    name: 'Božić',
    getNextDate: () => {
      const today = new Date();
      const nextEvent = new Date(today.getFullYear(), 11, 25); // December 25th
      if (today > nextEvent) {
        nextEvent.setFullYear(today.getFullYear() + 1);
      }
      return nextEvent;
    },
    category: 'holiday'
  },
  {
    name: 'Uskrs',
    getNextDate: () => {
      // This is a simplified calculation for Easter
      // Easter is a complex calculation, this is just an approximation
      const today = new Date();
      const year = today.getFullYear();
      
      // Simple approximation for Easter
      const a = year % 19;
      const b = Math.floor(year / 100);
      const c = year % 100;
      const d = Math.floor(b / 4);
      const e = b % 4;
      const f = Math.floor((b + 8) / 25);
      const g = Math.floor((b - f + 1) / 3);
      const h = (19 * a + b - d - g + 15) % 30;
      const i = Math.floor(c / 4);
      const k = c % 4;
      const l = (32 + 2 * e + 2 * i - h - k) % 7;
      const m = Math.floor((a + 11 * h + 22 * l) / 451);
      const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
      const day = ((h + l - 7 * m + 114) % 31) + 1;
      
      const easter = new Date(year, month, day);
      if (today > easter) {
        // Calculate next year's Easter
        return getNextEaster(year + 1);
      }
      return easter;
    },
    category: 'holiday'
  },
  {
    name: 'Dan državnosti',
    getNextDate: () => {
      const today = new Date();
      const nextEvent = new Date(today.getFullYear(), 4, 30); // May 30th
      if (today > nextEvent) {
        nextEvent.setFullYear(today.getFullYear() + 1);
      }
      return nextEvent;
    },
    category: 'holiday'
  },
  {
    name: 'Praznik rada',
    getNextDate: () => {
      const today = new Date();
      const nextEvent = new Date(today.getFullYear(), 4, 1); // May 1st
      if (today > nextEvent) {
        nextEvent.setFullYear(today.getFullYear() + 1);
      }
      return nextEvent;
    },
    category: 'holiday'
  }
];

// Helper function for Easter calculation
function getNextEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  
  return new Date(year, month, day);
}
