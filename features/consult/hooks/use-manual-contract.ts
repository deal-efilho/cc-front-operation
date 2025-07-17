import { create } from "zustand";

interface manualContractState {
  manualContractValue: string;
  setManualContractValue: (value: string) => void;
  manualContractOptions: {
    value: string;
    label: string;
  }[];
}

const manualContractOptions = [
  {
    value: "yes",
    label: "SIM",
  },
  {
    value: "no",
    label: "NÂO",
  },
];

export const useManualContractStore = create<manualContractState>((set) => ({
  manualContractValue: "",
  setManualContractValue: (value: string) => set({ manualContractValue: value }),
  manualContractOptions,
}));
