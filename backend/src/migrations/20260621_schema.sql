-- Tabel users
CREATE TABLE users (
  id        SERIAL PRIMARY KEY,
  email     VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role      VARCHAR(20) NOT NULL DEFAULT 'user', -- 'user' | 'admin'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabel standups
CREATE TABLE standups (
  id               SERIAL PRIMARY KEY,
  user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  raw_input        TEXT NOT NULL,         -- input bebas dari user
  generated_report TEXT NOT NULL,         -- output dari Claude
  standup_date     DATE NOT NULL DEFAULT CURRENT_DATE, -- tanggal otomatis
  created_at       TIMESTAMP DEFAULT NOW()
);

-- Index biar query history cepet
CREATE INDEX idx_standups_user_id ON standups(user_id);
CREATE INDEX idx_standups_date ON standups(standup_date);