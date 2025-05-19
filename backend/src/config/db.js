/*
    Bu dosya, PostgreSQL veritabanı bağlantısını yapılandırmak için kullanılır.
*/
const {Pool} = require('pg');  

// Veritabanı bağlantısını sağlayan asenkron fonksiyon
const connectDB = async () => {
  try {
    const pool = new Pool({
      host: 'localhost', // PostgreSQL sunucusunun IP adresi 
      database: 'postgres',
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
    throw error; // Bağlantı hatası durumunda hata fırlat
  }
};

module.exports = {connectDB}; 

