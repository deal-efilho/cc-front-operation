import { create } from "zustand";

interface StoreCreateState {
  storeCreateValue: string;
  setStoreCreateValue: (value: string) => void;
  storeCreateOptions: {
    value: string;
    label: string;
  }[];
}

const storeCreateOptions = [
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

export const useStoreCreateStore = create<StoreCreateState>((set) => ({
  storeCreateValue: "CPS SH DOM PEDRO",
  setStoreCreateValue: (value: string) => set({ storeCreateValue: value }),
  storeCreateOptions,
}));
