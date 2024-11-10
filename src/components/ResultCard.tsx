import React from 'react';
import { TaxBreakdown } from '../types/calculator';
import { GradientCard } from './GradientCard';
import { formatCurrency } from '../utils/formatters';

interface ResultCardProps {
  breakdown: TaxBreakdown;
}

export function ResultCard({ breakdown }: ResultCardProps) {
  const items = [
    { label: 'Bruto Plaća', value: breakdown.gross },
    { label: 'Mirovinski stup 1 (15%)', value: -breakdown.pensionPillar1 },
    { label: 'Mirovinski stup 2 (5%)', value: -breakdown.pensionPillar2 },
    { label: 'Zdravstveno osiguranje (16.5%)', value: -breakdown.healthInsurance },
    { label: 'Porez na dohodak', value: -breakdown.incomeTax },
    { label: 'Neto Plaća', value: breakdown.net, isTotal: true },
  ];

  return (
    <GradientCard className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-800">Rezultat Izračuna</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center ${
              item.isTotal ? 'pt-4 border-t border-gray-200 font-semibold' : ''
            }`}
          >
            <span className="text-base text-gray-600">{item.label}</span>
            <span
              className={`${
                item.isTotal
                  ? 'text-xl text-blue-600 font-semibold'
                  : item.value < 0
                  ? 'text-red-500'
                  : 'text-gray-900'
              } font-medium`}
            >
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </GradientCard>
  );
}