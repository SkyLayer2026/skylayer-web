const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const productsRouter = require('./routes/products');
const stockRouter = require('./routes/stock');
const salesRouter = require('./routes/sales');
const financialRouter = require('./routes/financial');
const dashboardRouter = require('./routes/dashboard');

app.use('/api/products', productsRouter);
app.use('/api/stock', stockRouter);
app.use('/api/sales', salesRouter);
app.use('/api/financial', financialRouter);
app.use('/api/dashboard', dashboardRouter);

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
