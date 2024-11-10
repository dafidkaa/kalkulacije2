import React from 'react';
import { Category } from '../../utils/unitConverter';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategorySelector({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategorySelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category)}
          className={`
            p-4 rounded-xl text-sm font-medium text-center
            transition-all duration-200 flex flex-col items-center gap-2
            ${
              selectedCategory.id === category.id
                ? 'bg-green-600 text-white shadow-lg shadow-green-500/20'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }
          `}
        >
          <category.icon className="w-6 h-6" />
          {category.name}
        </button>
      ))}
    </div>
  );
}