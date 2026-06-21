import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from './auth.repository';

export async function register(email: string, password: string) {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error('Email sudah terdaftar');

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser(email, passwordHash);
  return user;
}

export async function login(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Email atau password salah');

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new Error('Email atau password salah');

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  return { token, user: { id: user.id, email: user.email, role: user.role } };
}