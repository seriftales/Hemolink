const { query } = require('../config/db');

// Aktif talepler
const getActiveRequests = async (req, res) => {
  try {
    const result = await query('SELECT * FROM active_blood_requests');
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Sunucu hatası' });
  }
};

// Bağışçı istatistikleri
const getDonorStatistics = async (req, res) => {
  try {
    const result = await query('SELECT * FROM donor_statistics');
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Sunucu hatası' });
  }
};

// Kan grubu istatistikleri
const getBloodTypeStatistics = async (req, res) => {
  try {
    await query('SELECT refresh_blood_statistics()');
    const result = await query('SELECT * FROM blood_type_statistics');
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Sunucu hatası' });
  }
};

module.exports = { getActiveRequests, getDonorStatistics, getBloodTypeStatistics };