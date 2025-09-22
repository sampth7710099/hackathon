import React from 'react';
import { Theme } from '../types';

interface HealthMetricCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  theme: Theme;
}

const HealthMetricCard: React.FC<HealthMetricCardProps> = ({ title, value, icon: Icon, theme, color }) => {
  const cardBg = theme === 'dark' ? 'bg-sky-900/50' : 'bg-white shadow-sm';
  const iconBg = theme === 'dark' ? 'bg-sky-800/50' : 'bg-gray-100';
  const titleColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const valueColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div 
      className={`
        ${cardBg} p-4 rounded-xl flex items-center space-x-4 
        group transition-all duration-300 ease-out transform-gpu 
        hover:[transform:translateZ(20px)_rotateX(15deg)] hover:shadow-xl
        [transform-style:preserve-3d]
      `}>
      <div 
        className={`
          p-3 ${iconBg} rounded-full ${color}
          transition-transform duration-300 ease-out
          group-hover:[transform:translateZ(30px)_scale(1.1)]
        `}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="transition-transform duration-300 ease-out group-hover:[transform:translateZ(20px)]">
        <p className={`text-sm ${titleColor}`}>{title}</p>
        <p className={`text-xl font-bold ${valueColor}`}>{value}</p>
      </div>
    </div>
  );
};

export default HealthMetricCard;