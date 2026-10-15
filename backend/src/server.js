const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;
let pool;

const startServer = async () => {
  try {
    // Veritabanına bağlan
    pool = await connectDB();
    console.log(' Veritabanı bağlantısı başarılı');

    // Sunucuyu başlat
    app.listen(PORT, () => {
      console.log(` Sunucu ${PORT} portunda çalışıyor`);
    });
  } catch (error) {
    console.error(' Sunucu başlatılırken kritik hata:', error);
    process.exit(1);
  }
};

// Sunucunun güvenli bir şekilde kapatılması (
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} sinyali alındı. Sunucu kapatılıyor...`);
  if (pool) {
    await pool.end();
    console.log('Veritabanı bağlantısı güvenli şekilde kesildi.');
  }
  process.exit(0);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

startServer();