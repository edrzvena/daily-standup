import { pool } from '../../config/db';

export async function findUserByEmail(email: string) {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
}

export async function createUser(email: string, passwordHash: string, role: string = 'user') {
  const result = await pool.query(
    `INSERT INTO users (email, password_hash, role)
     VALUES ($1, $2, $3)
     RETURNING id, email, role, created_at`,
    [email, passwordHash, role]
  );
  return result.rows[0];
}

export async function getAllUsers() {
  const result = await pool.query(
    `SELECT id, email, role, created_at FROM users ORDER BY created_at DESC`
  );
  return result.rows;
}