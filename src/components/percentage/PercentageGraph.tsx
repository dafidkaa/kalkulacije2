import React from 'react';
import { CalculationType } from '../../utils/percentageCalculator';

interface PercentageGraphProps {
  type: CalculationType;
  value1: number;
  value2: number;
  result: number;
}

export function PercentageGraph({ type, value1, value2, result }: PercentageGraphProps) {
  const getGraphContent = () => {
    switch (type) {
      case 'basic':
        return (
          <div className="space-y-4">
            <div className="w-full h-8 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${value2}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>0</span>
              <span>{value1}</span>
            </div>
          </div>
        );

      case 'whatPercent':
        const percentage = (value2 / value1) * 100;
        return (
          <div className="space-y-4">
            <div className="w-full h-8 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>0</span>
              <span>{value1}</span>
            </div>
          </div>
        );

      case 'increase':
        const increaseWidth = (result / (value1 * 2)) * 100;
        return (
          <div className="space-y-4">
            <div className="relative w-full h-8">
              <div className="absolute inset-0 bg-gray-100 rounded-full" />
              <div 
                className="absolute inset-y-0 left-1/2 bg-orange-500 transition-all duration-300 rounded-r-full"
                style={{ width: `${increaseWidth}%` }}
              />
              <div 
                className="absolute inset-y-0 right-1/2 bg-orange-200 transition-all duration-300 rounded-l-full"
                style={{ width: `${50 - increaseWidth}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{value1}</span>
              <span>{result}</span>
            </div>
          </div>
        );

      case 'decrease':
        const decreaseWidth = (result / value1) * 100;
        return (
          <div className="space-y-4">
            <div className="w-full h-8 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-300"
                style={{ width: `${decreaseWidth}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>0</span>
              <span>{value1}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Vizualni Prikaz
      </h3>
      {getGraphContent()}
    </div>
  );
}