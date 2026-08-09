PRAGMA journal_mode=WAL; -- Segurança contra crash
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS branches (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  branch_id TEXT REFERENCES branches(id),
  name TEXT NOT NULL,
  category TEXT,
  cost_price DECIMAL(10,2),
  sell_price DECIMAL(10,2),
  barcode TEXT UNIQUE,
  min_stock INTEGER DEFAULT 5,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS batches (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products(id),
  branch_id TEXT REFERENCES branches(id),
  expiry_date DATE NOT NULL,
  quantity INTEGER DEFAULT 0,
  status TEXT CHECK(status IN ('active', 'expiring', 'expired')) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS sales (
  id TEXT PRIMARY KEY,
  branch_id TEXT REFERENCES branches(id),
  operator TEXT,
  payment_method TEXT,
  total_amount DECIMAL(10,2),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sale_items (
  id TEXT PRIMARY KEY,
  sale_id TEXT REFERENCES sales(id),
  batch_id TEXT REFERENCES batches(id),
  quantity INTEGER,
  unit_price DECIMAL(10,2),
  subtotal DECIMAL(10,2)
);

-- Fila de sincronização offline
CREATE TABLE IF NOT EXISTS sync_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  table_name TEXT NOT NULL,
  record_id TEXT NOT NULL,
  operation TEXT CHECK(operation IN ('INSERT','UPDATE','DELETE')),
  payload TEXT,
  branch_id TEXT,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_batches_expiry ON batches(expiry_date, status);
CREATE INDEX IF NOT EXISTS idx_sync_queue_status ON sync_queue(status, branch_id);