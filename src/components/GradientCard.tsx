import React from 'react';

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientCard({ children, className = '' }: GradientCardProps) {
  return (
    <div className={`
      bg-gradient-to-br from-white to-blue-50
      shadow-lg rounded-2xl p-6 
      border border-white/20
      backdrop-blur-sm
      ${className}
    `}>
      {children}
    </div>
  );
}