export const syncService = {
  sendToBackend: async (branchId: string, operations: any[]) => {
    if (!navigator.onLine) return { success: false, reason: "offline" };
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/sync/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-sync-secret": import.meta.env.VITE_SYNC_SECRET },
        body: JSON.stringify({ branchId, operations })
      });
      const data = await res.json();
      if (data.success) {
        // @ts-ignore
        await window.api?.markSynced(operations.map((o: any) => o.recordId));
      }
      return data;
    } catch (err) {
      return { success: false, error: "Falha de rede" };
    }
  }
};
