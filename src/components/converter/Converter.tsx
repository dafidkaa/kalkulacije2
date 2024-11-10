import React, { useState } from 'react';
import { GradientCard } from '../GradientCard';
import { UnitInput } from './UnitInput';
import { CategorySelector } from './CategorySelector';
import { Category, UnitType, categories } from '../../utils/unitConverter';

export function Converter() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [fromUnit, setFromUnit] = useState<UnitType>(selectedCategory.units[0]);
  const [toUnit, setToUnit] = useState<UnitType>(selectedCategory.units[1]);
  const [value, setValue] = useState<string>('1');

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setFromUnit(category.units[0]);
    setToUnit(category.units[1]);
    setValue('1');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <GradientCard>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Odaberite Kategoriju
        </h2>
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </GradientCard>

      <div className="mt-8">
        <GradientCard>
          <UnitInput
            category={selectedCategory}
            fromUnit={fromUnit}
            toUnit={toUnit}
            value={value}
            onFromUnitChange={setFromUnit}
            onToUnitChange={setToUnit}
            onValueChange={setValue}
          />
        </GradientCard>
      </div>
    </div>
  );
}