import { create } from "zustand";

interface CreatedAtFromState {
  createdAtFromValue: string;
  setCreatedAtFromValue: (value: string) => void;
}

export const useCreatedAtFromStore = create<CreatedAtFromState>((set) => ({
  createdAtFromValue: "",
  setCreatedAtFromValue: (value: string) => set({ createdAtFromValue: value }),
}));
