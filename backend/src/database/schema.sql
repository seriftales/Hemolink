-- Veritabanını oluştur
CREATE DATABASE hemolink;

-- Veritabanına bağlan
\c hemolink;

-- Users tablosu
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    blood_type VARCHAR(3) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_blood_type CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-')),
    CONSTRAINT valid_age CHECK (age >= 18 AND age <= 65)
);

-- Hastaneler tablosu
CREATE TABLE hospitals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kan bağış talepleri tablosu
CREATE TABLE blood_requests (
    id SERIAL PRIMARY KEY,
    hospital_id INTEGER REFERENCES hospitals(id),
    blood_type VARCHAR(3) NOT NULL,
    units_needed INTEGER NOT NULL,
    urgency_level VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_blood_type CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-')),
    CONSTRAINT valid_urgency CHECK (urgency_level IN ('low', 'medium', 'high', 'critical'))
);

-- Bağışçı-hastane eşleştirme tablosu
CREATE TABLE donor_hospital_matches (
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
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    recipient_type VARCHAR(10) NOT NULL, -- 'user' veya 'hospital'
    recipient_id INTEGER NOT NULL, -- users.id veya hospitals.id
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'blood_request', 'match', 'system', 'urgent' vb.
    is_read BOOLEAN DEFAULT FALSE,
    related_entity_type VARCHAR(20), -- 'blood_request', 'match' vb.
    related_entity_id INTEGER, -- ilgili tablonun id'si
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_recipient_type CHECK (recipient_type IN ('user', 'hospital')),
    CONSTRAINT valid_notification_type CHECK (type IN ('blood_request', 'match', 'system', 'urgent', 'reminder', 'update'))
); 