export const SyncStatusBadge = ({ status }: { status: 'online' | 'syncing' | 'offline' | 'error' }) => {
  const colors = { online: '#2e7d32', syncing: '#1976d2', offline: '#757575', error: '#c62828' };
  const labels = { online: '🟢 Sincronizado', syncing: '🔵 Sincronizando...', offline: '⚪ Offline', error: '🔴 Erro de Sync' };
  return (
    <span style={{ background: `${colors[status]}15`, color: colors[status], padding: '6px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
      {labels[status]}
    </span>
  );
};