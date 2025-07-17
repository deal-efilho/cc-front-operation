import { create } from "zustand";

interface clientNameState {
  clientNameValue: string;
  setClientNameValue: (value: string) => void;
}

export const useClientNameStore = create<clientNameState>((set) => ({
  clientNameValue: "",
  setClientNameValue: (value: string) => set({ clientNameValue: value }),
}));
