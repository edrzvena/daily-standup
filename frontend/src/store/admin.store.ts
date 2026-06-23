import { create } from 'zustand';
import type { User, Standup } from '../types';
import { fetchAllUsers, fetchAllStandups } from '../services/standup.service';

interface AdminState {
  users: User[];
  standups: Standup[];
  isLoadingUsers: boolean;
  isLoadingStandups: boolean;
  error: string | null;

  loadUsers: () => Promise<void>;
  loadStandups: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  users: [],
  standups: [],
  isLoadingUsers: false,
  isLoadingStandups: false,
  error: null,

  loadUsers: async () => {
    set({ isLoadingUsers: true, error: null });
    try {
      const { users } = await fetchAllUsers();
      set({ users });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Gagal memuat users' });
    } finally {
      set({ isLoadingUsers: false });
    }
  },

  loadStandups: async () => {
    set({ isLoadingStandups: true, error: null });
    try {
      const { standups } = await fetchAllStandups();
      set({ standups });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Gagal memuat standups' });
    } finally {
      set({ isLoadingStandups: false });
    }
  },
}));