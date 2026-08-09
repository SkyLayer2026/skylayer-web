import { ipcMain } from "electron";
import { printReceiptNative } from "../services/printerService";

ipcMain.handle("printer:receipt", async (_, data) => {
  return await printReceiptNative(data);
});

ipcMain.handle("printer:status", async () => {
  // Implementar lógica para verificar status da impressora, se necessário
  return { status: "ready" };
});
