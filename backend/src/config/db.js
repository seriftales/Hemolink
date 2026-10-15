const { Pool } = require('pg');

//Veritabanı Bilgileri
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

//Veritabanına bağlanma
const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log(' PostgreSQL veritabanına başarıyla bağlanıldı');
    client.release(); 
  } catch (error) {
    console.error(' Veritabanı bağlantı hatası:', error.message);
    throw error;
  }
};

module.exports = {
  connectDB,
  query: (text, params) => pool.query(text, params), 
};