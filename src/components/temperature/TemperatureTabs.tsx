import React, { useState } from 'react';
import { BasicConverter } from './BasicConverter';
import { MultiUnitDashboard } from './MultiUnitDashboard';
import { ReferencePoints } from './ReferencePoints';
import { PracticalConverter } from './PracticalConverter';
import './temperature-tabs.css';

// Using SVG directly to avoid icon issues
const TabIcons = {
  basic: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
    </svg>
  ),
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  ),
  reference: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  ),
  practical: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3v3" />
      <path d="M16 3v3" />
      <path d="M4 11h16" />
      <path d="M8 15h2v2H8z" />
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  )
};

type TabType = 'basic' | 'dashboard' | 'reference' | 'practical';

interface TabProps {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export function TemperatureTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('basic');

  const tabs: TabProps[] = [
    {
      id: 'basic',
      label: 'Osnovni Pretvarač',
      icon: TabIcons.basic,
      description: 'Jednostavno pretvorite temperature između različitih jedinica'
    },
    {
      id: 'dashboard',
      label: 'Svi Pretvarači',
      icon: TabIcons.dashboard,
      description: 'Prikaz svih pretvorbi temperature odjednom'
    },
    {
      id: 'reference',
      label: 'Referentne Točke',
      icon: TabIcons.reference,
      description: 'Usporedite temperature s uobičajenim referentnim točkama'
    },
    {
      id: 'practical',
      label: 'Praktični Alati',
      icon: TabIcons.practical,
      description: 'Specijalizirani pretvarači za kuhanje, vrijeme i znanost'
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
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
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
        {activeTab === 'basic' && <BasicConverter />}
        {activeTab === 'dashboard' && <MultiUnitDashboard />}
        {activeTab === 'reference' && <ReferencePoints />}
        {activeTab === 'practical' && <PracticalConverter />}
      </div>
    </div>
  );
}
