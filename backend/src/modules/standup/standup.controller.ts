import { Request, Response } from 'express';
import {
  createStandup,
  getUserStandups,
  getAdminAllStandups,
  getStandupDetail,
} from './standup.service';

// POST /api/standups — generate + simpan standup baru
export async function createStandupHandler(req: Request, res: Response) {
  try {

    console.log('req.user:', req.user);  // liat di terminal backend
    const { rawInput } = req.body;
    const userId = req.user!.id;

    const standup = await createStandup(userId, rawInput);
    res.status(201).json({ standup });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

// GET /api/standups — history standup user sendiri
export async function getUserStandupsHandler(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const standups = await getUserStandups(userId);
    res.json({ standups });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// GET /api/standups/:id — detail satu standup
export async function getStandupDetailHandler(req: Request, res: Response) {
  try {
    const standupId = parseInt(String(req.params.id));
    const { id: userId, role } = req.user!;

    const standup = await getStandupDetail(standupId, userId, role);
    res.json({ standup });
  } catch (error: any) {
    const status = error.message === 'Akses ditolak' ? 403 : 404;
    res.status(status).json({ message: error.message });
  }
}

// GET /api/admin/standups — semua standup (admin only)
export async function getAllStandupsHandler(req: Request, res: Response) {
  try {
    const standups = await getAdminAllStandups();
    res.json({ standups });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}