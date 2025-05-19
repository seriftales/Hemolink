const { connectDB } = require('../config/db');

// Aktif kan bağış taleplerini getir
const getActiveRequests = async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.query('SELECT * FROM active_blood_requests');
    
    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Aktif başvuruları getirme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Bağışçı istatistiklerini getir
const getDonorStatistics = async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.query('SELECT * FROM donor_statistics');
    
    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Bağışçı istatistiklerini getirme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

// Kan grubu istatistiklerini getir
const getBloodTypeStatistics = async (req, res) => {
  try {
    const db = await connectDB();
    
    // Materialized view'i yenile
    await db.query('SELECT refresh_blood_statistics()');
    
    // Güncel istatistikleri getir
    const result = await db.query('SELECT * FROM blood_type_statistics');
    
    res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Kan grubu istatistiklerini getirme hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
};

module.exports = {
  getActiveRequests,
  getDonorStatistics,
  getBloodTypeStatistics
}; 