const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// 🔐 CONFIGURAÇÃO (Altere para produção)
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || 'lurio_cloud_2024_secure'; // Deve bater com app/main.js
const DB_PATH = path.join(__dirname, 'lurio_cloud.db');

// 🗄️ Inicializar SQLite
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Schema Central
db.exec(`
  CREATE TABLE IF NOT EXISTS branches (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    last_sync DATETIME
  );
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    branch TEXT NOT NULL,
    name TEXT NOT NULL,
    barcode TEXT UNIQUE NOT NULL,
    cost REAL,
    price REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY,
    branch TEXT NOT NULL,
    total REAL NOT NULL,
    items TEXT NOT NULL,
    paid REAL NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(date);
  CREATE INDEX IF NOT EXISTS idx_sales_branch ON sales(branch);
  CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode);

  INSERT OR IGNORE INTO branches (id, name) VALUES ('sede', 'Sede'), ('filial', 'Filial');
`);

// 🔒 Middleware de Autenticação
const authenticate = (req, res, next) => {
  const key = req.headers['x-api-key'];
  if (key !== API_KEY) return res.status(403).json({ error: 'Acesso negado. Chave inválida.' });
  next();
};

//  ENDPOINT: Recebe sync das farmácias
app.post('/api/sync', authenticate, (req, res) => {
  const { branch, sales, products } = req.body;
  if (!branch) return res.status(400).json({ error: 'Identificação da filial obrigatória.' });

  console.log(`[${new Date().toISOString()}] 📥 Sync recebido de: ${branch}`);

  const tx = db.transaction(() => {
    // 1. Produtos (Upsert por barcode para evitar duplicação)
    for (const p of products || []) {
      db.prepare(`
        INSERT INTO products (branch, name, barcode, cost, price)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(barcode) DO UPDATE SET
          name = excluded.name, cost = excluded.cost, price = excluded.price
      `).run(branch, p.name, p.barcode, p.cost, p.price);
    }

    // 2. Vendas (Ignora se ID já existir)
    for (const s of sales || []) {
      db.prepare(`
        INSERT OR IGNORE INTO sales (id, branch, total, items, paid, date)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(s.id, branch, s.total, JSON.stringify(s.items), s.paid, s.date);
    }

    // 3. Atualiza timestamp de sync da filial
    db.prepare(`
      INSERT OR REPLACE INTO branches (id, name, last_sync)
      VALUES (?, ?, ?)
    `).run(branch, branch === 'sede' ? 'Sede' : 'Filial', new Date().toISOString());
  });

  tx();
  res.json({ success: true, message: 'Dados sincronizados com sucesso.' });
});

// 📊 ENDPOINT: Dados para o Dashboard
app.get('/api/stats', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const todaySales = db.prepare(`SELECT * FROM sales WHERE date LIKE ? ORDER BY date DESC`).all(`${today}%`);

  const totalMT = todaySales.reduce((sum, s) => sum + s.total, 0);
  const totalTransactions = todaySales.length;

  const byBranch = db.prepare(`
    SELECT branch, COUNT(*) as count, SUM(total) as total
    FROM sales WHERE date LIKE ? GROUP BY branch
  `).all(`${today}%`);

  res.json({
    today: { totalMT, totalTransactions },
    branches: byBranch,
    lastSync: db.prepare('SELECT * FROM branches').all()
  });
});

// ️ Serve o Dashboard Web
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

//  Iniciar Servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🟢 Servidor Cloud Farmácia Lurio online na porta ${PORT}`);
  console.log(`🔑 API Key: ${API_KEY}`);
  console.log(`🌐 Dashboard: http://0.0.0.0:${PORT}`);
});