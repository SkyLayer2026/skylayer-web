const express = require('express');
const router = express.Router();
const db = require('../database');

// Get dashboard summary
router.get('/summary', (req, res) => {
  try {
    // Total products
    const totalProducts = db.prepare('SELECT COUNT(*) as count FROM products').get();
    
    // Low stock products
    const lowStock = db.prepare('SELECT COUNT(*) as count FROM products WHERE stock_quantity <= min_stock').get();
    
    // Total stock value (at cost price)
    const stockValue = db.prepare('SELECT COALESCE(SUM(stock_quantity * cost_price), 0) as total FROM products').get();
    
    // Today's sales
    const todaySales = db.prepare(`
      SELECT COUNT(*) as count, COALESCE(SUM(total), 0) as total
      FROM sales 
      WHERE date(sale_date) = date('now')
    `).get();
    
    // Month's sales
    const monthSales = db.prepare(`
      SELECT COUNT(*) as count, COALESCE(SUM(total), 0) as total
      FROM sales 
      WHERE strftime('%Y-%m', sale_date) = strftime('%Y-%m', 'now')
    `).get();
    
    // Financial summary (current month)
    const income = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM financial_transactions 
      WHERE type = 'income' AND status = 'paid' 
      AND strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')
    `).get();
    
    const expenses = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM financial_transactions 
      WHERE type = 'expense' AND status = 'paid' 
      AND strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')
    `).get();
    
    res.json({
      total_products: totalProducts.count,
      low_stock_products: lowStock.count,
      stock_value: stockValue.total,
      today_sales_count: todaySales.count,
      today_sales_total: todaySales.total,
      month_sales_count: monthSales.count,
      month_sales_total: monthSales.total,
      month_income: income.total,
      month_expenses: expenses.total,
      month_profit: income.total - expenses.total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recent sales
router.get('/recent-sales', (req, res) => {
  try {
    const sales = db.prepare(`
      SELECT * FROM sales ORDER BY sale_date DESC LIMIT 10
    `).all();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get low stock products
router.get('/low-stock', (req, res) => {
  try {
    const products = db.prepare(`
      SELECT * FROM products WHERE stock_quantity <= min_stock ORDER BY stock_quantity ASC
    `).all();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get sales by category
router.get('/sales-by-category', (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    let dateFilter = '';
    const params = [];
    
    if (start_date && end_date) {
      dateFilter = ' AND s.sale_date BETWEEN ? AND ?';
      params.push(start_date, end_date);
    }
    
    const categories = db.prepare(`
      SELECT p.category, COUNT(DISTINCT si.id) as items_sold, SUM(si.total) as total
      FROM sale_items si
      JOIN products p ON si.product_id = p.id
      JOIN sales s ON si.sale_id = s.id
      WHERE 1=1 ${dateFilter}
      GROUP BY p.category
      ORDER BY total DESC
    `).all(...params);
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get top products
router.get('/top-products', (req, res) => {
  try {
    const { limit, start_date, end_date } = req.query;
    
    let dateFilter = '';
    const params = [];
    
    if (start_date && end_date) {
      dateFilter = ' AND s.sale_date BETWEEN ? AND ?';
      params.push(start_date, end_date);
    }
    
    const topProducts = db.prepare(`
      SELECT p.id, p.name, p.category, SUM(si.quantity) as total_sold, SUM(si.total) as total_revenue
      FROM sale_items si
      JOIN products p ON si.product_id = p.id
      JOIN sales s ON si.sale_id = s.id
      WHERE 1=1 ${dateFilter}
      GROUP BY p.id
      ORDER BY total_sold DESC
      LIMIT ?
    `).all(...params, limit || 10);
    
    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get daily sales for chart
router.get('/daily-sales', (req, res) => {
  try {
    const { days } = req.query;
    const numDays = days || 30;
    
    const dailySales = db.prepare(`
      SELECT 
        strftime('%Y-%m-%d', sale_date) as date,
        COUNT(*) as count,
        SUM(total) as total
      FROM sales
      WHERE sale_date >= date('now', '-${numDays} days')
      GROUP BY date
      ORDER BY date ASC
    `).all();
    
    res.json(dailySales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
