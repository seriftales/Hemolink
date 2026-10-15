const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const fs = require('fs');
const { query } = require('../config/db');

async function setupDatabase() {
  try {
    const schemaPath = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    await query(sql);
    console.log('Veritabanı şeması ve test verileri başarıyla oluşturuldu.');
    process.exit(0);
  } catch (error) {
    console.error('Veritabanı kurulum hatası:', error.message);
    process.exit(1);
  }
}

setupDatabase();