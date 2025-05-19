//app.js
const express = require('express');
const { connectDB } = require('./config/db');
const authRoute = require('./routes/routes.js');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', authRoute);

// Global pool variable
let pool;

// Start server
const startServer = async () => {
  try {
    // Connect to database
    pool = await connectDB();
    console.log('Veritabanına bağlanıldı');

    // Make pool available globally
    app.locals.pool = pool;

    // Start server
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Sunucu ${PORT} portunda çalışıyor`);
    });
  } catch (error) {
    console.error('Sunucu başlatma hatası:', error);
    process.exit(1);
  }
};

// Handle process termination
process.on('SIGINT', async () => {
  if (pool) {
    await pool.end();
    console.log('Veritabanı bağlantısı kapatıldı');
  }
  process.exit(0);
});

startServer();
  