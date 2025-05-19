-- Bildirimler tablosu
CREATE TABLE IF NOT EXISTS notifications (
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

-- Bildirimler için indeksler
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_type, recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- Bildirimler için trigger (updated_at güncellemesi için)
CREATE OR REPLACE FUNCTION update_notification_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_notification_timestamp
    BEFORE UPDATE ON notifications
    FOR EACH ROW
    EXECUTE FUNCTION update_notification_timestamp();

-- Bildirim görünümü (son 30 günlük bildirimler)
CREATE OR REPLACE VIEW recent_notifications AS
SELECT 
    n.*,
    CASE 
        WHEN n.recipient_type = 'user' THEN u.name
        WHEN n.recipient_type = 'hospital' THEN h.name
    END as recipient_name
FROM notifications n
LEFT JOIN users u ON n.recipient_type = 'user' AND n.recipient_id = u.id
LEFT JOIN hospitals h ON n.recipient_type = 'hospital' AND n.recipient_id = h.id
WHERE n.created_at >= CURRENT_TIMESTAMP - INTERVAL '30 days'
ORDER BY n.created_at DESC;

-- Bildirim istatistikleri görünümü
CREATE OR REPLACE VIEW notification_statistics AS
SELECT 
    recipient_type,
    recipient_id,
    COUNT(*) as total_notifications,
    COUNT(CASE WHEN is_read = false THEN 1 END) as unread_notifications,
    COUNT(CASE WHEN type = 'urgent' THEN 1 END) as urgent_notifications,
    MAX(created_at) as last_notification_date
FROM notifications
GROUP BY recipient_type, recipient_id; 