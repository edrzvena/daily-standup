import { generateStandupReport } from '../../services/claude.service';
import {
  saveStandup,
  getStandupsByUser,
  getAllStandups,
  getStandupById,
} from './standup.repository';

export async function createStandup(userId: number, rawInput: string) {
  if (!rawInput || rawInput.trim().length === 0) {
    throw new Error('Input tidak boleh kosong');
  }

  const report = await generateStandupReport(rawInput);
  const standup = await saveStandup(userId, rawInput, report);
  return standup;
}

export async function getUserStandups(userId: number) {
  return await getStandupsByUser(userId);
}

export async function getAdminAllStandups() {
  return await getAllStandups();
}

export async function getStandupDetail(standupId: number, userId: number, role: string) {
  const standup = await getStandupById(standupId);
  if (!standup) throw new Error('Standup tidak ditemukan');

  // User biasa hanya bisa liat punya sendiri
  if (role !== 'admin' && standup.user_id !== userId) {
    throw new Error('Akses ditolak');
  }

  return standup;
}