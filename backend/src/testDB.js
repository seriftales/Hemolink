const pool = require('./config/db.js');

async function testDbConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Bağlantı başarılı:', res.rows[0]);
  } catch (err) {
    console.error('Bağlantı hatası:', err);
  }
}

testDbConnection();
