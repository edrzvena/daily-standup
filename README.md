# Daily Standup

Web yang membantu developer menghasilkan laporan standup harian secara otomatis. Pengguna cukup menuliskan aktivitas kerja mereka dalam bahasa sehari-hari, dan aplikasi akan mengubahnya menjadi laporan standup yang terstruktur dan siap dibagikan ke tim.

## Latar Belakang

Standup meeting adalah rutinitas umum di tim pengembangan perangkat lunak. Setiap anggota tim diharapkan menyampaikan tiga hal: apa yang dikerjakan kemarin, apa yang akan dikerjakan hari ini, dan apakah ada hambatan. Masalahnya, tidak semua orang terbiasa merangkai kalimat yang rapi di tengah kesibukan kerja.

Aplikasi ini hadir untuk menyederhanakan proses tersebut. Tulis saja apa yang dikerjakan dengan cara apapun, dan biarkan AI yang merapikannya.

## Fitur

- Generate laporan standup otomatis dari input teks bebas menggunakan Claude AI
- Riwayat standup tersimpan per pengguna dan dapat diakses kapan saja
- Sistem autentikasi dengan JWT dan enkripsi password
- Role-based access control — pengguna biasa dan admin memiliki akses yang berbeda
- Panel admin untuk memantau seluruh pengguna dan laporan standup di platform

## Tech Stack

### Frontend

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| React | 19.2.6 | Library utama untuk membangun antarmuka |
| TypeScript | 6.0.2 | Superset JavaScript dengan static typing |
| Vite | 8.0.12 | Build tool dan development server |
| Tailwind CSS | 4.3.1 | Utility-first CSS framework |
| Zustand | 5.0.14 | State management global |
| Axios | 1.18.0 | HTTP client untuk komunikasi dengan backend |
| React Router DOM | 7.18.0 | Routing pada sisi klien |

### Backend

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| Express | 5.2.1 | Web framework untuk Node.js |
| TypeScript | 6.0.3 | Superset JavaScript dengan static typing |
| PostgreSQL | 8.14 | Database relasional untuk menyimpan data |
| Anthropic SDK | 0.105.0 | Integrasi dengan Claude AI |
| JSON Web Token | 9.0.3 | Autentikasi berbasis token |
| bcryptjs | 3.0.3 | Enkripsi password |
| tsx | 4.22.4 | TypeScript executor untuk development |

## Arsitektur Backend

Backend menggunakan pola arsitektur berlapis untuk memisahkan tanggung jawab setiap bagian:

```
Request -> Router -> Middleware -> Controller -> Service -> Repository -> Database
```

- **Router** — mendefinisikan endpoint dan mengarahkan request
- **Middleware** — menangani autentikasi JWT dan validasi role
- **Controller** — menerima request dan mengembalikan response
- **Service** — logika bisnis dan integrasi dengan Claude API
- **Repository** — query ke database PostgreSQL

## Struktur Proyek

```
daily-standup/
├── backend/
│   └── src/
│       ├── config/         # koneksi database
│       ├── middlewares/    # auth dan role middleware
│       ├── modules/
│       │   ├── auth/       # register, login, user management
│       │   └── standup/    # generate dan manajemen standup
│       ├── services/       # integrasi Claude API
│       ├── scripts/        # script utilitas (create admin)
│       └── types/          # TypeScript type declarations
└── frontend/
    └── src/
        ├── components/     # komponen reusable
        ├── pages/          # halaman aplikasi
        ├── store/          # Zustand global state
        ├── services/       # fungsi API call
        ├── hooks/          # custom React hooks
        ├── types/          # TypeScript interfaces
        ├── utils/          # fungsi helper
        └── config/         # konfigurasi axios
```

## Cara Menjalankan

### Prasyarat

- Node.js versi 18 atau lebih baru
- PostgreSQL yang sudah berjalan
- API key dari Anthropic

### Backend

```bash
cd backend
npm install
```

Buat file `.env` di folder `backend`:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/standup_db
JWT_SECRET=your_jwt_secret
ANTHROPIC_API_KEY=your_anthropic_api_key
ADMIN_FIRST_EMAIL=admin@example.com
ADMIN_FIRST_PASSWORD=your_admin_password
```

Jalankan SQL berikut untuk membuat tabel:

```sql
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role          VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE standups (
  id               SERIAL PRIMARY KEY,
  user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  raw_input        TEXT NOT NULL,
  generated_report TEXT NOT NULL,
  standup_date     DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at       TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_standups_user_id ON standups(user_id);
CREATE INDEX idx_standups_date ON standups(standup_date);
```

Buat akun admin pertama:

```bash
npm run create-admin
```

Jalankan server:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Buat file `.env` di folder `frontend`:

```env
VITE_API_URL=http://localhost:3000/api
```

Jalankan aplikasi:

```bash
npm run dev
```

Aplikasi berjalan di `http://localhost:5173`.

## API Endpoints

### Auth

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|------------|
| POST | `/api/auth/register` | Public | Registrasi pengguna baru |
| POST | `/api/auth/login` | Public | Login dan mendapatkan token |
| GET | `/api/auth/users` | Admin | Melihat semua pengguna |

### Standup

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|------------|
| POST | `/api/standups` | User | Generate standup baru |
| GET | `/api/standups` | User | Riwayat standup milik sendiri |
| GET | `/api/standups/:id` | User | Detail satu standup |
| GET | `/api/standups/admin/all` | Admin | Semua standup seluruh pengguna |
