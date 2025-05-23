-- Users tablosu
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL,
    blood_type VARCHAR(5) NOT NULL,
    push_token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_blood_type CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-')),
    CONSTRAINT valid_age CHECK (age >= 18 AND age <= 65)
);

-- Hastaneler tablosu
CREATE TABLE IF NOT EXISTS hospitals (
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

-- Kan bağış talepleri tablosu
CREATE TABLE IF NOT EXISTS blood_requests (
    id SERIAL PRIMARY KEY,
    hospital_name VARCHAR(100) NOT NULL , 
    hospital_id INTEGER REFERENCES hospitals(id),
    blood_type VARCHAR(5) NOT NULL,
    urgency_level VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    donor_email VARCHAR(100), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_blood_type CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-')),
    CONSTRAINT valid_urgency CHECK (urgency_level IN ('low', 'medium', 'high', 'critical'))
);

-- Bağışçı-hastane eşleştirme tablosu
CREATE TABLE IF NOT EXISTS donor_hospital_matches (
    id SERIAL PRIMARY KEY,
    donor_id INTEGER REFERENCES users(id),
    hospital_id INTEGER REFERENCES hospitals(id),
    blood_request_id INTEGER REFERENCES blood_requests(id),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_status CHECK (status IN ('pending', 'accepted', 'rejected', 'completed'))
);

-- Bildirimler tablosu
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    hospital_id INTEGER REFERENCES hospitals(id),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 