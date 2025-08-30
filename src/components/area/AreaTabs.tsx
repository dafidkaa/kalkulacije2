import React, { useState } from 'react';
import { AreaForm } from './AreaForm';
import { AreaConverter } from './AreaConverter';
import { AreaLand } from './AreaLand';
import { AreaRoom } from './AreaRoom';
import { AreaRoof } from './AreaRoof';
import './area-tabs.css';
import {
  Square,
  MoveHorizontal,
  MapPin,
  Home,
  Building
} from 'lucide-react';

type TabType = 'shapes' | 'converter' | 'land' | 'room' | 'roof';

interface TabProps {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface AreaTabsProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export function AreaTabs({ activeTab: externalActiveTab, onTabChange }: AreaTabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<TabType>('shapes');

  const activeTab = externalActiveTab || internalActiveTab;

  const handleTabChange = (tab: TabType) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  const tabs: TabProps[] = [
    {
      id: 'shapes',
      label: 'Kalkulator Oblika',
      icon: <Square className="w-5 h-5" />,
      description: 'Izračunajte površinu različitih geometrijskih oblika'
    },
    {
      id: 'converter',
      label: 'Pretvarač Jedinica',
      icon: <MoveHorizontal className="w-5 h-5" />,
      description: 'Pretvorite između različitih jedinica površine'
    },
    {
      id: 'land',
      label: 'Zemljište',
      icon: <MapPin className="w-5 h-5" />,
      description: 'Izračunajte površinu zemljišta i parcela'
    },
    {
      id: 'room',
      label: 'Prostorije',
      icon: <Home className="w-5 h-5" />,
      description: 'Izračunajte površinu prostorija i stambenog prostora'
    },
    {
      id: 'roof',
      label: 'Krov',
      icon: <Building className="w-5 h-5" />,
      description: 'Izračunajte površinu krova i potrebne materijale'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                flex items-center px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap
                ${activeTab === tab.id
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab description */}
      <div className="text-center">
        <p className="text-gray-600">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </p>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'shapes' && <AreaForm />}
        {activeTab === 'converter' && <AreaConverter />}
        {activeTab === 'land' && <AreaLand />}
        {activeTab === 'room' && <AreaRoom />}
        {activeTab === 'roof' && <AreaRoof />}
      </div>
    </div>
  );
}
