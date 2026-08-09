import React from 'react';
import { KPICardProps } from '../../types/dashboard';

const KPICards: React.FC<KPICardProps> = ({ title, value, change, changeType }) => {
  const changeColor = changeType === 'increase' ? 'text-green-500' : changeType === 'decrease' ? 'text-red-500' : 'text-gray-500';

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      {change && (
        <p className={`text-sm ${changeColor} mt-2`}>{change}</p>
      )}
    </div>
  );
};

export default KPICards;
