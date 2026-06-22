import { pool } from '../../config/db';

// Simpan standup baru
export async function saveStandup(userId: number, rawInput: string, report: string) {
  const result = await pool.query(
    `INSERT INTO standups (user_id, raw_input, generated_report)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, rawInput, report]
  );
  return result.rows[0];
}

// Ambil history standup milik user sendiri
export async function getStandupsByUser(userId: number) {
  const result = await pool.query(
    `SELECT s.*, u.email
     FROM standups s
     JOIN users u ON s.user_id = u.id
     WHERE s.user_id = $1
     ORDER BY s.created_at DESC`,
    [userId]
  );
  return result.rows;
}

// Ambil semua standup (admin only)
export async function getAllStandups() {
  const result = await pool.query(
    `SELECT s.*, u.email, u.role
     FROM standups s
     JOIN users u ON s.user_id = u.id
     ORDER BY s.created_at DESC`
  );
  return result.rows;
}

// Ambil standup by ID (buat detail view)
export async function getStandupById(standupId: number) {
  const result = await pool.query(
    `SELECT s.*, u.email
     FROM standups s
     JOIN users u ON s.user_id = u.id
     WHERE s.id = $1`,
    [standupId]
  );
  return result.rows[0] || null;
}