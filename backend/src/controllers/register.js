const { connectDB } = require('../config/db.js');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const db = await connectDB(); // Bağlantıyı al
    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    // Kullanıcı varsa hata dondur 
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email zaten kayıtlı' });
    }

    // Yeni kullanıcıyı ekle
    const newUser = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );

    const user = newUser.rows[0];

    // JWT token oluştur
    const token = jwt.sign({ id: user.id }, 'gizli_anahtar', { expiresIn: '1h' });

    // Başarılı yanıt döndür
    res.status(201).json({
      message: 'Kayıt başarılı',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { registerUser };
