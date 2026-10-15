const { query } = require('../config/db');

// Bildirim token kaydet
const savePushToken = async (req, res) => {
  try {
    const userId = req.user.id;
    const { pushToken } = req.body;
    if (!pushToken) return res.status(400).json({ message: 'Push token gerekli' });

    await query('UPDATE users SET push_token = $1 WHERE id = $2', [pushToken, userId]);
    res.json({ message: 'Push token başarıyla kaydedildi' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Push token kaydedilemedi' });
  }
};

module.exports = { savePushToken };