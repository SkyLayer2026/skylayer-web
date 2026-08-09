import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  // Database
  checkout: (data: any) => ipcRenderer.invoke("db:checkout", data),
  getProductByBarcode: (barcode: string, branchId: string) => ipcRenderer.invoke("db:product-by-barcode", { barcode, branchId }),
  getPendingSync: (branchId: string) => ipcRenderer.invoke("db:get-pending-sync", branchId),
  markSynced: (ids: string[]) => ipcRenderer.invoke("db:mark-synced", ids),
  // Printer
  printReceipt: (data: any) => ipcRenderer.invoke("printer:receipt", data),
  checkPrinter: () => ipcRenderer.invoke("printer:status"),
  // Alerts
  getAlerts: (status?: string) => ipcRenderer.invoke("db:get-alerts", { status }),
  ackAlert: (id: string) => ipcRenderer.invoke("db:ack-alert", id),
  clearAlerts: () => ipcRenderer.invoke("db:clear-alerts"),
  // Config
  getConfig: () => ipcRenderer.invoke("app:get-config"),
  // System
  isOnline: () => navigator.onLine,
  onOnline: (cb: () => void) => window.addEventListener("online", cb),
  onOffline: (cb: () => void) => window.addEventListener("offline", cb)
});
