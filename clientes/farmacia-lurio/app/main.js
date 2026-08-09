const { app, BrowserWindow, ipcMain, net } = require('electron');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const ThermalPrinter = require('node-thermal-printer');

// 🔗 CONFIGURAÇÃO DA NUVEM (Alterar com o IP/Domínio do servidor)
const CLOUD_URL = 'http://SEU_IP_OU_DOMINIO:3000/api/sync';
const API_KEY = 'lurio_secret_2024'; // Deve bater com o servidor

// Identificar unidade (passe 'filial' ou 'sede' como argumento ao iniciar)
const BRANCH = process.argv.includes('filial') ? 'filial' : 'sede';

let db;
let mainWindow;

app.on('ready', () => {
  // Inicializar SQLite
  const dbDir = path.join(app.getPath('userData'), 'database');
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
  const dbPath = path.join(dbDir, 'lurio.db');
  db = new Database(dbPath);

  const schema = fs.readFileSync(path.join(__dirname, 'database/init.sql'), 'utf8');
  db.exec(schema);

  // Janela Principal
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Farmácia Lurio',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');

  // Iniciar Auto-Sync
  startAutoSync();
});

// 🔌 IPC HANDLERS
ipcMain.handle('db:products', () => db.prepare('SELECT * FROM products').all());
ipcMain.handle('db:batches', () => db.prepare('SELECT b.*, p.name as product_name FROM batches b JOIN products p ON b.product_id = p.id').all());
ipcMain.handle('db:sales', () => db.prepare('SELECT * FROM sales ORDER BY date DESC').all());

ipcMain.handle('db:add-product', (_, data) => {
  return db.prepare('INSERT OR IGNORE INTO products (name, barcode, cost, price) VALUES (?, ?, ?, ?)').run(data.name, data.barcode, data.cost, data.price);
});

ipcMain.handle('db:add-batch', (_, data) => {
  return db.prepare('INSERT INTO batches (product_id, lot, quantity, expiry_date) VALUES (?, ?, ?, ?)').run(data.product_id, data.lot, data.quantity, data.expiry_date);
});

ipcMain.handle('db:checkout', (_, sale) => {
  const tx = db.transaction(() => {
    db.prepare('INSERT INTO sales (id, branch, total, items, paid, date, synced) VALUES (?, ?, ?, ?, ?, ?, 0)')
      .run(sale.id, BRANCH, sale.total, JSON.stringify(sale.items), sale.paid, sale.date);
    
    sale.items.forEach(item => {
      db.prepare('UPDATE batches SET quantity = quantity - ? WHERE id = ?').run(item.qty, item.batch_id);
    });
  });
  tx();
  return { success: true };
});

ipcMain.handle('db:product-by-barcode', (_, barcode) => {
  return db.prepare(`
    SELECT p.*, b.id as batch_id, b.quantity, b.expiry_date 
    FROM products p 
    JOIN batches b ON p.id = b.product_id 
    WHERE p.barcode = ? AND b.quantity > 0
  `).get(barcode);
});

ipcMain.handle('db:pending-sync', () => {
  return db.prepare('SELECT * FROM sales WHERE synced = 0').all();
});

ipcMain.handle('db:mark-synced', (_, ids) => {
  db.prepare(`UPDATE sales SET synced = 1 WHERE id IN (${ids.join(',')})`).run();
  return { success: true };
});

// 🖨️ IMPRESSÃO TÉRMICA
ipcMain.handle('print-receipt', async (_, sale) => {
  try {
    const printer = new ThermalPrinter({ type: 'EPSON', interface: 'auto' });
    printer.alignCenter();
    printer.println('FARMÁCIA LURIO');
    printer.println('--------------------------------');
    printer.println(`Venda #${sale.id.toString().slice(-6)}`);
    printer.println(new Date(sale.date).toLocaleString('pt-BR'));
    printer.println('--------------------------------');
    sale.items.forEach(i => {
      printer.println(`${i.name.substring(0, 18).padEnd(18)} ${i.qty}x ${i.price.toFixed(2)}`);
    });
    printer.println('--------------------------------');
    printer.println(`TOTAL: ${sale.total.toFixed(2)} MT`);
    printer.println(`PAGO:  ${sale.paid.toFixed(2)} MT`);
    printer.println(`TROCO: ${(sale.paid - sale.total).toFixed(2)} MT`);
    printer.println('--------------------------------');
    printer.println('Obrigado pela preferência!');
    printer.cut();
    await printer.execute();
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

// 🔄 AUTO-SYNC (100% automático quando online)
function startAutoSync() {
  setInterval(async () => {
    if (!net.isOnline()) return;
    try {
      const pending = db.prepare('SELECT * FROM sales WHERE synced = 0').all();
      if (pending.length === 0) return;

      console.log(` Sincronizando ${pending.length} venda(s)...`);
      const res = await net.fetch(CLOUD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ branch: BRANCH, sales: pending })
      });
      const data = await res.json();
      if (data.success) {
        db.prepare(`UPDATE sales SET synced = 1 WHERE id IN (${pending.map(s => s.id).join(',')})`).run();
        console.log('✅ Sync concluído');
      }
    } catch (e) {
      console.warn('⚠️ Sync falhou (internet instável ou servidor offline)');
    }
  }, 15000); // A cada 15 segundos
}

app.on('window-all-closed', () => app.quit());