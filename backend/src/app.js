const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json());

// Routes 
app.use('/api/v1', routes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Sistem Hatası:", err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Sunucu tarafında beklenmeyen bir hata oluştu.' 
  });
});

module.exports = app;