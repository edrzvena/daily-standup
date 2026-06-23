import { Router } from 'express';
import { registerHandler, loginHandler, getAllUsersHandler } from './auth.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { adminOnly } from '../../middlewares/role.middleware';

const router = Router();
router.post('/register', registerHandler);
router.post('/login', loginHandler);

// Tambah di bawah route register & login
router.get('/users', authMiddleware, adminOnly, getAllUsersHandler);

export default router;