import { create } from "zustand";

interface StoreTaxState {
  storeTaxValue: string;
  setStoreTaxValue: (value: string) => void;
  storeTaxOptions: {
    value: string;
    label: string;
  }[];
}

const storeTaxOptions = [
  {
    value: "CPS SH DOM PEDRO",
    label: "CPS SH DOM PEDRO",
  },
  {
    value: "CE MESA",
    label: "CE MESA",
  },
  {
    value: "CI ONLINE",
    label: "CI ONLINE",
  },
];

export const useStoreTaxStore = create<StoreTaxState>((set) => ({
  storeTaxValue: "CPS SH DOM PEDRO",
  setStoreTaxValue: (value: string) => set({ storeTaxValue: value }),
  storeTaxOptions,
}));
