-- Test verileri ekleme

-- Kullanıcılar (Bağışçılar)
INSERT INTO users (name, surname, email, password, age, blood_type) VALUES
('Ahmet', 'Çetin', 'ahmet@gmail.com', '123', 25, 'A+'),
('Ayşe', 'Kaya', 'ayse@gmail.com', '123', 30, 'B+'),
('Mehmet', 'Demir', 'mehmet@gmail.com', '123', 28, '0+'),
('Zeynep', 'Çelik', 'zeynep@gmail.com', '123', 35, 'AB+'),
('Ali', 'Şahin', 'ali@gmail.com', '123', 22, 'A-'),
('Fatma', 'Öztürk', 'fatma@gmail.com', '123', 40, 'B-'),
('Mustafa', 'Arslan', 'mustafa@gmail.com', '123', 45, '0-'),
('Elif', 'Yıldız', 'elif@gmail.com', '123', 32, 'AB-'),
('Burak', 'Aksoy', 'burak@gmail.com', '123', 27, 'A+'),
('Merve', 'Koç', 'merve@gmail.com', '123', 31, 'B+'),
('Emre', 'Yılmaz', 'emre@gmail.com', '123', 24, '0+'),
('Hatice', 'Doğan', 'hatice@gmail.com', '123', 38, 'AB+'),
('Can', 'Kurt', 'can@gmail.com', '123', 29, 'A-'),
('Aslı', 'Erdoğan', 'asli@gmail.com', '123', 26, 'B-'),
('Okan', 'Güneş', 'okan@gmail.com', '123', 33, '0-'),
('Derya', 'Polat', 'derya@gmail.com', '123', 36, 'AB-'),
('Hakan', 'Taş', 'hakan@gmail.com', '123', 41, 'A+'),
('Seda', 'Aydın', 'seda@gmail.com', '123', 34, 'B+'),
('Serkan', 'Keskin', 'serkan@gmail.com', '123', 37, '0+'),
('Melis', 'Şimşek', 'melis@gmail.com', '123', 23, 'AB+');


-- Hastaneler
INSERT INTO hospitals (name, email, password, address, phone, latitude, longitude) VALUES

('Bakırköy Dr. Sadi Konuk Eğitim ve Araştırma Hastanesi', 'bakirkoy@gmail.com', '123', 'Bakırköy, İstanbul', '0212 409 1500', 40.9866, 28.8495),
('Ankara Şehir Hastanesi', 'ankara@gmail.com', '123', 'Çankaya, Ankara', '0312 333 5000', 39.9208, 32.8541),
('Ege Üniversitesi Tıp Fakültesi Hastanesi', 'egeuniversitesi@gmail.com', '123', 'Bornova, İzmir', '0232 390 4000', 38.4550, 27.2220),
('Bursa Şehir Hastanesi', 'bursa@gmail.com', '123', 'Nilüfer, Bursa', '0224 975 0000', 40.2451, 28.9639),
('Antalya Eğitim ve Araştırma Hastanesi', 'antalya@gmail.com', '123', 'Muratpaşa, Antalya', '0242 249 4400', 36.8948, 30.7133),
('Konya Şehir Hastanesi', 'konya@gmail.com', '123', 'Selçuklu, Konya', '0332 221 0000', 37.8665, 32.4846),
('Gaziantep Şehir Hastanesi', 'gaziantep@gmail.com', '123', 'Şahinbey, Gaziantep', '0342 211 0000', 37.0662, 37.3833),
('Erciyes Üniversitesi Tıp Fakültesi Hastanesi', 'erciyes@gmail.com', '123', 'Talas, Kayseri', '0352 437 5000', 38.7031, 35.4875),
('Samsun Eğitim ve Araştırma Hastanesi', 'samsun@gmail.com', '123', 'İlkadım, Samsun', '0362 311 1500', 41.2867, 36.3301),
('Karadeniz Teknik Üniversitesi Farabi Hastanesi', 'ktu@gmail.com', '123', 'Ortahisar, Trabzon', '0462 377 5000', 40.9850, 39.7638),
('Eskişehir Şehir Hastanesi', 'eskisehir@gmail.com', '123', 'Odunpazarı, Eskişehir', '0222 611 4000', 39.7505, 30.5256),
('Mersin Şehir Hastanesi', 'mersin@gmail.com', '123', 'Yenişehir, Mersin', '0324 225 0000', 36.7943, 34.6300),
('Pamukkale Üniversitesi Hastanesi', 'pamukkale@gmail.com', '123', 'Pamukkale, Denizli', '0258 296 4000', 37.7735, 29.0872),
('Adana Şehir Hastanesi', 'adana@gmail.com', '123', 'Yüreğir, Adana', '0322 455 4000', 37.0003, 35.3213),
('Malatya Eğitim ve Araştırma Hastanesi', 'malatya@gmail.com', '123', 'Battalgazi, Malatya', '0422 322 6000', 38.3552, 38.3095),
('Atatürk Üniversitesi Araştırma Hastanesi', 'erzurum@gmail.com', '123', 'Yakutiye, Erzurum', '0442 231 1111', 39.9043, 41.2679),
('Sakarya Üniversitesi Eğitim ve Araştırma Hastanesi', 'sakarya@gmail.com', '123', 'Adapazarı, Sakarya', '0264 229 4000', 40.7833, 30.4000),
('Dicle Üniversitesi Hastanesi', 'dicle@gmail.com', '123', 'Sur, Diyarbakır', '0412 248 8000', 37.9256, 40.2172),
('Balıkesir Atatürk Şehir Hastanesi', 'balikesir@gmail.com', '123', 'Altıeylül, Balıkesir', '0266 281 4000', 39.6484, 27.8826),
('Manisa Merkezefendi Devlet Hastanesi', 'manisa@gmail.com', '123', 'Yunusemre, Manisa', '0236 231 4040', 38.6300, 27.4265);


