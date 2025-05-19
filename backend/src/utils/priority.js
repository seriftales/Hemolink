const { connectDB } = require('../config/db');

/**
 * Öncelikli kan bağış talebini ve ilgili kullanıcıyı döndürür.
 * 1. Kritik başvurular varsa, en eski başvuruyu döndürür.
 * 2. Kritik yoksa, yaşa göre en küçük kullanıcıya sahip başvuruyu döndürür.
 */
async function getPriorityBloodRequest() {
  const db = await connectDB();

  // 1. Kritik başvuruları bul
  const criticalRes = await db.query(
    `SELECT br.*, dhm.donor_id, u.name, u.surname, u.age
     FROM blood_requests br
     JOIN donor_hospital_matches dhm ON br.id = dhm.blood_request_id
     JOIN users u ON dhm.donor_id = u.id
     WHERE br.urgency_level = 'critical'
     ORDER BY br.created_at ASC
     LIMIT 1`
  );
  if (criticalRes.rows.length > 0) {
    return { priority: 'critical', ...criticalRes.rows[0] };
  }

  // 2. Kritik yoksa, yaşa göre en küçük kullanıcıya sahip başvuruyu bul
  const nonCriticalRes = await db.query(
    `SELECT br.*, dhm.donor_id, u.name, u.surname, u.age
     FROM blood_requests br
     JOIN donor_hospital_matches dhm ON br.id = dhm.blood_request_id
     JOIN users u ON dhm.donor_id = u.id
     WHERE br.urgency_level != 'critical'
     ORDER BY u.age ASC
     LIMIT 1`
  );
  if (nonCriticalRes.rows.length > 0) {
    return { priority: 'age', ...nonCriticalRes.rows[0] };
  }

  // Hiç başvuru yoksa
  return null;
}

module.exports = { getPriorityBloodRequest }; 