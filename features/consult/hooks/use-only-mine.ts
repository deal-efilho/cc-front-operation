import { create } from "zustand";

interface OnlyMineState {
  onlyMineValue: boolean;
  setOnlyMineValue: (value: boolean) => void;
}

export const useOnlyMineStore = create<OnlyMineState>((set) => ({
  onlyMineValue: false,
  setOnlyMineValue: (value: boolean) => set({ onlyMineValue: value }),
}));
