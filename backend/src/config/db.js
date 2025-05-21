/*
    Bu dosya, PostgreSQL veritabanı bağlantısını yapılandırmak için kullanılır.
*/
const {Pool} = require('pg');  

// Veritabanı bağlantısını sağlayan asenkron fonksiyon
const connectDB = async () => {
  try {
    const pool = new Pool({
      host: 'localhost',
      database: 'postgres', // Mevcut veritabanını kullan
      user: 'postgres',
      password: 'a',
      port: 5432,
    });

    // Bağlantı kontrolü (async)
    await pool.connect();
    console.log('PostgreSQL veritabanına başarıyla bağlanıldı');
    return pool;
  } catch (error) {
    console.error('Veritabanı bağlantı hatası:', error);
    throw error;
  }
};

module.exports = {connectDB}; 

