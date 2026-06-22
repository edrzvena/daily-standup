import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { pool } from './config/db';
import authRoutes from './modules/auth/auth.routes';
import standupRoutes from './modules/standup/standup.routes';

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
app.use('/api/standups', standupRoutes);

// Health check
app.get('/health', (_, res) => res.json({ status: 'OK' }));

export default app;