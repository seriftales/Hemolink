module.exports = {
  
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_gizli_anahtar_degistirilmeli',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h'
};