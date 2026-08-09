import { Pool } from "pg";

export interface SyncOperation {
  table: string;
  recordId: string;
  operation: "INSERT" | "UPDATE" | "DELETE";
  payload: Record<string, any>;
  branchId: string;
}

export const processSyncBatch = async (pool: Pool, batchId: string, branchId: string, operations: SyncOperation[]) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("INSERT INTO sync_batches (id, branch_id, status) VALUES ($1, $2, $3)", [batchId, branchId, "processing"]);

    let processedCount = 0;
    for (const op of operations) {
      try {
        await applyOperation(client, op, batchId);
        processedCount++;
      } catch (opError: any) {
        // Log operation error but continue processing other operations in the batch
        console.error(`Erro ao processar operação ${op.recordId} na tabela ${op.table}: ${opError.message}`);
        await client.query("INSERT INTO sync_records (batch_id, table_name, record_id, operation, payload, processed, error_log) VALUES ($1, $2, $3, $4, $5, false, $6)",
          [batchId, op.table, op.recordId, op.operation, JSON.stringify(op.payload), opError.message]);
      }
    }

    await client.query("UPDATE sync_batches SET status = $1, processed_count = $2 WHERE id = $3", ["completed", processedCount, batchId]);
    await client.query("COMMIT");
    return { success: true, processedCount };
  } catch (error: any) {
    await client.query("ROLLBACK");
    await client.query("UPDATE sync_batches SET status = $1, error_log = $2 WHERE id = $3", ["failed", error.message, batchId]);
    return { success: false, error: error.message };
  } finally {
    client.release();
  }
};

const applyOperation = async (client: any, op: SyncOperation, batchId: string) => {
  const { table, recordId, operation, payload, branchId } = op;

  // Check if record already processed in this batch (idempotency)
  const existingRecord = await client.query("SELECT 1 FROM sync_records WHERE batch_id = $1 AND record_id = $2 AND table_name = $3 AND operation = $4",
    [batchId, recordId, table, operation]);
  if (existingRecord.rows.length > 0) {
    console.log(`Operação ${recordId} já processada no batch ${batchId}. Ignorando.`);
    return; // Already processed, skip
  }

  switch (table) {
    case "products":
      if (operation === "INSERT") {
        await client.query(`INSERT INTO products (id, branch_id, name, category, cost_price, sell_price, barcode, min_stock, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [recordId, branchId, payload.name, payload.category, payload.cost_price, payload.sell_price, payload.barcode, payload.min_stock, payload.created_at || new Date()]);
      } else if (operation === "UPDATE") {
        await client.query(`UPDATE products SET name = $1, category = $2, cost_price = $3, sell_price = $4, min_stock = $5 WHERE id = $6 AND branch_id = $7`,
          [payload.name, payload.category, payload.cost_price, payload.sell_price, payload.min_stock, recordId, branchId]);
      } else if (operation === "DELETE") {
        await client.query(`DELETE FROM products WHERE id = $1 AND branch_id = $2`, [recordId, branchId]);
      }
      break;
    case "batches":
      if (operation === "INSERT") {
        await client.query(`INSERT INTO batches (id, product_id, branch_id, expiry_date, quantity, status) VALUES ($1, $2, $3, $4, $5, $6)`,
          [recordId, payload.product_id, branchId, payload.expiry_date, payload.quantity, payload.status || 'active']);
      } else if (operation === "UPDATE") {
        await client.query(`UPDATE batches SET quantity = $1, status = $2 WHERE id = $3 AND branch_id = $4`,
          [payload.quantity, payload.status, recordId, branchId]);
      } else if (operation === "DELETE") {
        await client.query(`DELETE FROM batches WHERE id = $1 AND branch_id = $2`, [recordId, branchId]);
      }
      break;
    case "sales":
      if (operation === "INSERT") {
        await client.query(`INSERT INTO sales (id, branch_id, operator, payment_method, total_amount, created_at) VALUES ($1, $2, $3, $4, $5, $6)`,
          [recordId, branchId, payload.operator, payload.payment_method, payload.total_amount, payload.created_at || new Date()]);
      }
      break;
    case "sale_items":
      if (operation === "INSERT") {
        // Business rule: Check batch status and quantity before allowing sale item insertion
        const batch = await client.query("SELECT quantity, status FROM batches WHERE id = $1 FOR UPDATE", [payload.batch_id]);
        if (!batch.rows.length) throw new Error("Lote não encontrado");
        if (batch.rows[0].status === "expired") throw new Error("Venda bloqueada: lote expirado");
        if (batch.rows[0].quantity < payload.quantity) throw new Error("Stock insuficiente");

        await client.query(`INSERT INTO sale_items (id, sale_id, batch_id, quantity, unit_price, subtotal) VALUES ($1, $2, $3, $4, $5, $6)`,
          [recordId, payload.sale_id, payload.batch_id, payload.quantity, payload.unit_price, payload.subtotal]);
        await client.query("UPDATE batches SET quantity = quantity - $1 WHERE id = $2", [payload.quantity, payload.batch_id]);
      }
      break;
    case "alerts":
      if (operation === "INSERT") {
        await client.query(`INSERT INTO alerts (id, branch_id, type, severity, title, message, metadata, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [recordId, branchId, payload.type, payload.severity, payload.title, payload.message, JSON.stringify(payload.metadata), payload.status || 'active', payload.created_at || new Date()]);
      } else if (operation === "UPDATE") {
        await client.query(`UPDATE alerts SET status = $1, acknowledged_at = $2, acknowledged_by = $3 WHERE id = $4 AND branch_id = $5`,
          [payload.status, payload.acknowledged_at, payload.acknowledged_by, recordId, branchId]);
      }
      break;
    case "cost_movements":
      if (operation === "INSERT") {
        await client.query(`INSERT INTO cost_movements (id, batch_id, branch_id, movement_type, quantity, unit_cost, total_cost, reason, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [recordId, payload.batch_id, branchId, payload.movement_type, payload.quantity, payload.unit_cost, payload.total_cost, payload.reason, payload.created_at || new Date()]);
      }
      break;
    case "losses":
      if (operation === "INSERT") {
        await client.query(`INSERT INTO losses (id, branch_id, batch_id, loss_type, quantity, cost_value, recorded_by, notes, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [recordId, branchId, payload.batch_id, payload.loss_type, payload.quantity, payload.cost_value, payload.recorded_by, payload.notes, payload.created_at || new Date()]);
      }
      break;
    default:
      console.warn(`Tabela ${table} não suportada para sincronização.`);
      break;
  }

  await client.query("INSERT INTO sync_records (batch_id, table_name, record_id, operation, payload, processed) VALUES ($1, $2, $3, $4, $5, true)",
    [batchId, table, recordId, operation, JSON.stringify(payload)]);
};
