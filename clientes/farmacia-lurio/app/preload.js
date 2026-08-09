const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getProducts: () => ipcRenderer.invoke('db:products'),
  getBatches: () => ipcRenderer.invoke('db:batches'),
  getSales: () => ipcRenderer.invoke('db:sales'),
  addProduct: (data) => ipcRenderer.invoke('db:add-product', data),
  addBatch: (data) => ipcRenderer.invoke('db:add-batch', data),
  checkout: (sale) => ipcRenderer.invoke('db:checkout', sale),
  getProductByBarcode: (barcode) => ipcRenderer.invoke('db:product-by-barcode', barcode),
  getPendingSync: () => ipcRenderer.invoke('db:pending-sync'),
  markSynced: (ids) => ipcRenderer.invoke('db:mark-synced', ids),
  printReceipt: (sale) => ipcRenderer.invoke('print-receipt', sale)
});