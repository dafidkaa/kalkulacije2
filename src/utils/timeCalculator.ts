export interface TimeResult {
  mainResult: string;
  breakdown?: Record<string, string>;
}

interface TimeInput {
  hours: number;
  minutes: number;
  seconds: number;
  operation: 'add' | 'subtract';
}

type TimeCalculationType = 'arithmetic' | 'interval' | 'conversion';

const croatianUnits: Record<string, string> = {
  seconds: 'sekundi',
  minutes: 'minuta',
  hours: 'sati',
  days: 'dana',
  weeks: 'tjedana',
  months: 'mjeseci',
  years: 'godina'
};

function formatTimeResult(hours: number, minutes: number, seconds: number, sign: string = ''): string {
  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? 'sat' : hours < 5 ? 'sata' : 'sati'}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? 'minuta' : minutes < 5 ? 'minute' : 'minuta'}`);
  }
  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds} ${seconds === 1 ? 'sekunda' : seconds < 5 ? 'sekunde' : 'sekundi'}`);
  }

  return `${sign}${parts.join(', ')}`;
}

export function calculateTimeDifference(
  input: TimeInput[] | { startDate: string; endDate: string } | { amount: number; from: string; to: string },
  type: TimeCalculationType
): TimeResult {
  switch (type) {
    case 'arithmetic':
      return calculateTimeArithmetic(input as TimeInput[]);
    case 'interval':
      return calculateTimeInterval(input as { startDate: string; endDate: string });
    case 'conversion':
      return calculateTimeConversion(input as { amount: number; from: string; to: string });
    default:
      throw new Error('Unsupported calculation type');
  }
}

function calculateTimeArithmetic(inputs: TimeInput[]): TimeResult {
  let totalSeconds = 0;

  inputs.forEach(({ hours, minutes, seconds, operation }) => {
    const totalInSeconds = (hours * 3600) + (minutes * 60) + seconds;
    if (operation === 'add') {
      totalSeconds += totalInSeconds;
    } else {
      totalSeconds -= totalInSeconds;
    }
  });

  const hours = Math.floor(Math.abs(totalSeconds) / 3600);
  const minutes = Math.floor((Math.abs(totalSeconds) % 3600) / 60);
  const seconds = Math.abs(totalSeconds) % 60;

  const sign = totalSeconds < 0 ? '-' : '';
  const mainResult = formatTimeResult(hours, minutes, seconds, sign);

  // Calculate detailed breakdown
  const totalDays = totalSeconds / (24 * 3600);
  const totalWeeks = totalDays / 7;
  const totalMonths = totalDays / 30.44; // Average month length
  const totalYears = totalDays / 365.25; // Account for leap years

  return {
    mainResult,
    breakdown: {
      'Godine': `${totalYears.toLocaleString('hr-HR', { maximumFractionDigits: 2 })} godina`,
      'Mjeseci': `${totalMonths.toLocaleString('hr-HR', { maximumFractionDigits: 2 })} mjeseci`,
      'Tjedni': `${totalWeeks.toLocaleString('hr-HR', { maximumFractionDigits: 2 })} tjedana`,
      'Dani': `${totalDays.toLocaleString('hr-HR', { maximumFractionDigits: 2 })} dana`,
      'Sati': `${(totalSeconds / 3600).toLocaleString('hr-HR', { maximumFractionDigits: 2 })} sati`,
      'Minute': `${(totalSeconds / 60).toLocaleString('hr-HR', { maximumFractionDigits: 0 })} minuta`,
      'Sekunde': `${totalSeconds.toLocaleString('hr-HR', { maximumFractionDigits: 0 })} sekundi`
    }
  };
}

function calculateTimeInterval(input: { startDate: string; endDate: string }): TimeResult {
  const start = new Date(input.startDate);
  const end = new Date(input.endDate);

  // Ensure end date is after start date
  if (end < start) {
    return {
      mainResult: 'Greška: Završni datum mora biti nakon početnog datuma'
    };
  }

  const diffInSeconds = (end.getTime() - start.getTime()) / 1000;

  const days = Math.floor(diffInSeconds / (24 * 3600));
  const hours = Math.floor((diffInSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = Math.floor(diffInSeconds % 60);

  const mainResult = formatTimeResult(hours, minutes, seconds);

  // Calculate detailed breakdown for longer intervals
  const totalDays = diffInSeconds / (24 * 3600);
  const totalWeeks = totalDays / 7;
  const totalMonths = totalDays / 30.44; // Average month length
  const totalYears = totalDays / 365.25; // Account for leap years

  if (days > 0) {
    return {
      mainResult: `${days} ${days === 1 ? 'dan' : 'dana'}, ${mainResult}`,
      breakdown: {
        'Godine': `${totalYears.toLocaleString('hr-HR', { maximumFractionDigits: 2 })} godina`,
        'Mjeseci': `${totalMonths.toLocaleString('hr-HR', { maximumFractionDigits: 2 })} mjeseci`,
        'Tjedni': `${totalWeeks.toLocaleString('hr-HR', { maximumFractionDigits: 2 })} tjedana`,
        'Dani': `${totalDays.toLocaleString('hr-HR', { maximumFractionDigits: 2 })} dana`,
      }
    };
  }

  return { mainResult };
}

function calculateTimeConversion(input: { amount: number; from: string; to: string }): TimeResult {
  const conversions: Record<string, number> = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800
  };

  const fromSeconds = input.amount * (conversions[input.from] || 1);
  const result = fromSeconds / (conversions[input.to] || 1);

  return {
    mainResult: `${result.toLocaleString('hr-HR')} ${croatianUnits[input.to]}`
  };
}