import React, { useState } from 'react';
import { GradientCard } from '../GradientCard';

interface Point {
  x: number;
  y: number;
}

export function AreaLand() {
  const [points, setPoints] = useState<Point[]>([
    { x: 0, y: 0 },
    { x: 0, y: 100 },
    { x: 100, y: 100 },
    { x: 100, y: 0 }
  ]);
  const [newPoint, setNewPoint] = useState<Point>({ x: 0, y: 0 });
  const [unit, setUnit] = useState<string>('m');
  const [result, setResult] = useState<number | null>(null);

  // Calculate area using Shoelace formula (Gauss's area formula)
  const calculateArea = () => {
    if (points.length < 3) {
      return 0;
    }

    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
    }
    area = Math.abs(area) / 2;
    return area;
  };

  const handleCalculate = () => {
    const area = calculateArea();
    setResult(area);
  };

  const handleAddPoint = () => {
    setPoints([...points, { ...newPoint }]);
    setNewPoint({ x: 0, y: 0 });
  };

  const handleRemovePoint = (index: number) => {
    if (points.length > 3) {
      const newPoints = [...points];
      newPoints.splice(index, 1);
      setPoints(newPoints);
    }
  };

  const handleUpdatePoint = (index: number, axis: 'x' | 'y', value: number) => {
    const newPoints = [...points];
    newPoints[index][axis] = value;
    setPoints(newPoints);
  };

  const handleReset = () => {
    setPoints([
      { x: 0, y: 0 },
      { x: 0, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 0 }
    ]);
    setResult(null);
  };

  // Generate SVG path for the polygon
  const generateSvgPath = () => {
    if (points.length < 3) return '';
    
    // Find min and max coordinates to scale the drawing
    const xValues = points.map(p => p.x);
    const yValues = points.map(p => p.y);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);
    
    // Scale and translate points to fit in the SVG
    const width = 300;
    const height = 200;
    const padding = 20;
    
    const scaleX = (maxX - minX) === 0 ? 1 : (width - 2 * padding) / (maxX - minX);
    const scaleY = (maxY - minY) === 0 ? 1 : (height - 2 * padding) / (maxY - minY);
    
    const scale = Math.min(scaleX, scaleY);
    
    const scaledPoints = points.map(p => ({
      x: padding + (p.x - minX) * scale,
      y: height - padding - (p.y - minY) * scale
    }));
    
    return scaledPoints.map((p, i) => 
      (i === 0 ? 'M' : 'L') + p.x + ',' + p.y
    ).join(' ') + 'Z';
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GradientCard>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Kalkulator Površine Zemljišta</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Koordinate točaka</h3>
              
              <div className="space-y-4">
                {points.map((point, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-1 flex space-x-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          X{index + 1}
                        </label>
                        <input
                          type="number"
                          value={point.x}
                          onChange={(e) => handleUpdatePoint(index, 'x', parseFloat(e.target.value) || 0)}
                          className={inputClasses}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Y{index + 1}
                        </label>
                        <input
                          type="number"
                          value={point.y}
                          onChange={(e) => handleUpdatePoint(index, 'y', parseFloat(e.target.value) || 0)}
                          className={inputClasses}
                        />
                      </div>
                    </div>
                    {points.length > 3 && (
                      <button
                        onClick={() => handleRemovePoint(index)}
                        className="p-2 text-red-500 hover:text-red-700"
                        title="Ukloni točku"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center space-x-3 pt-2">
                <div className="flex-1 flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nova X
                    </label>
                    <input
                      type="number"
                      value={newPoint.x}
                      onChange={(e) => setNewPoint({...newPoint, x: parseFloat(e.target.value) || 0})}
                      className={inputClasses}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nova Y
                    </label>
                    <input
                      type="number"
                      value={newPoint.y}
                      onChange={(e) => setNewPoint({...newPoint, y: parseFloat(e.target.value) || 0})}
                      className={inputClasses}
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddPoint}
                  className="mt-6 p-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200"
                  title="Dodaj točku"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-2 pt-2">
                <label className="block text-base font-medium text-gray-700">
                  Mjerna jedinica
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className={inputClasses}
                >
                  <option value="m">Metri (m²)</option>
                  <option value="km">Kilometri (km²)</option>
                  <option value="ha">Hektari (ha)</option>
                  <option value="a">Ari (a)</option>
                  <option value="ft">Stope (ft²)</option>
                  <option value="yd">Jardi (yd²)</option>
                  <option value="ac">Akeri (ac)</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleCalculate}
                className="flex-1 py-3 px-4 bg-teal-600 text-white rounded-lg
                         hover:bg-teal-700 transition-colors duration-200"
              >
                Izračunaj
              </button>
              <button
                onClick={handleReset}
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
                <path
                  d={generateSvgPath()}
                  fill="rgba(20, 184, 166, 0.2)"
                  stroke="rgb(20, 184, 166)"
                  strokeWidth="2"
                />
                {points.map((point, index) => {
                  // Find min and max coordinates to scale the drawing
                  const xValues = points.map(p => p.x);
                  const yValues = points.map(p => p.y);
                  const minX = Math.min(...xValues);
                  const maxX = Math.max(...xValues);
                  const minY = Math.min(...yValues);
                  const maxY = Math.max(...yValues);
                  
                  // Scale and translate points to fit in the SVG
                  const width = 300;
                  const height = 200;
                  const padding = 20;
                  
                  const scaleX = (maxX - minX) === 0 ? 1 : (width - 2 * padding) / (maxX - minX);
                  const scaleY = (maxY - minY) === 0 ? 1 : (height - 2 * padding) / (maxY - minY);
                  
                  const scale = Math.min(scaleX, scaleY);
                  
                  const x = padding + (point.x - minX) * scale;
                  const y = height - padding - (point.y - minY) * scale;
                  
                  return (
                    <g key={index}>
                      <circle cx={x} cy={y} r="4" fill="rgb(20, 184, 166)" />
                      <text x={x + 5} y={y - 5} fontSize="12" fill="#4B5563">{index + 1}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
            
            {result !== null ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Objašnjenje:</h3>
                  <p className="text-gray-600">
                    Površina je izračunata pomoću formule za nepravilni poligon (Gauss-ova formula) na temelju koordinata koje ste unijeli.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Površina:</h3>
                  <p className="text-3xl font-bold text-teal-600">
                    {(() => {
                      let finalResult = result;
                      let unitSymbol = 'm²';
                      
                      // Convert to selected unit
                      if (unit === 'km') {
                        finalResult = result / 1000000;
                        unitSymbol = 'km²';
                      } else if (unit === 'ha') {
                        finalResult = result / 10000;
                        unitSymbol = 'ha';
                      } else if (unit === 'a') {
                        finalResult = result / 100;
                        unitSymbol = 'a';
                      } else if (unit === 'ft') {
                        finalResult = result * 10.7639;
                        unitSymbol = 'ft²';
                      } else if (unit === 'yd') {
                        finalResult = result * 1.19599;
                        unitSymbol = 'yd²';
                      } else if (unit === 'ac') {
                        finalResult = result / 4046.86;
                        unitSymbol = 'ac';
                      }
                      
                      return `${finalResult.toLocaleString('hr-HR', { maximumFractionDigits: 4 })} ${unitSymbol}`;
                    })()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Unesite koordinate točaka zemljišta i kliknite "Izračunaj" za izračun površine.
                </p>
                
                <div className="p-4 bg-teal-50 rounded-lg">
                  <h3 className="text-lg font-medium text-teal-800 mb-2">Kako koristiti:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-teal-700">
                    <li>Unesite koordinate točaka koje označavaju granice zemljišta</li>
                    <li>Dodajte više točaka ako je potrebno pomoću gumba "+"</li>
                    <li>Točke unosite u smjeru kazaljke na satu ili obrnuto</li>
                    <li>Odaberite željenu mjernu jedinicu</li>
                    <li>Kliknite "Izračunaj" za dobivanje površine</li>
                  </ol>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Savjet:</h3>
                  <p className="text-blue-700">
                    Za preciznije rezultate, koristite stvarne koordinate zemljišta. Možete koristiti GPS koordinate, katastarske podatke ili mjerenja na terenu.
                  </p>
                </div>
              </div>
            )}
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
