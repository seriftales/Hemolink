const { connectDB } = require('../config/db');
const fs = require('fs');
const path = require('path');

async function setupNotifications() {
  try {
    const db = await connectDB();
    
    // SQL dosyasını oku
    const sqlFile = path.join(__dirname, 'notifications.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    // SQL komutlarını çalıştır
    await db.query(sql);
    
    console.log('Bildirim veritabanı yapıları başarıyla oluşturuldu.');
    
    // Test verisi ekle
    const testData = `
      INSERT INTO notifications (recipient_type, recipient_id, title, message, type)
      VALUES 
        ('user', 1, 'Yeni Kan Talebi', 'Size yakın bir bölgede acil kan talebi var.', 'urgent'),
        ('user', 1, 'Bağış Hatırlatması', 'Son bağışınızdan bu yana 3 ay geçti.', 'reminder'),
        ('hospital', 1, 'Yeni Bağışçı', 'Yeni bir bağışçı sisteme kaydoldu.', 'system');
    `;
    
    await db.query(testData);
    console.log('Test verileri eklendi.');
    
  } catch (error) {
    console.error('Bildirim veritabanı yapıları oluşturulurken hata:', error);
    throw error;
  }
}

// Script'i çalıştır
setupNotifications().catch(console.error); 