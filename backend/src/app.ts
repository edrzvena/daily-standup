import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { pool } from './config/db';
import authRoutes from './modules/auth/auth.routes';

const app = express();

app.use(cors({ origin: env.allowedOrigin }));
app.use(express.json());

// Cek koneksi pas server nyala
pool.connect()
  .then((client) => {
    console.log('✅ Connected to PostgreSQL')
    client.release() // Lepas client balik ke pool setelah cek berhasil
  })
  .catch((err) => {
    console.error('❌ Failed to connect to PostgreSQL:', err.message)
  })

// Semua route auth diawali /api/auth  -> jadi register = /api/auth/register
app.use('/api/auth', authRoutes)

export default app;