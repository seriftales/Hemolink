const { connectDB } = require('../config/db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/jwt');



const createBloodRequest = async (req, res) => {
  const { name,id, bloodType, urgencyLevel,  } = req.body;

  console.log('Request body:', req.body); 
  
  // Validate required fields
  if (!bloodType || !urgencyLevel) {
    return res.status(400).json({ message: 'Tüm alanlar zorunludur' });
  }

  try {
    const pool = req.app.locals.pool;
    if (!pool) {
      throw new Error('Veritabanı bağlantısı bulunamadı');
    }


    // Yeni kullanıcı oluştur
    const result = await pool.query(
      'INSERT INTO blood_requests (hospital_name,hospital_id, blood_type, urgency_level,status) VALUES ($1, $2, $3, $4,$5) RETURNING *',
      [name,id, bloodType, urgencyLevel,'active']
    );

    const newCreate = result.rows[0];

    res.status(201).json({
      message: 'Talep başarılı',
      user: {
        id: newCreate.id,
        name: newCreate.bloodType,
        surname: newCreate.urgencyLevel,
        
      }
    });

  } catch (error) {
    console.error('Create error:', error);
    res.status(500).json({ message: error.message || 'Talep işlemi başarısız' });
  }
};

module.exports = { createBloodRequest }; 