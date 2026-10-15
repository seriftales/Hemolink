const { query } = require('../config/db');

// Hastane talepleri
const getRequestForHospital = async (req, res) => {
  try {
     const result = await query('SELECT * FROM blood_requests');
     res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Veri alınamadı' });
  }
};

// Bağışçı talepleri
const getRequestForDonor = async (req, res) => {
  try {
     // SQL çift tırnak hatası düzeltildi
     const result = await query("SELECT * FROM blood_requests WHERE status = 'active'");
     res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Veri alınamadı' });
  }
};

// Talebi güncelle
const updateRequest = async (req, res) => {
  const { id, status, userEmail } = req.body;
  try {
    await query('UPDATE blood_requests SET status = $1, donor_email = $2 WHERE id = $3', [status, userEmail, id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Sadece durum güncelle
const updateRequest2 = async (req, res) => {
  const { id, status } = req.body;
  try {
    await query('UPDATE blood_requests SET status = $1 WHERE id = $2', [status, id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Geçmiş bağışlar
const getPastDonations = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await query('SELECT * FROM blood_requests WHERE donor_email = $1 AND status = $2', [email, 'completed']);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Veri alınamadı' });
  }
};

// Talebi sil
const deleteRequest = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await query('DELETE FROM blood_requests WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Talep bulunamadı' });
    res.status(200).json({ message: 'Talep silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Silme işlemi başarısız' });
  }
};

// Telefonları getir
const getPhones = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) return res.status(400).json({ error: 'Geçersiz ID listesi' });

    const placeholders = ids.map((_, i) => `$${i + 1}`).join(',');
    const result = await query(`SELECT id, phone FROM hospitals WHERE id IN (${placeholders})`, ids);
    
    const phoneMap = {};
    result.rows.forEach(row => phoneMap[row.id] = row.phone);
    res.json(phoneMap);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

module.exports = { getRequestForHospital, getRequestForDonor, updateRequest, updateRequest2, getPastDonations, deleteRequest, getPhones };