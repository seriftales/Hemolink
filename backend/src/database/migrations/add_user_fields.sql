-- Add new columns to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS surname VARCHAR(255),
ADD COLUMN IF NOT EXISTS age INTEGER,
ADD COLUMN IF NOT EXISTS blood_type VARCHAR(3);

-- Add constraints
ALTER TABLE users
ADD CONSTRAINT valid_blood_type CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-')),
ADD CONSTRAINT valid_age CHECK (age >= 18 AND age <= 65); 