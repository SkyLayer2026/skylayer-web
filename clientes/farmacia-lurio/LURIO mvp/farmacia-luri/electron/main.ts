import { app, BrowserWindow, ipcMain, Notification } from "electron";
import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { autoUpdater } from "electron-updater";
// import { alertEngine } from "./services/alertEngine"; // Comentado por enquanto
import { printReceiptNative } from "./services/printerService";
import "./ipcHandlers/printerHandler";
// import "./ipcHandlers/alertHandler"; // Comentado por enquanto

const USER_DATA = app.getPath("userData");
const CONFIG_PATH = path.join(USER_DATA, "config.json");
const DB_PATH = path.join(USER_DATA, "luri.db");
const SCHEMA_PATH = path.join(__dirname, "../database/schema.sql");

let db: Database.Database;
let mainWindow: BrowserWindow;

app.on("ready", () => {
  // Configuração inicial
  if (!fs.existsSync(CONFIG_PATH)) {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({
      branchId: "branch-1", branchName: "Farmácia Luri - Sede",
      syncUrl: "http://localhost:3000/api/sync",
      syncSecret: "luri_sync_2024_secure", printerInterface: "auto"
    }, null, 2));
  }

  // Banco de dados
  if (!fs.existsSync(DB_PATH)) {
    db = new Database(DB_PATH);
    db.exec(fs.readFileSync(SCHEMA_PATH, "utf-8"));
    db.close();
  }
  db = new Database(DB_PATH);

  // Janela principal
  mainWindow = new BrowserWindow({
    width: 1280, height: 800, webPreferences: {
      preload: path.join(__dirname, "preload.ts"),
      contextIsolation: true, nodeIntegration: false
    }
  });

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  }

  // Auto-update (apenas em produção)
  if (app.isPackaged) {
    autoUpdater.checkForUpdatesAndNotify();
  }

  // Iniciar motor de alertas (comentado por enquanto)
  // const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
  // setInterval(() => alertEngine.checkAll(config.branchId, db), 5 * 60 * 1000);
  // alertEngine.checkAll(config.branchId, db); // Executa imediatamente
});

// IPC: Checkout de venda
ipcMain.handle("db:checkout", async (_, { saleId, branchId, paymentMethod, total, items }) => {
  try {
    const tx = db.transaction(() => {
      db.prepare(`INSERT INTO sales (id, branch_id, operator, payment_method, total_amount) VALUES (?, ?, 'Caixa', ?, ?)`).run(saleId, branchId, paymentMethod, total);
      const stmtItem = db.prepare(`INSERT INTO sale_items (id, sale_id, batch_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?, ?)`);
      const updateBatch = db.prepare(`UPDATE batches SET quantity = quantity - ? WHERE id = ?`);

      for (const item of items) {
        stmtItem.run(item.id, saleId, item.batch_id, item.quantity, item.unit_price, item.subtotal);
        updateBatch.run(item.quantity, item.batch_id);
      }
    });
    tx();
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
});

// IPC: Buscar produto por código de barras
ipcMain.handle("db:product-by-barcode", (_, { barcode, branchId }) => {
  const product = db.prepare(`SELECT p.id as product_id, p.name, p.sell_price, b.id as batch_id, b.quantity as batch_qty, b.expiry_date, b.status FROM products p JOIN batches b ON p.id = b.product_id WHERE p.barcode = ? AND b.branch_id = ? AND b.status = 'active' ORDER BY b.expiry_date ASC LIMIT 1`).get(barcode, branchId);
  return product || null;
});

// IPC: Operações de sync
ipcMain.handle("db:get-pending-sync", (_, branchId) => {
  return db.prepare("SELECT * FROM sync_queue WHERE branch_id = ? AND status = 'pending' LIMIT 100").all(branchId);
});

ipcMain.handle("db:mark-synced", (_, ids: string[]) => {
  const stmt = db.prepare("UPDATE sync_queue SET status = 'synced' WHERE id = ?");
  const tx = db.transaction((ids: string[]) => ids.forEach(id => stmt.run(id)));
  tx(ids);
  return { success: true };
});

app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) app.emit("ready"); });
