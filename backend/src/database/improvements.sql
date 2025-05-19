-- Performans İyileştirmeleri için İndeksler
CREATE INDEX idx_users_blood_type ON users(blood_type);
CREATE INDEX idx_users_age ON users(age);
CREATE INDEX idx_blood_requests_urgency ON blood_requests(urgency_level);
CREATE INDEX idx_blood_requests_status ON blood_requests(status);
CREATE INDEX idx_donor_matches_status ON donor_hospital_matches(status);
CREATE INDEX idx_notifications_recipient ON notifications(recipient_type, recipient_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- Veri Bütünlüğü için Ek Kısıtlamalar
ALTER TABLE blood_requests
ADD CONSTRAINT positive_units CHECK (units_needed > 0);

ALTER TABLE users
ADD CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Otomatik Güncelleme için Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hospitals_updated_at
    BEFORE UPDATE ON hospitals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blood_requests_updated_at
    BEFORE UPDATE ON blood_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donor_matches_updated_at
    BEFORE UPDATE ON donor_hospital_matches
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at
    BEFORE UPDATE ON notifications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Görünümler (Views) Oluşturma
CREATE VIEW active_blood_requests AS
SELECT 
    br.*,
    h.name as hospital_name,
    h.city as hospital_city
FROM blood_requests br
JOIN hospitals h ON br.hospital_id = h.id
WHERE br.status = 'active';

CREATE VIEW donor_statistics AS
SELECT 
    u.id,
    u.name,
    u.surname,
    u.blood_type,
    COUNT(dhm.id) as total_donations,
    COUNT(CASE WHEN dhm.status = 'completed' THEN 1 END) as successful_donations
FROM users u
LEFT JOIN donor_hospital_matches dhm ON u.id = dhm.donor_id
GROUP BY u.id, u.name, u.surname, u.blood_type;

-- Materialized View (Periyodik olarak yenilenecek özet tablo)
CREATE MATERIALIZED VIEW blood_type_statistics AS
SELECT 
    blood_type,
    COUNT(*) as total_requests,
    SUM(units_needed) as total_units_needed,
    COUNT(CASE WHEN urgency_level = 'critical' THEN 1 END) as critical_requests
FROM blood_requests
GROUP BY blood_type;

-- Yenileme fonksiyonu
CREATE OR REPLACE FUNCTION refresh_blood_statistics()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW blood_type_statistics;
END;
$$ LANGUAGE plpgsql; 