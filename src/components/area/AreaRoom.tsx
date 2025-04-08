import React, { useState, useEffect } from 'react';
import { GradientCard } from '../GradientCard';

interface Room {
  id: string;
  name: string;
  length: number;
  width: number;
  area: number;
}

export function AreaRoom() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', name: 'Dnevna soba', length: 5, width: 4, area: 20 },
    { id: '2', name: 'Spavaća soba', length: 4, width: 3, area: 12 },
    { id: '3', name: 'Kuhinja', length: 3, width: 2.5, area: 7.5 }
  ]);
  const [newRoom, setNewRoom] = useState<Omit<Room, 'id' | 'area'>>({ name: '', length: 0, width: 0 });
  const [totalArea, setTotalArea] = useState<number>(39.5);
  const [unit, setUnit] = useState<string>('m');
  const [wallHeight, setWallHeight] = useState<number>(2.5);
  const [wallArea, setWallArea] = useState<number>(0);
  const [floorArea, setFloorArea] = useState<number>(0);

  // Calculate areas when rooms change
  useEffect(() => {
    const total = rooms.reduce((sum, room) => sum + room.area, 0);
    setTotalArea(total);
    setFloorArea(total);
    
    // Calculate wall area
    const wallPerimeter = rooms.reduce((sum, room) => {
      // For each room, calculate perimeter
      return sum + 2 * (room.length + room.width);
    }, 0);
    
    setWallArea(wallPerimeter * wallHeight);
  }, [rooms, wallHeight]);

  const handleAddRoom = () => {
    if (newRoom.name && newRoom.length > 0 && newRoom.width > 0) {
      const area = newRoom.length * newRoom.width;
      const newId = (Math.max(...rooms.map(r => parseInt(r.id)), 0) + 1).toString();
      
      setRooms([...rooms, { 
        id: newId, 
        name: newRoom.name, 
        length: newRoom.length, 
        width: newRoom.width, 
        area 
      }]);
      
      setNewRoom({ name: '', length: 0, width: 0 });
    }
  };

  const handleRemoveRoom = (id: string) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  const handleUpdateRoom = (id: string, field: keyof Omit<Room, 'id' | 'area'>, value: string | number) => {
    setRooms(rooms.map(room => {
      if (room.id === id) {
        const updatedRoom = { ...room, [field]: value };
        // Recalculate area if length or width changes
        if (field === 'length' || field === 'width') {
          updatedRoom.area = updatedRoom.length * updatedRoom.width;
        }
        return updatedRoom;
      }
      return room;
    }));
  };

  const handleReset = () => {
    setRooms([
      { id: '1', name: 'Dnevna soba', length: 5, width: 4, area: 20 },
      { id: '2', name: 'Spavaća soba', length: 4, width: 3, area: 12 },
      { id: '3', name: 'Kuhinja', length: 3, width: 2.5, area: 7.5 }
    ]);
    setWallHeight(2.5);
  };

  const formatArea = (area: number): string => {
    let result = area;
    let unitSymbol = 'm²';
    
    // Convert to selected unit
    if (unit === 'cm') {
      result = area * 10000;
      unitSymbol = 'cm²';
    } else if (unit === 'ft') {
      result = area * 10.7639;
      unitSymbol = 'ft²';
    } else if (unit === 'yd') {
      result = area * 1.19599;
      unitSymbol = 'yd²';
    }
    
    return `${result.toLocaleString('hr-HR', { maximumFractionDigits: 2 })} ${unitSymbol}`;
  };

  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent";

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <GradientCard>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Kalkulator Površine Prostorija</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Prostorije</h3>
              
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {rooms.map((room) => (
                  <div key={room.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Naziv prostorije
                        </label>
                        <input
                          type="text"
                          value={room.name}
                          onChange={(e) => handleUpdateRoom(room.id, 'name', e.target.value)}
                          className={inputClasses}
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveRoom(room.id)}
                        className="ml-2 p-2 text-red-500 hover:text-red-700"
                        title="Ukloni prostoriju"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duljina (m)
                        </label>
                        <input
                          type="number"
                          value={room.length}
                          onChange={(e) => handleUpdateRoom(room.id, 'length', parseFloat(e.target.value) || 0)}
                          min="0"
                          step="0.01"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Širina (m)
                        </label>
                        <input
                          type="number"
                          value={room.width}
                          onChange={(e) => handleUpdateRoom(room.id, 'width', parseFloat(e.target.value) || 0)}
                          min="0"
                          step="0.01"
                          className={inputClasses}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-3 text-right">
                      <span className="text-sm font-medium text-gray-700">
                        Površina: {formatArea(room.area)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-md font-medium text-gray-800 mb-3">Dodaj novu prostoriju</h4>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Naziv
                    </label>
                    <input
                      type="text"
                      value={newRoom.name}
                      onChange={(e) => setNewRoom({...newRoom, name: e.target.value})}
                      className={inputClasses}
                      placeholder="Npr. Kupaonica"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duljina (m)
                    </label>
                    <input
                      type="number"
                      value={newRoom.length || ''}
                      onChange={(e) => setNewRoom({...newRoom, length: parseFloat(e.target.value) || 0})}
                      min="0"
                      step="0.01"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Širina (m)
                    </label>
                    <input
                      type="number"
                      value={newRoom.width || ''}
                      onChange={(e) => setNewRoom({...newRoom, width: parseFloat(e.target.value) || 0})}
                      min="0"
                      step="0.01"
                      className={inputClasses}
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddRoom}
                  disabled={!newRoom.name || newRoom.length <= 0 || newRoom.width <= 0}
                  className={`w-full py-2 px-4 rounded-lg text-white
                    ${!newRoom.name || newRoom.length <= 0 || newRoom.width <= 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-teal-600 hover:bg-teal-700 transition-colors duration-200'
                    }`}
                >
                  Dodaj prostoriju
                </button>
              </div>
              
              <div className="space-y-2 pt-2">
                <label className="block text-base font-medium text-gray-700">
                  Visina zidova (m)
                </label>
                <input
                  type="number"
                  value={wallHeight}
                  onChange={(e) => setWallHeight(parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  className={inputClasses}
                />
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
                  <option value="cm">Centimetri (cm²)</option>
                  <option value="ft">Stope (ft²)</option>
                  <option value="yd">Jardi (yd²)</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
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
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex justify-center">
                <svg width="300" height="200" viewBox="0 0 300 200" className="border border-gray-200 rounded">
                  {/* Simple house visualization */}
                  <rect x="50" y="50" width="200" height="120" fill="rgba(20, 184, 166, 0.1)" stroke="rgb(20, 184, 166)" strokeWidth="2" />
                  
                  {/* Divide into rooms based on their proportional areas */}
                  {(() => {
                    const elements = [];
                    let currentX = 50;
                    const totalWidth = 200;
                    
                    // Sort rooms by area (largest first) for better visualization
                    const sortedRooms = [...rooms].sort((a, b) => b.area - a.area);
                    
                    for (const room of sortedRooms) {
                      const roomWidth = (room.area / totalArea) * totalWidth;
                      if (roomWidth > 0) {
                        elements.push(
                          <g key={room.id}>
                            <rect
                              x={currentX}
                              y={50}
                              width={roomWidth}
                              height={120}
                              fill={`rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, 0.3)`}
                              stroke="rgb(20, 184, 166)"
                              strokeWidth="1"
                            />
                            <text
                              x={currentX + roomWidth / 2}
                              y={110}
                              textAnchor="middle"
                              fontSize="10"
                              fill="#4B5563"
                            >
                              {room.name}
                            </text>
                          </g>
                        );
                        currentX += roomWidth;
                      }
                    }
                    
                    return elements;
                  })()}
                </svg>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-teal-50 rounded-lg">
                  <h3 className="text-lg font-medium text-teal-800 mb-2">Ukupna površina poda:</h3>
                  <p className="text-2xl font-bold text-teal-600">
                    {formatArea(floorArea)}
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">Ukupna površina zidova:</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatArea(wallArea)}
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Detalji po prostorijama:</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2">Prostorija</th>
                      <th className="text-right py-2">Dimenzije</th>
                      <th className="text-right py-2">Površina</th>
                      <th className="text-right py-2">Udio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room) => (
                      <tr key={room.id} className="border-b border-gray-200">
                        <td className="py-2">{room.name}</td>
                        <td className="text-right py-2">{room.length} × {room.width} m</td>
                        <td className="text-right py-2">{formatArea(room.area)}</td>
                        <td className="text-right py-2">{((room.area / totalArea) * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="text-lg font-medium text-yellow-800 mb-2">Materijali (procjena):</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>Boja za zidove (1L pokriva ~10m²):</span>
                    <span className="font-medium">{Math.ceil(wallArea / 10)} L</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Parket/laminat (za pod):</span>
                    <span className="font-medium">{formatArea(floorArea)}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Pločice (za kupaonicu, kuhinju):</span>
                    <span className="font-medium">{formatArea(rooms.filter(r => r.name.toLowerCase().includes('kupaonica') || r.name.toLowerCase().includes('kuhinja')).reduce((sum, r) => sum + r.area, 0))}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
