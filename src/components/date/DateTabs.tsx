import React, { useState } from 'react';
import { DateDifferenceCalculator } from './DateDifferenceCalculator';
import { DateAddSubtract } from './DateAddSubtract';
import { WorkingDaysCalculator } from './WorkingDaysCalculator';
import { AgeCalculator } from './AgeCalculator';
import { EventCountdown } from './EventCountdown';
import './date-tabs.css';

// Using SVG directly to avoid icon issues
const TabIcons = {
  difference: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 14v1" />
      <path d="M9 19v2" />
      <path d="M9 3v2" />
      <path d="M9 9v1" />
      <path d="M15 14v1" />
      <path d="M15 19v2" />
      <path d="M15 3v2" />
      <path d="M15 9v1" />
    </svg>
  ),
  addSubtract: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M15 3v18" />
      <path d="M9 15l3-3 3 3" />
      <path d="M10 9h4" />
    </svg>
  ),
  workingDays: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M8 3v3" />
      <path d="M16 3v3" />
      <path d="M3 9h18" />
      <path d="M9 14h6" />
      <path d="M9 18h6" />
    </svg>
  ),
  age: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  countdown: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
};

type TabType = 'difference' | 'addSubtract' | 'workingDays' | 'age' | 'countdown';

interface TabProps {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface DateTabsProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

export function DateTabs({ activeTab: externalActiveTab, onTabChange }: DateTabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<TabType>('difference');

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
      id: 'difference',
      label: 'Razlika Datuma',
      icon: TabIcons.difference,
      description: 'Izračunajte razliku između dva datuma u danima, tjednima, mjesecima i godinama'
    },
    {
      id: 'addSubtract',
      label: 'Dodaj/Oduzmi',
      icon: TabIcons.addSubtract,
      description: 'Dodajte ili oduzmite dane, tjedne, mjesece ili godine od datuma'
    },
    {
      id: 'workingDays',
      label: 'Radni Dani',
      icon: TabIcons.workingDays,
      description: 'Izračunajte radne dane između dva datuma, isključujući vikende i praznike'
    },
    {
      id: 'age',
      label: 'Kalkulator Starosti',
      icon: TabIcons.age,
      description: 'Izračunajte točnu starost u godinama, mjesecima i danima'
    },
    {
      id: 'countdown',
      label: 'Odbrojavanje',
      icon: TabIcons.countdown,
      description: 'Stvorite odbrojavanje do važnih datuma i događaja'
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
                  ? 'border-purple-500 text-purple-600'
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
        {activeTab === 'difference' && <DateDifferenceCalculator />}
        {activeTab === 'addSubtract' && <DateAddSubtract />}
        {activeTab === 'workingDays' && <WorkingDaysCalculator />}
        {activeTab === 'age' && <AgeCalculator />}
        {activeTab === 'countdown' && <EventCountdown />}
      </div>
    </div>
  );
}
