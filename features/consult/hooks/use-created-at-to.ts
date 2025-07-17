import { create } from "zustand";

interface CreatedAtToState {
  createdAtToValue: string;
  setCreatedAtToValue: (value: string) => void;
}

export const useCreatedAtToStore = create<CreatedAtToState>((set) => ({
  createdAtToValue: "",
  setCreatedAtToValue: (value: string) => set({ createdAtToValue: value }),
}));
