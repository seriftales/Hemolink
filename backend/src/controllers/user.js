const { connectDB } = require('../config/db');

// Push token'ı kaydet
const savePushToken = async (req, res) => {
  try {
    const userId = req.user.id;
    const { pushToken } = req.body;

    if (!pushToken) {
      return res.status(400).json({ message: 'Push token gerekli' });
    }

    const pool = req.app.locals.pool;
    if (!pool) {
      throw new Error('Veritabanı bağlantısı bulunamadı');
    }

    // Kullanıcının push token'ını güncelle
    await pool.query(
      'UPDATE users SET push_token = $1 WHERE id = $2',
      [pushToken, userId]
    );

    res.json({ message: 'Push token başarıyla kaydedildi' });
  } catch (error) {
    console.error('Push token kaydetme hatası:', error);
    res.status(500).json({ message: error.message || 'Push token kaydedilemedi' });
  }
};

module.exports = { savePushToken }; 