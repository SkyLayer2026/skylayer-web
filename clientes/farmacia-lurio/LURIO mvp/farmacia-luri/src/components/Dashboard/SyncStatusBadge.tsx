import React from 'react';
import { SyncStatus } from '../../types/dashboard';

interface SyncStatusBadgeProps {
  branchId: string;
  lastSync: string;
  pendingOperations: number;
  status: 'synced' | 'pending' | 'error';
}

const SyncStatusBadge: React.FC<SyncStatusBadgeProps> = ({ branchId, lastSync, pendingOperations, status }) => {
  const statusColor = status === 'synced' ? 'bg-green-100 text-green-800' : status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800';
  const statusText = status === 'synced' ? 'Sincronizado' : status === 'pending' ? 'Pendente' : 'Erro';

  return (
    <div className={`p-3 rounded-lg ${statusColor} flex items-center space-x-2`}>
      <span className="font-medium">{branchId === 'branch-1' ? 'Sede' : 'Filial'}</span>
      <span>{statusText}</span>
      {status === 'pending' && (
        <span className="text-sm">({pendingOperations} operações)</span>
      )}
      <span className="text-xs text-gray-600">Última sincronização: {new Date(lastSync).toLocaleTimeString()}</span>
    </div>
  );
};

export default SyncStatusBadge;
