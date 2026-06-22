import { create } from 'zustand';
import type { Standup } from '../types';
import { createStandup, fetchMyStandups } from '../services/standup.service';

interface StandupState {
  history: Standup[];
  currentReport: string | null;
  isGenerating: boolean;
  isFetchingHistory: boolean;
  error: string | null;

  generate: (rawInput: string) => Promise<void>;
  loadHistory: () => Promise<void>;
  clearReport: () => void;
}

export const useStandupStore = create<StandupState>((set) => ({
  history: [],
  currentReport: null,
  isGenerating: false,
  isFetchingHistory: false,
  error: null,

  generate: async (rawInput) => {
    set({ isGenerating: true, error: null, currentReport: null });
    try {
      const { standup } = await createStandup(rawInput);
      set((state) => ({
        currentReport: standup.generated_report,
        history: [standup, ...state.history],
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Gagal generate standup' });
    } finally {
      set({ isGenerating: false });
    }
  },

  loadHistory: async () => {
    set({ isFetchingHistory: true });
    try {
      const { standups } = await fetchMyStandups();
      set({ history: standups });
    } catch {
      set({ error: 'Gagal memuat history' });
    } finally {
      set({ isFetchingHistory: false });
    }
  },

  clearReport: () => set({ currentReport: null }),
}));