const { query } = require('../config/db');

// Yeni kan talebi
const createBloodRequest = async (req, res) => {
  const { name, id, bloodType, urgencyLevel } = req.body;
  
  if (!bloodType || !urgencyLevel) {
    return res.status(400).json({ message: 'Tüm alanlar zorunludur' });
  }

  try {
    const result = await query(
      'INSERT INTO blood_requests (hospital_name, hospital_id, blood_type, urgency_level, status, donor_email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, id, bloodType, urgencyLevel, 'active', '-']
    );
    
    const newCreate = result.rows[0];
    res.status(201).json({
      message: 'Talep başarılı',
      user: {
        id: newCreate.id,
        name: newCreate.blood_type, 
        surname: newCreate.urgency_level 
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Talep işlemi başarısız' });
  }
};

module.exports = { createBloodRequest };