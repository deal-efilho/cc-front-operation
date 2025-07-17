import { create } from "zustand";

interface numberState {
  numberValue: string;
  setNumberValue: (value: string) => void;
}

export const useNumberStore = create<numberState>((set) => ({
  numberValue: "",
  setNumberValue: (value: string) => set({ numberValue: value }),
}));
