import { Request, Response } from 'express';
import { register, login } from './auth.service';

export async function registerHandler(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }
    const user = await register(email, password);
    res.status(201).json({ message: 'Register berhasil', user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }
    const result = await login(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}