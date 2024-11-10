import React from 'react';
import { TimeBreakdown } from '../types/calculator';
import { GradientCard } from './GradientCard';
import { formatCurrency } from '../utils/formatters';

interface TimeBreakdownCardProps {
  breakdown: TimeBreakdown;
  isGross: boolean;
}

export function TimeBreakdownCard({ breakdown, isGross }: TimeBreakdownCardProps) {
  const items = [
    { label: 'Po satu', value: breakdown.hourly },
    { label: 'Po danu (8h)', value: breakdown.daily },
    { label: 'Tjedno (40h)', value: breakdown.weekly },
    { label: 'Mjesečno', value: breakdown.monthly },
    { label: 'Godišnje', value: breakdown.yearly },
  ];

  return (
    <GradientCard className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-800">
        {isGross ? 'Bruto' : 'Neto'} plaća po razdoblju
      </h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center"
          >
            <span className="text-base text-gray-600">{item.label}</span>
            <span className="text-base font-medium text-gray-900">
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </GradientCard>
  );
}