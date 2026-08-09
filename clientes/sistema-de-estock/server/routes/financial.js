const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all financial transactions
router.get('/transactions', (req, res) => {
  try {
    const { type, status, category, start_date, end_date } = req.query;
    
    let query = 'SELECT * FROM financial_transactions WHERE 1=1';
    const params = [];
    
    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    
    if (start_date) {
      query += ' AND created_at >= ?';
      params.push(start_date);
    }
    
    if (end_date) {
      query += ' AND created_at <= ?';
      params.push(end_date);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const transactions = db.prepare(query).all(...params);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create financial transaction
router.post('/transactions', (req, res) => {
  try {
    const { type, category, description, amount, payment_method, due_date, status, notes } = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO financial_transactions (type, category, description, amount, payment_method, due_date, status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      type,
      category,
      description,
      amount,
      payment_method || '',
      due_date || null,
      status || 'pending',
      notes || ''
    );
    
    res.status(201).json({ id: result.lastInsertRowid, message: 'Transação criada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update financial transaction
router.put('/transactions/:id', (req, res) => {
  try {
    const { type, category, description, amount, payment_method, due_date, status, paid_date, notes } = req.body;
    
    const stmt = db.prepare(`
      UPDATE financial_transactions 
      SET type = ?, category = ?, description = ?, amount = ?, payment_method = ?, 
          due_date = ?, status = ?, paid_date = ?, notes = ?
      WHERE id = ?
    `);
    
    const result = stmt.run(
      type,
      category,
      description,
      amount,
      payment_method,
      due_date,
      status,
      paid_date || null,
      notes,
      req.params.id
    );
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }
    
    res.json({ message: 'Transação atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete financial transaction
router.delete('/transactions/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM financial_transactions WHERE id = ?').run(req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }
    
    res.json({ message: 'Transação removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get financial summary
router.get('/summary', (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    let dateFilter = '';
    const params = [];
    
    if (start_date && end_date) {
      dateFilter = ' AND created_at BETWEEN ? AND ?';
      params.push(start_date, end_date);
    }
    
    // Total income
    const income = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM financial_transactions 
      WHERE type = 'income' AND status = 'paid' ${dateFilter}
    `).get(...params);
    
    // Total expenses
    const expenses = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM financial_transactions 
      WHERE type = 'expense' AND status = 'paid' ${dateFilter}
    `).get(...params);
    
    // Pending amounts
    const pendingIncome = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM financial_transactions 
      WHERE type = 'income' AND status = 'pending' ${dateFilter}
    `).get(...params);
    
    const pendingExpenses = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM financial_transactions 
      WHERE type = 'expense' AND status = 'pending' ${dateFilter}
    `).get(...params);
    
    // Balance
    const balance = income.total - expenses.total;
    
    res.json({
      total_income: income.total,
      total_expenses: expenses.total,
      balance,
      pending_income: pendingIncome.total,
      pending_expenses: pendingExpenses.total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get financial by category
router.get('/by-category', (req, res) => {
  try {
    const { type, start_date, end_date } = req.query;
    
    let typeFilter = type ? 'AND type = ?' : '';
    let dateFilter = '';
    const params = [];
    
    if (type) params.push(type);
    
    if (start_date && end_date) {
      dateFilter = ' AND created_at BETWEEN ? AND ?';
      params.push(start_date, end_date);
    }
    
    const byCategory = db.prepare(`
      SELECT category, SUM(amount) as total, COUNT(*) as count
      FROM financial_transactions
      WHERE status = 'paid' ${typeFilter} ${dateFilter}
      GROUP BY category
      ORDER BY total DESC
    `).all(...params);
    
    res.json(byCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get daily/monthly revenue
router.get('/revenue-over-time', (req, res) => {
  try {
    const { period, start_date, end_date } = req.query;
    
    let dateFormat;
    if (period === 'monthly') {
      dateFormat = '%Y-%m';
    } else {
      dateFormat = '%Y-%m-%d';
    }
    
    let dateFilter = '';
    const params = [];
    
    if (start_date && end_date) {
      dateFilter = ' AND created_at BETWEEN ? AND ?';
      params.push(start_date, end_date);
    }
    
    const revenue = db.prepare(`
      SELECT 
        strftime('${dateFormat}', created_at) as period,
        SUM(CASE WHEN type = 'income' AND status = 'paid' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'expense' AND status = 'paid' THEN amount ELSE 0 END) as expense,
        SUM(CASE WHEN type = 'income' AND status = 'paid' THEN amount ELSE 0 END) - 
        SUM(CASE WHEN type = 'expense' AND status = 'paid' THEN amount ELSE 0 END) as profit
      FROM financial_transactions
      WHERE 1=1 ${dateFilter}
      GROUP BY period
      ORDER BY period ASC
    `).all(...params);
    
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get payment methods summary
router.get('/payment-methods', (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    let dateFilter = '';
    const params = [];
    
    if (start_date && end_date) {
      dateFilter = ' AND created_at BETWEEN ? AND ?';
      params.push(start_date, end_date);
    }
    
    const methods = db.prepare(`
      SELECT payment_method, COUNT(*) as count, SUM(amount) as total
      FROM financial_transactions
      WHERE type = 'income' AND status = 'paid' AND payment_method != '' ${dateFilter}
      GROUP BY payment_method
      ORDER BY total DESC
    `).all(...params);
    
    res.json(methods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
