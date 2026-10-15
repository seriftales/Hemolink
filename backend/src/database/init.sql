
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS donor_hospital_matches CASCADE;
DROP TABLE IF EXISTS blood_requests CASCADE;
DROP TABLE IF EXISTS hospitals CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Tabloların Oluşturulması
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 18 AND age <= 65),
    blood_type VARCHAR(5) NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-')),
    push_token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hospitals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blood_requests (
    id SERIAL PRIMARY KEY,
    hospital_name VARCHAR(100) NOT NULL, 
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    blood_type VARCHAR(5) NOT NULL CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-')),
    urgency_level VARCHAR(20) NOT NULL CHECK (urgency_level IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(20) DEFAULT 'active',
    donor_email VARCHAR(100) DEFAULT '-', 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donor_hospital_matches (
    id SERIAL PRIMARY KEY,
    donor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    hospital_id INTEGER REFERENCES hospitals(id) ON DELETE CASCADE,
    blood_request_id INTEGER REFERENCES blood_requests(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    recipient_type VARCHAR(10) NOT NULL CHECK (recipient_type IN ('user', 'hospital')),
    recipient_id INTEGER NOT NULL, 
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('blood_request', 'match', 'system', 'urgent', 'reminder', 'update')),
    is_read BOOLEAN DEFAULT FALSE,
    related_entity_type VARCHAR(20), 
    related_entity_id INTEGER, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Performans İndeksleri
CREATE INDEX idx_users_blood_type ON users(blood_type);
CREATE INDEX idx_blood_requests_status ON blood_requests(status);
CREATE INDEX idx_notifications_recipient ON notifications(recipient_type, recipient_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- 3. Otomatik Güncelleme Trigger'ları
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hospitals_modtime BEFORE UPDATE ON hospitals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blood_requests_modtime BEFORE UPDATE ON blood_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_modtime BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4. Test Verilerinin Eklenmesi 
INSERT INTO users (name, surname, email, password, age, blood_type) VALUES
('Ahmet', 'Çetin', 'ahmet@gmail.com', '123', 25, 'A+'),
('Ayşe', 'Kaya', 'ayse@gmail.com', '123', 30, 'B+');

INSERT INTO hospitals (name, email, password, address, phone, latitude, longitude) VALUES
('Bakırköy Dr. Sadi Konuk Hastanesi', 'bakirkoy@gmail.com', '123', 'Bakırköy, İstanbul', '0212 409 1500', 40.9866, 28.8495),
('Ankara Şehir Hastanesi', 'ankara@gmail.com', '123', 'Çankaya, Ankara', '0312 333 5000', 39.9208, 32.8541);

INSERT INTO blood_requests (hospital_name, hospital_id, blood_type, urgency_level, status) VALUES
('Bakırköy Dr. Sadi Konuk Hastanesi', 1, 'A+', 'high', 'active'),
('Ankara Şehir Hastanesi', 2, 'B-', 'medium', 'active');

INSERT INTO notifications (recipient_type, recipient_id, title, message, type) VALUES
('user', 1, 'Test Bildirimi', 'Sisteme hoş geldiniz', 'system'),
('hospital', 1, 'Yeni Başvuru', 'Hastaneye yeni başvuru yapıldı', 'system');