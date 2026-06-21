import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

// Cek dulu biar aman kalau di TypeScript, pastikan env-nya ada
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('❌ DATABASE_URL tidak ditemukan di file .env, bro!')
}

// Pool = kumpulan koneksi ke database yang bisa dipakai ulang (lebih efisien)
export const pool = new Pool({
  connectionString: connectionString,
})

