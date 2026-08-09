CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id UUID REFERENCES branches(id),
  name TEXT NOT NULL,
  category TEXT,
  cost_price NUMERIC(10,2),
  sell_price NUMERIC(10,2),
  barcode TEXT UNIQUE,
  min_stock INTEGER DEFAULT 5
);

CREATE TABLE batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id),
  branch_id UUID REFERENCES branches(id),
  expiry_date DATE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  status TEXT CHECK(status IN ('active', 'expiring', 'expired')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id UUID REFERENCES branches(id),
  operator TEXT,
  payment_method TEXT,
  total_amount NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sale_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_id UUID REFERENCES sales(id),
  batch_id UUID REFERENCES batches(id),
  quantity INTEGER,
  unit_price NUMERIC(10,2),
  subtotal NUMERIC(10,2)
);

-- Controle de Sincronização
CREATE TABLE sync_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id UUID REFERENCES branches(id),
  received_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT CHECK(status IN ('processing', 'completed', 'failed')),
  error_log TEXT
);

CREATE TABLE sync_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id UUID REFERENCES sync_batches(id),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  operation TEXT CHECK(operation IN ('INSERT', 'UPDATE', 'DELETE')),
  payload JSONB,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sync_records_processed ON sync_records(processed);
CREATE INDEX idx_batches_status ON batches(expiry_date, status);