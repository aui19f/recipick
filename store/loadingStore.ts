import { create } from "zustand";

type LoadingState = {
  isLoading: boolean;
  loadingStart: () => void;
  loadingEnd: () => void;
};

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  loadingStart: () => set({ isLoading: true }),
  loadingEnd: () => set({ isLoading: false }),
}));
