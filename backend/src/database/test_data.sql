-- Test verileri ekleme

-- Kullanıcılar (Bağışçılar)
INSERT INTO users (name, surname, email, password, age, blood_type) VALUES
('Ahmet', 'Yılmaz', 'ahmet@email.com', 'sifre123', 25, 'A+'),
('Ayşe', 'Kaya', 'ayse@email.com', 'sifre123', 30, 'B+'),
('Mehmet', 'Demir', 'mehmet@email.com', 'sifre123', 28, '0+'),
('Zeynep', 'Çelik', 'zeynep@email.com', 'sifre123', 35, 'AB+'),
('Ali', 'Şahin', 'ali@email.com', 'sifre123', 22, 'A-'),
('Fatma', 'Öztürk', 'fatma@email.com', 'sifre123', 40, 'B-'),
('Mustafa', 'Arslan', 'mustafa@email.com', 'sifre123', 45, '0-'),
('Elif', 'Yıldız', 'elif@email.com', 'sifre123', 32, 'AB-');

-- Hastaneler
INSERT INTO hospitals (name, address, city, phone, email) VALUES
('Memorial Hastanesi', 'Bağdat Caddesi No:1', 'İstanbul', '0212 1234567', 'memorial@email.com'),
('Acıbadem Hastanesi', 'Atatürk Caddesi No:2', 'Ankara', '0312 2345678', 'acibadem@email.com'),
('Medicana Hastanesi', 'İstiklal Caddesi No:3', 'İzmir', '0232 3456789', 'medicana@email.com'),
('Liv Hastanesi', 'Cumhuriyet Caddesi No:4', 'Bursa', '0224 4567890', 'liv@email.com');

-- Kan Bağış Talepleri
INSERT INTO blood_requests (hospital_id, blood_type, units_needed, urgency_level, status) VALUES
(1, 'A+', 2, 'high', 'active'),
(2, 'B+', 3, 'high', 'active'),
(3, '0+', 1, 'medium', 'active'),
(4, 'AB+', 4, 'critical', 'active'),
(1, 'A-', 2, 'low', 'active'),
(2, 'B-', 3, 'high', 'active'),
(3, '0-', 1, 'medium', 'active'),
(4, 'AB-', 2, 'high', 'active');

-- Bağışçı-Hastane Eşleştirmeleri
INSERT INTO donor_hospital_matches (donor_id, hospital_id, blood_request_id, status) VALUES
(1, 1, 1, 'pending'),
(2, 2, 2, 'accepted'),
(3, 3, 3, 'rejected'),
(4, 4, 4, 'completed'),
(5, 1, 5, 'pending'),
(6, 2, 6, 'accepted'),
(7, 3, 7, 'pending'),
(8, 4, 8, 'completed');

-- Bildirimler
INSERT INTO notifications (recipient_type, recipient_id, title, message, type, is_read, related_entity_type, related_entity_id) VALUES
('user', 1, 'Yeni Kan Talebi', 'Size uygun bir kan talebi var', 'blood_request', false, 'blood_request', 1),
('hospital', 1, 'Yeni Bağışçı', 'Yeni bir bağışçı eşleşmesi var', 'match', false, 'match', 1),
('user', 2, 'Eşleşme Onaylandı', 'Bağış talebiniz onaylandı', 'match', true, 'match', 2),
('hospital', 2, 'Acil Kan İhtiyacı', 'Acil kan ihtiyacı var', 'urgent', false, 'blood_request', 2); 