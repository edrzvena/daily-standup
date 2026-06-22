import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { adminOnly } from '../../middlewares/role.middleware';
import {
  createStandupHandler,
  getUserStandupsHandler,
  getStandupDetailHandler,
  getAllStandupsHandler,
} from './standup.controller';

const router = Router();

// Semua route di sini wajib login dulu
router.use(authMiddleware);

// User routes
router.post('/', createStandupHandler);
router.get('/', getUserStandupsHandler);
router.get('/:id', getStandupDetailHandler);

// Admin only
router.get('/admin/all', adminOnly, getAllStandupsHandler);

export default router;