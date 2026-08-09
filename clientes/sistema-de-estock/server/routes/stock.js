const express = require('express');
const router = express.Router();
const db = require('../database');

// Register stock entry
router.post('/entry', (req, res) => {
  const { product_id, quantity, unit_cost, total_cost, supplier, notes } = req.body;
  
  try {
    // Start transaction
    const transaction = db.transaction(() => {
      // Insert stock entry
      const entryStmt = db.prepare(`
        INSERT INTO stock_entries (product_id, quantity, unit_cost, total_cost, supplier, notes)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      entryStmt.run(product_id, quantity, unit_cost, total_cost, supplier || '', notes || '');
      
      // Update product stock
      const updateStmt = db.prepare(`
        UPDATE products 
        SET stock_quantity = stock_quantity + ?, cost_price = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
      updateStmt.run(quantity, unit_cost, product_id);
      
      // Record financial transaction
      const financialStmt = db.prepare(`
        INSERT INTO financial_transactions (type, category, description, amount, payment_method, status, notes)
        VALUES ('expense', 'stock_purchase', ?, ?, ?, 'paid', ?)
      `);
      financialStmt.run(
        `Compra de estoque - ${quantity} unidades`,
        total_cost,
        supplier || '',
        notes || ''
      );
    });
    
    transaction();
    res.status(201).json({ message: 'Entrada de estoque registrada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register stock exit
router.post('/exit', (req, res) => {
  const { product_id, quantity, reason, notes } = req.body;
  
  try {
    // Check if product exists and has enough stock
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    if (product.stock_quantity < quantity) {
      return res.status(400).json({ error: 'Quantidade em estoque insuficiente' });
    }
    
    // Start transaction
    const transaction = db.transaction(() => {
      // Insert stock exit
      const exitStmt = db.prepare(`
        INSERT INTO stock_exits (product_id, quantity, reason, notes)
        VALUES (?, ?, ?, ?)
      `);
      exitStmt.run(product_id, quantity, reason, notes || '');
      
      // Update product stock
      const updateStmt = db.prepare(`
        UPDATE products 
        SET stock_quantity = stock_quantity - ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);
      updateStmt.run(quantity, product_id);
    });
    
    transaction();
    res.status(201).json({ message: 'Saída de estoque registrada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get stock entries
router.get('/entries', (req, res) => {
  try {
    const { start_date, end_date, product_id } = req.query;
    
    let query = `
      SELECT se.*, p.name as product_name, p.barcode
      FROM stock_entries se
      JOIN products p ON se.product_id = p.id
      WHERE 1=1
    `;
    const params = [];
    
    if (start_date) {
      query += ' AND se.entry_date >= ?';
      params.push(start_date);
    }
    
    if (end_date) {
      query += ' AND se.entry_date <= ?';
      params.push(end_date);
    }
    
    if (product_id) {
      query += ' AND se.product_id = ?';
      params.push(product_id);
    }
    
    query += ' ORDER BY se.entry_date DESC';
    
    const entries = db.prepare(query).all(...params);
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get stock exits
router.get('/exits', (req, res) => {
  try {
    const { start_date, end_date, product_id } = req.query;
    
    let query = `
      SELECT se.*, p.name as product_name, p.barcode
      FROM stock_exits se
      JOIN products p ON se.product_id = p.id
      WHERE 1=1
    `;
    const params = [];
    
    if (start_date) {
      query += ' AND se.exit_date >= ?';
      params.push(start_date);
    }
    
    if (end_date) {
      query += ' AND se.exit_date <= ?';
      params.push(end_date);
    }
    
    if (product_id) {
      query += ' AND se.product_id = ?';
      params.push(product_id);
    }
    
    query += ' ORDER BY se.exit_date DESC';
    
    const exits = db.prepare(query).all(...params);
    res.json(exits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get stock history for a product
router.get('/history/:product_id', (req, res) => {
  try {
    const entries = db.prepare(`
      SELECT 'entry' as type, quantity, entry_date as date, supplier as source
      FROM stock_entries
      WHERE product_id = ?
      UNION ALL
      SELECT 'exit' as type, quantity, exit_date as date, reason as source
      FROM stock_exits
      WHERE product_id = ?
      ORDER BY date DESC
    `).all(req.params.product_id, req.params.product_id);
    
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
