PRAGMA journal_mode=WAL;
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
    status TEXT CHECK(status IN (
        'active',
        'expiring',
        'expired'
    )) DEFAULT 'active'
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

CREATE TABLE IF NOT EXISTS sync_queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name TEXT NOT NULL,
    record_id TEXT NOT NULL,
    operation TEXT CHECK(operation IN (
        'INSERT',
        'UPDATE',
        'DELETE'
    )),
    payload TEXT,
    branch_id TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS alerts (
    id TEXT PRIMARY KEY,
    branch_id TEXT NOT NULL,
    type TEXT CHECK(type IN (
        'low_stock',
        'expiring_30d',
        'expiring_7d',
        'expired',
        'sync_delay',
        'low_margin'
    )),
    severity TEXT CHECK(severity IN (
        'info',
        'warning',
        'critical'
    )),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    metadata TEXT,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    acknowledged_at DATETIME,
    acknowledged_by TEXT,
    synced BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS cost_movements (
    id TEXT PRIMARY KEY,
    batch_id TEXT REFERENCES batches(id),
    branch_id TEXT REFERENCES branches(id),
    movement_type TEXT CHECK(movement_type IN (
        'purchase',
        'adjustment',
        'loss',
        'return'
    )),
    quantity INTEGER NOT NULL,
    unit_cost DECIMAL(10,2) NOT NULL,
    total_cost DECIMAL(10,2) NOT NULL,
    reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS losses (
    id TEXT PRIMARY KEY,
    branch_id TEXT REFERENCES branches(id),
    batch_id TEXT REFERENCES batches(id),
    loss_type TEXT CHECK(loss_type IN (
        'expired',
        'damage',
        'theft',
        'adjustment'
    )),
    quantity INTEGER NOT NULL,
    cost_value DECIMAL(10,2) NOT NULL,
    recorded_by TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_batches_expiry ON batches(expiry_date, status);
CREATE INDEX IF NOT EXISTS idx_sync_queue_status ON sync_queue(status, branch_id);
CREATE INDEX IF NOT EXISTS idx_alerts_branch ON alerts(branch_id, status, created_at);
CREATE INDEX IF NOT EXISTS idx_cost_movements ON cost_movements(batch_id, created_at);
