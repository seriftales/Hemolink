// login.js
const { connectDB } = require('../config/db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/jwt');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connectDB();
    
    // Önce users tablosunda ara
    let result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    let userType = 'user';
    
    // Eğer users tablosunda bulunamazsa, hospitals tablosunda ara
    if (!result.rows[0]) {
      result = await db.query('SELECT * FROM hospitals WHERE email = $1', [email]);
      userType = 'hospital';
    }

    if (!result.rows[0]) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }

    const token = jwt.sign({ id: user.id, type: userType }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    res.json({ 
      token,
      user: { 
        id: user.id,
        name: user.name,
        email: user.email,
        type: userType
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

const logOutUser = (req, res) => {
  res.json({ message: 'Başarıyla çıkış yapıldı' });
};

module.exports = { loginUser, logOutUser };
