"use client";

import { create } from "zustand";

interface SearchStore {
  isOpen: boolean;
  initialQuery: string;
  open: (query?: string) => void;
  close: () => void;
  toggle: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  isOpen: false,
  initialQuery: "",
  open: (query) => set({ isOpen: true, initialQuery: query ?? "" }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
}));
