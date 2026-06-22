import bcrypt from 'bcryptjs';
import { pool } from '../config/db';
import { findUserByEmail, createUser } from '../modules/auth/auth.repository';
import 'dotenv/config';

async function createInitialAdmin() {
  const email = process.env.ADMIN_FIRST_EMAIL;
  const rawPassword = process.env.ADMIN_FIRST_PASSWORD;

  if (!email || !rawPassword) {
    console.error("❌ Error: ADMIN_FIRST_EMAIL atau ADMIN_FIRST_PASSWORD belum di-set di .env!");
    process.exit(1);
  }

  try {
    // 1. Cek koneksi db
    await pool.query('SELECT 1');

    // 2. Cek apakah user admin sudah ada
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      console.log(`ℹ️ User dengan email ${email} sudah terdaftar.`);
      if (existingUser.role !== 'admin') {
        // Update role menjadi admin jika sebelumnya adalah user biasa
        await pool.query('UPDATE users SET role = $1 WHERE id = $2', ['admin', existingUser.id]);
        console.log(`✅ Role user ${email} berhasil di-upgrade menjadi admin!`);
      } else {
        console.log(`ℹ️ User ${email} sudah memiliki role admin.`);
      }
      return;
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // 4. Buat user admin baru
    const adminUser = await createUser(email, hashedPassword, 'admin');
    console.log(`✅ Admin pertama berhasil dibuat dengan email: ${adminUser.email}`);
  } catch (error: any) {
    console.error("❌ Gagal membuat admin:", error.message);
  } finally {
    // 5. Tutup koneksi pool agar script selesai secara bersih
    await pool.end();
  }
}

createInitialAdmin();

//npm run create-admin