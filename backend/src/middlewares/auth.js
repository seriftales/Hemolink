const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

// Token doğrulama (Middleware)
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token gerekli' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Geçersiz token' });
    }
    
    req.user = decoded;
    next();
  });
};

module.exports = auth;