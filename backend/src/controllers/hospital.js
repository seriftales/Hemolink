const { query } = require('../config/db');

// Mesafe hesapla
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Hastaneleri listele
const getHospitals = async (req, res) => {
  try {
    const result = await query('SELECT * FROM hospitals');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Hastaneler alınamadı' });
  }
};

// Yakın hastaneleri bul
const getNearbyHospitals = async (req, res) => {
  try {
    const { latitude, longitude, radius = 10 } = req.query;
    if (!latitude || !longitude) return res.status(400).json({ message: 'Konum bilgisi gerekli' });

    const result = await query('SELECT * FROM hospitals');
    const nearbyHospitals = result.rows
      .map(hospital => ({
        ...hospital,
        distance: calculateDistance(parseFloat(latitude), parseFloat(longitude), parseFloat(hospital.latitude), parseFloat(hospital.longitude))
      }))
      .filter(hospital => hospital.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

    res.json({ hospitals: nearbyHospitals, count: nearbyHospitals.length, radius });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Yakındaki hastaneler alınamadı' });
  }
};

module.exports = { getHospitals, getNearbyHospitals };