import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HistoryItem {
    id: string;
    timestamp: Date;
    type: 'report' | 'aggregate';
    params: {
        rows?: number;
        filename?: string;
    };
    result?: unknown;
    status: 'success' | 'error' | 'pending';
}

interface StoreState {
    history: HistoryItem[];
    isLoading: boolean;
    currentData: unknown;
    addHistoryItem: (item: Omit<HistoryItem, 'id'>) => string;
    updateHistoryItem: (id: string, update: Partial<HistoryItem>) => void;
    removeHistoryItem: (id: string) => void;
    setLoading: (loading: boolean) => void;
    setCurrentData: (data: unknown) => void;
    clearHistory: () => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            history: [],
            isLoading: false,
            currentData: null,

            addHistoryItem: (item) => {
                const newItem = {
                    ...item,
                    id: Date.now().toString(),
                };
                set({ history: [newItem, ...get().history] });
                return newItem.id;
            },

            updateHistoryItem: (id, update) => {
                set({
                    history: get().history.map((item) =>
                        item.id === id ? { ...item, ...update } : item
                    ),
                });
            },

            removeHistoryItem: (id) => {
                set({
                    history: get().history.filter((item) => item.id !== id),
                });
            },

            setLoading: (loading) => set({ isLoading: loading }),
            setCurrentData: (data) => set({ currentData: data }),
            clearHistory: () => set({ history: [] }),
        }),
        {
            name: 'app-storage',
            partialize: (state) => ({ history: state.history }),
        }
    )
);
