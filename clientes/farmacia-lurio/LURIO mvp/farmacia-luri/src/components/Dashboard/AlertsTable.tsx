import React from 'react';
import { AlertData } from '../../types/dashboard';

interface AlertsTableProps {
  alerts: AlertData[];
}

const AlertsTable: React.FC<AlertsTableProps> = ({ alerts }) => {
  const getSeverityColor = (severity: AlertData['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensagem</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td className={`px-6 py-4 whitespace-nowrap ${getSeverityColor(alert.severity)}`}>{alert.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{alert.title}</td>
              <td className="px-6 py-4">{alert.message}</td>
              <td className="px-6 py-4 whitespace-nowrap">{alert.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertsTable;
