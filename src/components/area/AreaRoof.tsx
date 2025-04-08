import React, { useState, useEffect } from 'react';
import { GradientCard } from '../GradientCard';

type RoofType = 'gable' | 'hip' | 'flat' | 'mansard' | 'gambrel';

interface RoofTypeInfo {
  name: string;
  description: string;
  formula: string;
  calculateArea: (length: number, width: number, pitch: number, height?: number) => number;
}

export function AreaRoof() {
  const [roofType, setRoofType] = useState<RoofType>('gable');
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(8);
  const [pitch, setPitch] = useState<number>(30);
  const [height, setHeight] = useState<number>(3);
  const [unit, setUnit] = useState<string>('m');
  const [result, setResult] = useState<number | null>(null);
  const [materials, setMaterials] = useState<{ name: string; quantity: number; unit: string }[]>([]);

  const roofTypes: Record<RoofType, RoofTypeInfo> = {
    gable: {
      name: 'Dvostrešni krov',
      description: 'Najčešći tip krova s dva nagiba koji se spajaju u sljemenu.',
      formula: 'A = L × W × (1 + (nagib/100)²)½',
      calculateArea: (length, width, pitch) => {
        // Convert pitch from degrees to slope ratio
        const slope = Math.tan(pitch * Math.PI / 180);
        // Calculate the slant height using Pythagorean theorem
        const slantHeight = width / 2 * Math.sqrt(1 + slope * slope);
        // Total roof area is 2 * length * slant height (for both sides)
        return 2 * length * slantHeight;
      }
    },
    hip: {
      name: 'Četverostrešni krov',
      description: 'Krov s četiri nagiba koji se spajaju u vrhu.',
      formula: 'A = L × W × (1 + (nagib/100)²)½ + 2 × triangular ends',
      calculateArea: (length, width, pitch) => {
        // Convert pitch from degrees to slope ratio
        const slope = Math.tan(pitch * Math.PI / 180);
        // Calculate the slant height using Pythagorean theorem
        const slantHeight = width / 2 * Math.sqrt(1 + slope * slope);
        // Calculate the area of the two main sides
        const mainSidesArea = 2 * length * slantHeight;
        // Calculate the area of the two triangular ends
        const triangularEndsArea = 2 * (width / 2) * slantHeight;
        // Total roof area
        return mainSidesArea + triangularEndsArea;
      }
    },
    flat: {
      name: 'Ravni krov',
      description: 'Krov s minimalnim nagibom ili bez nagiba.',
      formula: 'A = L × W',
      calculateArea: (length, width) => {
        // Flat roof area is simply length × width
        return length * width;
      }
    },
    mansard: {
      name: 'Mansardni krov',
      description: 'Krov s dva nagiba na svakoj strani, donji je strmiji.',
      formula: 'A = L × W × factor (based on pitch)',
      calculateArea: (length, width, pitch, height = 3) => {
        // Convert pitch from degrees to slope ratio
        const slope = Math.tan(pitch * Math.PI / 180);
        // Calculate the slant height of the lower steeper section
        const lowerSlantHeight = height * Math.sqrt(1 + slope * slope);
        // Calculate the slant height of the upper less steep section
        const upperSlope = Math.tan((pitch / 2) * Math.PI / 180);
        const upperSlantHeight = (width / 2 - height) * Math.sqrt(1 + upperSlope * upperSlope);
        // Total roof area for all four sides
        return 2 * (length + width) * lowerSlantHeight + 2 * length * upperSlantHeight;
      }
    },
    gambrel: {
      name: 'Gambrel krov',
      description: 'Sličan mansardnom, ali samo s dvije strane (kao na tradicionalnim ambarima).',
      formula: 'A = L × W × factor (based on pitch)',
      calculateArea: (length, width, pitch, height = 3) => {
        // Convert pitch from degrees to slope ratio
        const slope = Math.tan(pitch * Math.PI / 180);
        // Calculate the slant height of the lower steeper section
        const lowerSlantHeight = height * Math.sqrt(1 + slope * slope);
        // Calculate the slant height of the upper less steep section
        const upperSlope = Math.tan((pitch / 2) * Math.PI / 180);
        const upperSlantHeight = (width / 2 - height) * Math.sqrt(1 + upperSlope * upperSlope);
        // Total roof area for two sides
        return 2 * length * (lowerSlantHeight + upperSlantHeight);
      }
    }
  };

  // Calculate roof area when inputs change
  useEffect(() => {
    calculateRoofArea();
  }, [roofType, length, width, pitch, height, unit]);

  const calculateRoofArea = () => {
    const roofInfo = roofTypes[roofType];
    let area = roofInfo.calculateArea(length, width, pitch, height);
    
    // Convert to selected unit if needed
    if (unit === 'ft') {
      // If inputs are in feet, no conversion needed
    } else if (unit === 'm') {
      // If inputs are in meters, no conversion needed
    }
    
    setResult(area);
    
    // Calculate materials needed
    calculateMaterials(area);
  };

  const calculateMaterials = (area: number) => {
    const materials = [
      {
        name: 'Crijep/šindra',
        quantity: Math.ceil(area / 0.5), // Assuming each tile covers 0.5 square units
        unit: 'kom'
      },
      {
        name: 'Letve',
        quantity: Math.ceil(area * 2), // Meters of battens needed
        unit: unit === 'm' ? 'm' : 'ft'
      },
      {
        name: 'Izolacija',
        quantity: Math.ceil(area * 1.1), // 10% extra for overlaps
        unit: unit === 'm' ? 'm²' : 'ft²'
      },
      {
        name: 'Čavli/vijci',
        quantity: Math.ceil(area * 20), // Approximate number of nails/screws
        unit: 'kom'
      }
    ];
    
    setMaterials(materials);
  };

  const formatArea = (area: number): string => {
    let unitSymbol = unit === 'm' ? 'm²' : 'ft²';
    return `${area.toLocaleString('hr-HR', { maximumFractionDigits: 2 })} ${unitSymbol}`;
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GradientCard>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Kalkulator Površine Krova</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Tip krova</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(Object.keys(roofTypes) as RoofType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setRoofType(type)}
                    className={`
                      p-3 rounded-lg flex flex-col items-center justify-center text-center
                      transition-all duration-200 h-24
                      ${roofType === type
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}
                    `}
                  >
                    <span className="text-xs font-medium">{roofTypes[type].name}</span>
                  </button>
                ))}
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  {roofTypes[roofType].description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Duljina
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.1"
                      className={`${inputClasses} rounded-r-none`}
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                      {unit}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Širina
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.1"
                      className={`${inputClasses} rounded-r-none`}
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                      {unit}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Nagib krova
                </label>
                <div className="flex">
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="1"
                    value={pitch}
                    onChange={(e) => setPitch(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="ml-2 w-12 text-center">{pitch}°</span>
                </div>
              </div>
              
              {(roofType === 'mansard' || roofType === 'gambrel') && (
                <div className="space-y-2">
                  <label className="block text-base font-medium text-gray-700">
                    Visina donjeg dijela
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.1"
                      className={`${inputClasses} rounded-r-none`}
                    />
                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                      {unit}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="block text-base font-medium text-gray-700">
                  Mjerna jedinica
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className={inputClasses}
                >
                  <option value="m">Metri (m)</option>
                  <option value="ft">Stope (ft)</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setLength(10);
                  setWidth(8);
                  setPitch(30);
                  setHeight(3);
                  setRoofType('gable');
                }}
                className="py-3 px-4 bg-gray-200 text-gray-700 rounded-lg
                         hover:bg-gray-300 transition-colors duration-200"
              >
                Resetiraj
              </button>
            </div>
          </div>
        </GradientCard>

        <GradientCard>
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Rezultat</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 flex justify-center">
              <svg width="300" height="200" viewBox="0 0 300 200" className="border border-gray-200 rounded">
                {/* Roof visualization based on type */}
                {roofType === 'gable' && (
                  <>
                    <rect x="50" y="120" width="200" height="50" fill="#d1d5db" />
                    <polygon points="50,120 150,70 250,120" fill="rgba(20, 184, 166, 0.3)" stroke="rgb(20, 184, 166)" strokeWidth="2" />
                    <line x1="150" y1="70" x2="150" y2="170" stroke="#6b7280" strokeWidth="1" strokeDasharray="4" />
                  </>
                )}
                {roofType === 'hip' && (
                  <>
                    <rect x="50" y="120" width="200" height="50" fill="#d1d5db" />
                    <polygon points="50,120 150,70 250,120" fill="rgba(20, 184, 166, 0.3)" stroke="rgb(20, 184, 166)" strokeWidth="2" />
                    <polygon points="50,120 75,95 150,70 225,95 250,120" fill="rgba(20, 184, 166, 0.3)" stroke="rgb(20, 184, 166)" strokeWidth="2" />
                  </>
                )}
                {roofType === 'flat' && (
                  <>
                    <rect x="50" y="120" width="200" height="50" fill="#d1d5db" />
                    <rect x="50" y="110" width="200" height="10" fill="rgba(20, 184, 166, 0.3)" stroke="rgb(20, 184, 166)" strokeWidth="2" />
                  </>
                )}
                {roofType === 'mansard' && (
                  <>
                    <rect x="50" y="120" width="200" height="50" fill="#d1d5db" />
                    <polygon points="75,90 225,90 250,120 50,120" fill="rgba(20, 184, 166, 0.3)" stroke="rgb(20, 184, 166)" strokeWidth="2" />
                    <polygon points="100,60 200,60 225,90 75,90" fill="rgba(20, 184, 166, 0.5)" stroke="rgb(20, 184, 166)" strokeWidth="2" />
                  </>
                )}
                {roofType === 'gambrel' && (
                  <>
                    <rect x="50" y="120" width="200" height="50" fill="#d1d5db" />
                    <polygon points="50,120 100,90 200,90 250,120" fill="rgba(20, 184, 166, 0.3)" stroke="rgb(20, 184, 166)" strokeWidth="2" />
                    <polygon points="100,90 150,60 200,90" fill="rgba(20, 184, 166, 0.5)" stroke="rgb(20, 184, 166)" strokeWidth="2" />
                  </>
                )}
                
                {/* Dimensions */}
                <text x="150" y="185" textAnchor="middle" fontSize="12" fill="#4B5563">Duljina: {length} {unit}</text>
                <text x="30" y="120" textAnchor="end" fontSize="12" fill="#4B5563">Širina: {width} {unit}</text>
                <text x="270" y="95" textAnchor="start" fontSize="12" fill="#4B5563">Nagib: {pitch}°</text>
              </svg>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-teal-50 rounded-lg">
                <h3 className="text-lg font-medium text-teal-800 mb-2">Ukupna površina krova:</h3>
                <p className="text-3xl font-bold text-teal-600">
                  {result !== null ? formatArea(result) : '-'}
                </p>
                <p className="text-sm text-teal-700 mt-2">
                  Formula: {roofTypes[roofType].formula}
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-3">Potrebni materijali:</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-200">
                      <th className="text-left py-2">Materijal</th>
                      <th className="text-right py-2">Količina</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((material, index) => (
                      <tr key={index} className="border-b border-blue-100">
                        <td className="py-2">{material.name}</td>
                        <td className="text-right py-2">{material.quantity.toLocaleString('hr-HR')} {material.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="text-lg font-medium text-yellow-800 mb-2">Savjeti:</h3>
                <ul className="space-y-1 text-yellow-700 list-disc list-inside">
                  <li>Dodajte 10-15% na ukupnu površinu za preklapanja i otpad</li>
                  <li>Za složenije krovove, podijelite ih na jednostavnije dijelove</li>
                  <li>Provjerite lokalne građevinske propise za minimalni nagib krova</li>
                  <li>Konzultirajte stručnjaka za preciznije procjene materijala</li>
                </ul>
              </div>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
