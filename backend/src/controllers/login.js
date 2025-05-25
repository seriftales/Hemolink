// login.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/jwt');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = req.app.locals.pool;
    if (!pool) {
      throw new Error('Veritabanı bağlantısı bulunamadı');
    }
    
    // Önce users tablosunda ara
    let result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    let userType = 'user';
     
 

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
        surname : user.surname,
        age: user.age,
        blood_type: user.blood_type,
        email: user.email,
        created_at: user.created_at,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Sunucu hatası' });
  }
};

const loginHospital = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = req.app.locals.pool;
    if (!pool) {
      throw new Error('Veritabanı bağlantısı bulunamadı');
    }

    const result = await pool.query('SELECT * FROM hospitals WHERE email = $1', [email]);
    const hospital = result.rows[0];

    if (!hospital) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }

    if (hospital.password !== password) {
      return res.status(401).json({ message: 'Geçersiz email veya şifre' });
    }

    const token = jwt.sign({ id: hospital.id, type: 'hospital' }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.json({
      token,
      user: {
        id: hospital.id,
        name: hospital.name,
        email: hospital.email,
        address: hospital.address,
        phone: hospital.phone,
        latitude: hospital.latitude,
        longitude: hospital.longitude,
        created_at: hospital.created_at,
      },
    });
  } catch (error) {
    console.error('Hospital login error:', error);
    res.status(500).json({ message: error.message || 'Sunucu hatası' });
  }
};

module.exports = { loginUser, loginHospital };
