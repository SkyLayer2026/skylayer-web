const express = require('express');
const router = express.Router();
const db = require('../database');

// Generate sale number
function generateSaleNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `VND-${year}${month}${day}-${random}`;
}

// Generate receipt number
function generateReceiptNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `REC-${year}${month}${day}-${random}`;
}

// Create sale
router.post('/', (req, res) => {
  const { customer_name, customer_document, items, discount, tax, payment_method, amount_paid, notes } = req.body;
  
  try {
    const transaction = db.transaction(() => {
      // Calculate totals
      let subtotal = 0;
      for (const item of items) {
        subtotal += item.quantity * item.unit_price;
      }
      
      const discountValue = discount || 0;
      const taxValue = tax || 0;
      const total = subtotal - discountValue + taxValue;
      const amountPaid = amount_paid || total;
      const changeAmount = amountPaid - total;
      
      const saleNumber = generateSaleNumber();
      
      // Insert sale
      const saleStmt = db.prepare(`
        INSERT INTO sales (sale_number, customer_name, customer_document, subtotal, discount, tax, total, payment_method, amount_paid, change_amount, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const saleResult = saleStmt.run(
        saleNumber,
        customer_name || 'Cliente Não Identificado',
        customer_document || '',
        subtotal,
        discountValue,
        taxValue,
        total,
        payment_method,
        amountPaid,
        changeAmount >= 0 ? changeAmount : 0,
        notes || ''
      );
      
      const saleId = saleResult.lastInsertRowid;
      
      // Insert sale items and update stock
      const itemStmt = db.prepare(`
        INSERT INTO sale_items (sale_id, product_id, product_name, quantity, unit_price, total)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      
      const updateStockStmt = db.prepare(`
        UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?
      `);
      
      for (const item of items) {
        // Check stock
        const product = db.prepare('SELECT stock_quantity FROM products WHERE id = ?').get(item.product_id);
        if (!product) {
          throw new Error(`Produto ${item.product_id} não encontrado`);
        }
        if (product.stock_quantity < item.quantity) {
          throw new Error(`Estoque insuficiente para o produto ${item.product_name}`);
        }
        
        const itemTotal = item.quantity * item.unit_price;
        itemStmt.run(saleId, item.product_id, item.product_name, item.quantity, item.unit_price, itemTotal);
        updateStockStmt.run(item.quantity, item.product_id);
      }
      
      // Generate receipt
      const receiptNumber = generateReceiptNumber();
      const receiptContent = JSON.stringify({
        sale_number: saleNumber,
        receipt_number: receiptNumber,
        customer_name: customer_name || 'Cliente Não Identificado',
        customer_document: customer_document || '',
        items: items,
        subtotal,
        discount: discountValue,
        tax: taxValue,
        total,
        payment_method,
        amount_paid: amountPaid,
        change_amount: changeAmount >= 0 ? changeAmount : 0,
        date: new Date().toISOString()
      });
      
      const receiptStmt = db.prepare(`
        INSERT INTO receipts (sale_id, receipt_number, content)
        VALUES (?, ?, ?)
      `);
      receiptStmt.run(saleId, receiptNumber, receiptContent);
      
      // Record financial transaction
      const financialStmt = db.prepare(`
        INSERT INTO financial_transactions (type, category, description, amount, payment_method, status, related_sale_id, notes)
        VALUES ('income', 'sale', ?, ?, ?, 'paid', ?, ?)
      `);
      financialStmt.run(
        `Venda ${saleNumber}`,
        total,
        payment_method,
        saleId,
        notes || ''
      );
      
      return { saleId, saleNumber, receiptNumber, total, change_amount: changeAmount >= 0 ? changeAmount : 0 };
    });
    
    const result = transaction();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all sales
router.get('/', (req, res) => {
  try {
    const { start_date, end_date, customer, sale_number } = req.query;
    
    let query = 'SELECT * FROM sales WHERE 1=1';
    const params = [];
    
    if (start_date) {
      query += ' AND sale_date >= ?';
      params.push(start_date);
    }
    
    if (end_date) {
      query += ' AND sale_date <= ?';
      params.push(end_date);
    }
    
    if (customer) {
      query += ' AND (customer_name LIKE ? OR customer_document LIKE ?)';
      params.push(`%${customer}%`, `%${customer}%`);
    }
    
    if (sale_number) {
      query += ' AND sale_number LIKE ?';
      params.push(`%${sale_number}%`);
    }
    
    query += ' ORDER BY sale_date DESC';
    
    const sales = db.prepare(query).all(...params);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single sale with items
router.get('/:id', (req, res) => {
  try {
    const sale = db.prepare('SELECT * FROM sales WHERE id = ?').get(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: 'Venda não encontrada' });
    }
    
    const items = db.prepare('SELECT * FROM sale_items WHERE sale_id = ?').all(req.params.id);
    const receipt = db.prepare('SELECT * FROM receipts WHERE sale_id = ?').get(req.params.id);
    
    res.json({ ...sale, items, receipt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get receipt by sale_id or receipt_number
router.get('/receipt/:identifier', (req, res) => {
  try {
    let receipt;
    
    // Try to find by receipt_number first
    receipt = db.prepare('SELECT * FROM receipts WHERE receipt_number = ?').get(req.params.identifier);
    
    // If not found, try by sale_id
    if (!receipt) {
      const saleId = parseInt(req.params.identifier);
      if (!isNaN(saleId)) {
        receipt = db.prepare('SELECT * FROM receipts WHERE sale_id = ?').get(saleId);
      }
    }
    
    if (!receipt) {
      return res.status(404).json({ error: 'Recibo não encontrado' });
    }
    
    res.json(receipt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sale items
router.get('/:id/items', (req, res) => {
  try {
    const items = db.prepare('SELECT * FROM sale_items WHERE sale_id = ?').all(req.params.id);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
