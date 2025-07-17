import { create } from "zustand";

interface BankIdState {
  bankIdValue: string;
  setBankIdValue: (value: string) => void;
}

export const useBankIdStore = create<BankIdState>((set) => ({
  bankIdValue: "",
  setBankIdValue: (value: string) => set({ bankIdValue: value }),
}));
