import { create } from "zustand";

interface OnlyWithBalanceState {
  onlyWithBalanceValue: boolean;
  setOnlyWithBalanceValue: (value: boolean) => void;
}

export const useOnlyWithBalanceStore = create<OnlyWithBalanceState>((set) => ({
  onlyWithBalanceValue: false,
  setOnlyWithBalanceValue: (value: boolean) => set({ onlyWithBalanceValue: value }),
}));
