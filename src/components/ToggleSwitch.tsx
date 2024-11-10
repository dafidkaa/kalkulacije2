import React from 'react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
  labelOn?: string;
  labelOff?: string;
}

export function ToggleSwitch({ 
  enabled, 
  onChange, 
  label,
  labelOn = '',
  labelOff = ''
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-base font-medium text-gray-700">{label}</span>
      <button
        type="button"
        className={`
          relative inline-flex h-7 w-14 items-center rounded-full
          transition-colors duration-200 ease-in-out focus:outline-none
          ${enabled ? 'bg-blue-600' : 'bg-gray-200'}
        `}
        onClick={() => onChange(!enabled)}
      >
        <span
          className={`
            inline-block h-5 w-5 transform rounded-full
            bg-white shadow-lg transition-transform duration-200 ease-in-out
            ${enabled ? 'translate-x-8' : 'translate-x-1'}
          `}
        />
        <span className="sr-only">Toggle</span>
        {(labelOn || labelOff) && (
          <span className={`absolute text-xs font-medium ${enabled ? 'left-2 text-white' : 'right-2 text-gray-600'}`}>
            {enabled ? labelOn : labelOff}
          </span>
        )}
      </button>
    </div>
  );
}