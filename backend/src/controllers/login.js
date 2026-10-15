const { query } = require('../config/db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/jwt');

// Kullanıcı girişi
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }

    const token = jwt.sign({ id: user.id, type: 'user' }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token, user: { id: user.id, name: user.name, surname: user.surname, age: user.age, blood_type: user.blood_type, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Sunucu hatası' });
  }
};

// Hastane girişi
const loginHospital = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await query('SELECT * FROM hospitals WHERE email = $1', [email]);
    const hospital = result.rows[0];

    if (!hospital || hospital.password !== password) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }

    const token = jwt.sign({ id: hospital.id, type: 'hospital' }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token, user: { id: hospital.id, name: hospital.name, email: hospital.email, address: hospital.address } });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Sunucu hatası' });
  }
};

module.exports = { loginUser, loginHospital };