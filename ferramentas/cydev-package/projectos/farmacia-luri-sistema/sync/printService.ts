import { ipcRenderer } from 'electron';

export interface ReceiptPayload {
  branchName: string; address: string; phone: string;
  saleId: string; operator: string; date: string;
  items: Array<{ name: string; qty: number; price: number; total: number }>;
  subtotal: number; tax: number; total: number;
  paymentMethod: string; amountPaid: number; change: number;
}

export const printReceipt = async (receipt: ReceiptPayload) => {
  return ipcRenderer.invoke('printer:receipt', receipt);
};

export const checkPrinterStatus = async () => {
  return ipcRenderer.invoke('printer:status');
};