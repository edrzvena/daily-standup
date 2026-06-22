// Extend Request supaya bisa akses req.user di semua controller
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: 'user' | 'admin';
      };
    }
  }
}