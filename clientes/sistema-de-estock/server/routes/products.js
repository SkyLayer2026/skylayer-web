const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all products
router.get('/', (req, res) => {
  try {
    const { category, search, low_stock } = req.query;
    
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    
    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ? OR barcode LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    
    if (low_stock === 'true') {
      query += ' AND stock_quantity <= min_stock';
    }
    
    query += ' ORDER BY name ASC';
    
    const products = db.prepare(query).all(...params);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:id', (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product
router.post('/', (req, res) => {
  try {
    const { name, description, category, price, cost_price, stock_quantity, min_stock, barcode } = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO products (name, description, category, price, cost_price, stock_quantity, min_stock, barcode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      name,
      description || '',
      category || '',
      price || 0,
      cost_price || 0,
      stock_quantity || 0,
      min_stock || 10,
      barcode || null
    );
    
    res.status(201).json({ id: result.lastInsertRowid, message: 'Produto criado com sucesso' });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint')) {
      return res.status(400).json({ error: 'Código de barras já existe' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update product
router.put('/:id', (req, res) => {
  try {
    const { name, description, category, price, cost_price, stock_quantity, min_stock, barcode } = req.body;
    
    const stmt = db.prepare(`
      UPDATE products 
      SET name = ?, description = ?, category = ?, price = ?, cost_price = ?, 
          stock_quantity = ?, min_stock = ?, barcode = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    const result = stmt.run(
      name,
      description || '',
      category || '',
      price || 0,
      cost_price || 0,
      stock_quantity,
      min_stock || 10,
      barcode || null,
      req.params.id
    );
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    res.json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint')) {
      return res.status(400).json({ error: 'Código de barras já existe' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete product
router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    
    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get categories
router.get('/categories', (req, res) => {
  try {
    const categories = db.prepare('SELECT DISTINCT category FROM products WHERE category != "" ORDER BY category').all();
    res.json(categories.map(c => c.category));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
