import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import fs from "fs";
import Database from "better-sqlite3";

let db: Database.Database;
let mainWindow: BrowserWindow | null = null; // 🔹 Mantém referência para não ser coletada pelo GC

const isDev = !app.isPackaged;

app.on("ready", () => {
  console.log("[Electron] App ready");

  // 🔹 Inicializar banco de dados
  const dbDir = isDev 
    ? path.join(process.cwd(), "database") 
    : app.getPath("userData");
  
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
  
  const dbPath = path.join(dbDir, "luri.db");
  const schemaPath = path.join(__dirname, isDev ? "../database/schema.sql" : "../database/schema.sql");

  try {
    if (!fs.existsSync(dbPath)) {
      console.log("[DB] Criando banco de dados...");
      db = new Database(dbPath);
      if (fs.existsSync(schemaPath)) {
        db.exec(fs.readFileSync(schemaPath, "utf-8"));
      } else {
        // Schema mínimo de fallback
        db.exec(`
          PRAGMA journal_mode=WAL;
          CREATE TABLE IF NOT EXISTS branches (id TEXT PRIMARY KEY, name TEXT NOT NULL);
          CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, branch_id TEXT, name TEXT NOT NULL, category TEXT, cost_price DECIMAL(10,2), sell_price DECIMAL(10,2), barcode TEXT UNIQUE, min_stock INTEGER DEFAULT 5);
          CREATE TABLE IF NOT EXISTS batches (id TEXT PRIMARY KEY, product_id TEXT, branch_id TEXT, expiry_date DATE NOT NULL, quantity INTEGER DEFAULT 0, status TEXT DEFAULT 'active');
          CREATE TABLE IF NOT EXISTS sales (id TEXT PRIMARY KEY, branch_id TEXT, operator TEXT, payment_method TEXT, total_amount DECIMAL(10,2), created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
          CREATE TABLE IF NOT EXISTS sale_items (id TEXT PRIMARY KEY, sale_id TEXT, batch_id TEXT, quantity INTEGER, unit_price DECIMAL(10,2), subtotal DECIMAL(10,2));
          INSERT OR IGNORE INTO branches (id, name) VALUES ('branch-1', 'Sede'), ('branch-2', 'Filial');
        `);
      }
      db.close();
    }
    db = new Database(dbPath);
    console.log("[DB] Conectado:", dbPath);
  } catch (err) {
    console.error("[DB Error]", err);
  }

  // 🔹 Criar janela principal
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 768,
    title: "Farmácia Luri - Gestão",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false, // 🔹 Necessário para better-sqlite3
    },
  });

  // 🔹 Carregar URL
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173").catch(err => {
      console.error("[LoadURL Error]", err);
      // Fallback: carregar arquivo se o Vite não estiver rodando
      mainWindow?.loadFile(path.join(__dirname, "../dist/index.html"));
    });
    mainWindow.webContents.openDevTools(); // 🔹 Abre DevTools para debug
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  // 🔹 Manter janela aberta mesmo se perder foco
  mainWindow.on("closed", () => {
    console.log("[Electron] Window closed");
    mainWindow = null;
    if (db) db.close();
  });

  mainWindow.on("unresponsive", () => {
    console.warn("[Electron] Window unresponsive");
  });
});

// 🔹 IPC: Buscar produto por código de barras
ipcMain.handle("db:product-by-barcode", async (_, { barcode, branchId }: { barcode: string; branchId: string }) => {
  console.log("[IPC] Buscando produto:", barcode, branchId);
  try {
    if (!db) return null;
    const product = db.prepare(`
      SELECT p.id as product_id, p.name, p.sell_price, b.id as batch_id, b.quantity as batch_qty, b.expiry_date, b.status
      FROM products p 
      JOIN batches b ON p.id = b.product_id 
      WHERE p.barcode = ? AND b.branch_id = ? AND b.status = 'active' 
      ORDER BY b.expiry_date ASC 
      LIMIT 1
    `).get(barcode, branchId);
    console.log("[IPC] Resultado:", product);
    return product || null;
  } catch (e) {
    console.error("[IPC Error]", e);
    return null;
  }
});

// 🔹 IPC: Finalizar venda
ipcMain.handle("db:checkout", async (_, { saleId, branchId, paymentMethod, total, items }: any) => {
  console.log("[IPC] Checkout:", { saleId, branchId, total, itemsCount: items?.length });
  try {
    if (!db) throw new Error("Banco de dados não inicializado");
    
    const tx = db.transaction(() => {
      db.prepare(`
        INSERT INTO sales (id, branch_id, operator, payment_method, total_amount)
        VALUES (?, ?, 'Caixa', ?, ?)
      `).run(saleId, branchId, paymentMethod, total);

      const stmtItem = db.prepare(`
        INSERT INTO sale_items (id, sale_id, batch_id, quantity, unit_price, subtotal)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      const updateBatch = db.prepare(`
        UPDATE batches SET quantity = quantity - ? WHERE id = ?
      `);

      for (const item of items) {
        const batch: any = db.prepare("SELECT quantity, status FROM batches WHERE id = ?").get(item.batchId);
        if (!batch || batch.status === "expired" || batch.quantity < item.quantity) {
          throw new Error(`Stock/Validade inválido para lote ${item.batchId}`);
        }
        stmtItem.run(crypto.randomUUID(), saleId, item.batchId, item.quantity, item.unitPrice, item.subtotal);
        updateBatch.run(item.quantity, item.batchId);
      }
    });

    tx();
    console.log("[IPC] Checkout sucesso");
    return { success: true, saleId };
  } catch (e: any) {
    console.error("[Checkout Error]", e);
    return { success: false, error: e.message };
  }
});

// 🔹 Manter app rodando mesmo se todas as janelas fecharem (útil para debug)
app.on("window-all-closed", () => {
  console.log("[Electron] All windows closed");
  if (process.platform !== "darwin") {
    // app.quit(); // 🔹 Comente esta linha durante o desenvolvimento para manter o app aberto
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) app.emit("ready");
});

// 🔹 Logs de erro global
process.on("uncaughtException", (err) => {
  console.error("[Uncaught Exception]", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("[Unhandled Rejection]", reason);
});