import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  // Database
  getProductByBarcode: (barcode: string, branchId: string) => 
    ipcRenderer.invoke("db:product-by-barcode", { barcode, branchId }),
  checkout: (data: any) => 
    ipcRenderer.invoke("db:checkout", data),
  
  // System
  isOnline: () => navigator.onLine,
  onOnline: (cb: () => void) => window.addEventListener("online", cb),
  onOffline: (cb: () => void) => window.addEventListener("offline", cb),
});