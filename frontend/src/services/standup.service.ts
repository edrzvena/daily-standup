import { api } from '../config/api';
import type { Standup, AuthResponse, User } from '../types';

// AUTH
export async function registerUser(email: string, password: string) {
  const res = await api.post('/auth/register', { email, password });
  return res.data;
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
}

// STANDUP
export async function createStandup(rawInput: string): Promise<{ standup: Standup }> {
  const res = await api.post('/standups', { rawInput });
  return res.data;
}

export async function fetchMyStandups(): Promise<{ standups: Standup[] }> {
  const res = await api.get('/standups');
  return res.data;
}

export async function fetchStandupDetail(id: number): Promise<{ standup: Standup }> {
  const res = await api.get(`/standups/${id}`);
  return res.data;
}

// ADMIN
export async function fetchAllStandups(): Promise<{ standups: Standup[] }> {
  const res = await api.get('/standups/admin/all');
  return res.data;
}

export async function fetchAllUsers(): Promise<{ users: User[] }> {
  const res = await api.get('/auth/users');
  return res.data;
}