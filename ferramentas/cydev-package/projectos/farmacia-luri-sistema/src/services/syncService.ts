import { ipcRenderer } from 'electron';

export const syncService = {
  sendToBackend: async (branchId: string, operations: any[]) => {
    if (!navigator.onLine) return { success: false, reason: 'offline' };
    
    try {
      const res = await fetch('http://localhost:3000/api/sync/batch', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-sync-secret': process.env.VITE_SYNC_SECRET || 'luri_sync_2024_secure'
        },
        body: JSON.stringify({ branchId, operations })
      });
      
      const data = await res.json();
      if (data.success) {
        // Marca como synced no SQLite local
        await ipcRenderer.invoke('db:mark-synced', operations.map(o => o.recordId));
      }
      return data;
    } catch (err) {
      return { success: false, error: 'Falha de rede' };
    }
  }
};