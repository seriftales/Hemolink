const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'hemolink',
  user: 'postgres',
  password: 'a',
  port: 5432,
});

async function setupDatabase() {
  try {
    // Şema dosyasını oku
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Şemayı uygula
    await pool.query(schema);
    console.log('Veritabanı şeması başarıyla oluşturuldu');

    // Test verilerini ekle
    await pool.query(`
      INSERT INTO users (name, surname, email, password, age, blood_type)
      VALUES 
        ('Ahmet', 'Yılmaz', 'ahmet@email.com', 'sifre123', 25, 'A+'),
        ('Mehmet', 'Demir', 'mehmet@email.com', 'sifre123', 30, 'B+')
      ON CONFLICT (email) DO NOTHING;

      INSERT INTO hospitals (name, email, password, address, phone, latitude, longitude)
      VALUES 
        ('Memorial Hastanesi', 'memorial@email.com', 'sifre123', 'Piyalepaşa, Okmeydanı Kavşağı, Darülaceze Cd. No:14, 34385 Şişli/İstanbul', '0212 123 4567', 41.0662, 28.9877),
        ('Acıbadem Hastanesi', 'acibadem@email.com', 'sifre123', 'Altunizade, Acıbadem Cd. No:25, 34662 Üsküdar/İstanbul', '0212 765 4321', 41.0167, 29.0333),
        ('Medipol Mega Hastanesi', 'medipol@email.com', 'sifre123', 'Temel Sk. No:1, 34214 Bağcılar/İstanbul', '0212 460 7777', 41.0333, 28.8667),
        ('Liv Hospital', 'liv@email.com', 'sifre123', 'Ulus, Ulus Mah. Canan Sk. No:5, 34340 Beşiktaş/İstanbul', '0212 444 4224', 41.0833, 29.0167),
        ('Anadolu Sağlık Merkezi', 'anadolu@email.com', 'sifre123', 'Cumhuriyet Mah. E-5 Yanyol, No: 40, 34500 Büyükdere/İstanbul', '0216 444 2525', 41.1167, 29.0167)
      ON CONFLICT (email) DO NOTHING;
    `);
    console.log('Test verileri başarıyla eklendi');

  } catch (error) {
    console.error('Veritabanı kurulum hatası:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

setupDatabase(); 