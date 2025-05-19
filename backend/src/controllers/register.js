const { connectDB } = require('../config/db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/jwt');

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'];

const registerUser = async (req, res) => {
  const { name, surname, email, password, age, bloodType } = req.body;

  // Validate required fields
  if (!name || !surname || !email || !password || !age || !bloodType) {
    return res.status(400).json({ message: 'Tüm alanlar zorunludur' });
  }

  // Validate blood type
  if (!BLOOD_TYPES.includes(bloodType)) {
    return res.status(400).json({ 
      message: 'Geçersiz kan grubu',
      validBloodTypes: BLOOD_TYPES 
    });
  }

  // Validate age
  if (age < 18 || age > 65) {
    return res.status(400).json({ message: 'Yaş 18-65 arasında olmalıdır' });
  }

  try {
    const pool = req.app.locals.pool;
    if (!pool) {
      throw new Error('Veritabanı bağlantısı bulunamadı');
    }

    // Email kontrolü
    const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailCheck.rows[0]) {
      return res.status(400).json({ message: 'Bu email adresi zaten kullanılıyor' });
    }

    // Yeni kullanıcı oluştur
    const result = await pool.query(
      'INSERT INTO users (name, surname, email, password, age, blood_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, surname, email, password, age, bloodType]
    );

    const newUser = result.rows[0];

    res.status(201).json({
      message: 'Kayıt başarılı',
      user: {
        id: newUser.id,
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        age: newUser.age,
        blood_type: newUser.blood_type
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message || 'Kayıt işlemi başarısız' });
  }
};

module.exports = { registerUser };
