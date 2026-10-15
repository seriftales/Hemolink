const { query } = require('../config/db');

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'];

// Yeni kullanıcı kaydı
const registerUser = async (req, res) => {
  const { name, surname, email, password, age, bloodType } = req.body;

  if (!name || !surname || !email || !password || !age || !bloodType) return res.status(400).json({ message: 'Tüm alanlar zorunludur' });
  if (!BLOOD_TYPES.includes(bloodType)) return res.status(400).json({ message: 'Geçersiz kan grubu', validBloodTypes: BLOOD_TYPES });
  if (age < 18 || age > 65) return res.status(400).json({ message: 'Yaş 18-65 arasında olmalıdır' });

  try {
    const emailCheck = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailCheck.rows[0]) return res.status(400).json({ message: 'Bu email adresi zaten kullanılıyor' });

    const result = await query(
      'INSERT INTO users (name, surname, email, password, age, blood_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, surname, email, password, age, bloodType]
    );

    const newUser = result.rows[0];
    res.status(201).json({ message: 'Kayıt başarılı', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Kayıt işlemi başarısız' });
  }
};

module.exports = { registerUser };