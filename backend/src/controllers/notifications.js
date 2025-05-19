const { connectDB } = require('../config/db');
const axios = require('axios');

// Kullanıcının bildirimlerini getir
const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id; // JWT'den gelen kullanıcı ID'si
    const db = await connectDB();
    
    const result = await db.query(
      'SELECT * FROM notifications WHERE recipient_type = $1 AND recipient_id = $2 ORDER BY created_at DESC',
      ['user', userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Bildirimler getirilirken hata:', error);
    res.status(500).json({ message: 'Bildirimler getirilirken bir hata oluştu' });
  }
};

// Expo Push Notification gönder
const sendPushNotification = async (pushToken, title, body) => {
  try {
    const message = {
      to: pushToken,
      sound: 'default',
      title: title,
      body: body,
      data: { someData: 'goes here' },
    };

    await axios.post('https://exp.host/--/api/v2/push/send', message);
  } catch (error) {
    console.error('Push notification gönderme hatası:', error);
  }
};

// Kan talebi için bildirim gönder
const sendBloodRequestNotification = async (req, res) => {
  try {
    const { hospitalId, bloodType, requestId } = req.body;
    const db = await connectDB();

    // Hastane bilgilerini al
    const hospitalResult = await db.query(
      'SELECT name FROM hospitals WHERE id = $1',
      [hospitalId]
    );

    if (!hospitalResult.rows[0]) {
      return res.status(404).json({ message: 'Hastane bulunamadı' });
    }

    const hospitalName = hospitalResult.rows[0].name;

    // Aynı kan grubuna sahip kullanıcıları bul
    const usersResult = await db.query(
      'SELECT id, push_token FROM users WHERE blood_type = $1 AND push_token IS NOT NULL',
      [bloodType]
    );

    if (usersResult.rows.length === 0) {
      return res.status(404).json({ message: 'Bu kan grubuna sahip bağışçı bulunamadı' });
    }

    // Her kullanıcıya bildirim gönder
    for (const user of usersResult.rows) {
      // Veritabanına kaydet
      await db.query(
        `INSERT INTO notifications 
        (recipient_type, recipient_id, title, message, type, related_entity_type, related_entity_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          'user',
          user.id,
          'Acil Kan İhtiyacı',
          `${hospitalName} hastanesinde ${bloodType} kan grubuna acil ihtiyaç var.`,
          'urgent',
          'blood_request',
          requestId
        ]
      );

      // Push notification gönder
      if (user.push_token) {
        await sendPushNotification(
          user.push_token,
          'Acil Kan İhtiyacı',
          `${hospitalName} hastanesinde ${bloodType} kan grubuna acil ihtiyaç var.`
        );
      }
    }

    res.json({ 
      message: 'Bildirimler başarıyla gönderildi',
      notifiedUsers: usersResult.rows.length
    });

  } catch (error) {
    console.error('Bildirim gönderilirken hata:', error);
    res.status(500).json({ message: 'Bildirimler gönderilirken bir hata oluştu' });
  }
};

// Bildirimi okundu olarak işaretle
const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.id;
    const db = await connectDB();
    
    const result = await db.query(
      'UPDATE notifications SET is_read = true WHERE id = $1 AND recipient_type = $2 AND recipient_id = $3 RETURNING *',
      [notificationId, 'user', userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Bildirim bulunamadı' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Bildirim güncellenirken hata:', error);
    res.status(500).json({ message: 'Bildirim güncellenirken bir hata oluştu' });
  }
};

// Tüm bildirimleri okundu olarak işaretle
const markAllNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const db = await connectDB();
    
    const result = await db.query(
      'UPDATE notifications SET is_read = true WHERE recipient_type = $1 AND recipient_id = $2 RETURNING *',
      ['user', userId]
    );
    
    res.json({ message: `${result.rowCount} bildirim okundu olarak işaretlendi` });
  } catch (error) {
    console.error('Bildirimler güncellenirken hata:', error);
    res.status(500).json({ message: 'Bildirimler güncellenirken bir hata oluştu' });
  }
};

// Okunmamış bildirim sayısını getir
const getUnreadNotificationCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const db = await connectDB();
    
    const result = await db.query(
      'SELECT COUNT(*) FROM notifications WHERE recipient_type = $1 AND recipient_id = $2 AND is_read = false',
      ['user', userId]
    );
    
    res.json({ count: parseInt(result.rows[0].count) });
  } catch (error) {
    console.error('Okunmamış bildirim sayısı getirilirken hata:', error);
    res.status(500).json({ message: 'Okunmamış bildirim sayısı getirilirken bir hata oluştu' });
  }
};

// Test bildirimi gönder
const sendTestNotification = async (req, res) => {
  try {
    const { userId } = req.params;
    const db = await connectDB();

    // Kullanıcıyı bul
    const userResult = await db.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    if (!userResult.rows[0]) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    const user = userResult.rows[0];

    // Bildirimi veritabanına kaydet
    await db.query(
      `INSERT INTO notifications 
      (recipient_type, recipient_id, title, message, type) 
      VALUES ($1, $2, $3, $4, $5)`,
      [
        'user',
        userId,
        'Test Bildirimi',
        'Bu bir test bildirimidir.',
        'system'
      ]
    );

    // Push notification gönder
    if (user.push_token) {
      await sendPushNotification(
        user.push_token,
        'Test Bildirimi',
        'Bu bir test bildirimidir.'
      );
    }

    res.json({ 
      message: 'Test bildirimi başarıyla gönderildi',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Test bildirimi gönderme hatası:', error);
    res.status(500).json({ message: 'Test bildirimi gönderilirken bir hata oluştu' });
  }
};

module.exports = {
  getUserNotifications,
  sendBloodRequestNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadNotificationCount,
  sendTestNotification
}; 