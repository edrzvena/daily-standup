import { Request, Response, NextFunction } from 'express';

// Middleware khusus buat route admin
export function adminOnly(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Akses ditolak. Admin only.' });
  }
  next();
}