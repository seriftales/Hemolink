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
    const db = await connectDB();
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email zaten kayıtlı' });
    }

    const newUser = await db.query(
      'INSERT INTO users (name, surname, email, password, age, blood_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, surname, email, password, age, bloodType]
    );

    const user = newUser.rows[0];
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({
      message: 'Kayıt başarılı',
      token,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        age: user.age,
        bloodType: user.blood_type
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

module.exports = { registerUser };
