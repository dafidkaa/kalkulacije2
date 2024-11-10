import React from 'react';
import { GradientCard } from '../GradientCard';
import { Category, UnitType } from '../../utils/unitConverter';
import { Bookmark, History } from 'lucide-react';

interface ConversionHistoryProps {
  favorites: Array<{
    category: Category;
    fromUnit: UnitType;
    toUnit: UnitType;
  }>;
  onFavoriteSelect: (favorite: {
    category: Category;
    fromUnit: UnitType;
    toUnit: UnitType;
  }) => void;
}

export function ConversionHistory({
  favorites,
  onFavoriteSelect,
}: ConversionHistoryProps) {
  return (
    <>
      <GradientCard className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Bookmark className="w-5 h-5 text-yellow-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            Omiljene Konverzije
          </h2>
        </div>
        {favorites.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Još nema spremljenih konverzija
          </p>
        ) : (
          <div className="space-y-3">
            {favorites.map((favorite, index) => (
              <button
                key={index}
                onClick={() => onFavoriteSelect(favorite)}
                className="w-full p-4 rounded-lg bg-white hover:bg-gray-50
                         border border-gray-200 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {favorite.category.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {favorite.fromUnit.name} → {favorite.toUnit.name}
                    </p>
                  </div>
                  <favorite.category.icon className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            ))}
          </div>
        )}
      </GradientCard>

      <GradientCard className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            Nedavne Konverzije
          </h2>
        </div>
        <p className="text-gray-500 text-center py-4">
          Povijest konverzija će se prikazati ovdje
        </p>
      </GradientCard>
    </>
  );
}