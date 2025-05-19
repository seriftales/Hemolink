const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token gerekli' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Received token:', token);
  console.log('Using JWT_SECRET:', JWT_SECRET);

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Error:', err.message);
      console.error('Error details:', err);
      return res.status(403).json({ message: 'Geçersiz token' });
    }
    
    console.log('Token decoded successfully:', decoded);
    req.user = decoded;
    next();
  });
};

module.exports = auth;