-- Kan Bağış Talepleri
INSERT INTO blood_requests (hospital_name, hospital_id, blood_type, urgency_level, status, donor_email) VALUES
('Bakırköy Dr. Sadi Konuk Eğitim ve Araştırma Hastanesi', 3, 'A+', 'high', 'active', '-'),
('Ankara Şehir Hastanesi', 4, 'B-', 'medium', 'active', '-'),
('Ege Üniversitesi Tıp Fakültesi Hastanesi', 5, '0+', 'low', 'active', '-'),
('Bursa Şehir Hastanesi', 6, 'AB+', 'high', 'active', '-'),
('Antalya Eğitim ve Araştırma Hastanesi', 7, 'A-', 'medium', 'active', '-'),
('Konya Şehir Hastanesi', 8, 'B+', 'low', 'active', '-'),
('Gaziantep Şehir Hastanesi', 9, '0-', 'high', 'active', '-'),
('Erciyes Üniversitesi Tıp Fakültesi Hastanesi', 10, 'AB-', 'medium', 'active', '-'),
('Samsun Eğitim ve Araştırma Hastanesi', 11, 'A+', 'low', 'active', '-'),
('Karadeniz Teknik Üniversitesi Farabi Hastanesi', 12, 'B-', 'high', 'active', '-'),
('Eskişehir Şehir Hastanesi', 13, '0+', 'medium', 'active', '-'),
('Mersin Şehir Hastanesi', 14, 'AB+', 'low', 'active', '-'),
('Pamukkale Üniversitesi Hastanesi', 15, 'A-', 'high', 'active', '-'),
('Adana Şehir Hastanesi', 16, 'B+', 'medium', 'active', '-'),
('Malatya Eğitim ve Araştırma Hastanesi', 17, '0-', 'low', 'active', '-'),
('Atatürk Üniversitesi Araştırma Hastanesi', 18, 'AB-', 'high', 'active', '-'),
('Sakarya Üniversitesi Eğitim ve Araştırma Hastanesi', 19, 'A+', 'medium', 'active', '-'),
('Dicle Üniversitesi Hastanesi', 20, 'B-', 'low', 'active', '-'),
('Balıkesir Atatürk Şehir Hastanesi', 21, '0+', 'high', 'active', '-'),
('Manisa Merkezefendi Devlet Hastanesi', 22, 'AB+', 'medium', 'active', '-');


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