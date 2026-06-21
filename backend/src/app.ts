import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { pool } from './config/db';

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

export default app;