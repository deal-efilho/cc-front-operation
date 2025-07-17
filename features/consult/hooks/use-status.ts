import { create } from "zustand";

interface statusState {
  statusValue: string;
  setStatusValue: (value: string) => void;
  statusOptions: {
    value: string;
    label: string;
  }[];
}

const statusOptions = [
  {
    value: "all",
    label: "Todos",
  },
  {
    value: "cancelled",
    label: "Cancelado",
  },
  {
    value: "approved",
    label: "Aprovado",
  },
  {
    value: "pending",
    label: "Pendente",
  },
];

export const useStatusStore = create<statusState>((set) => ({
  statusValue: "all",
  setStatusValue: (value: string) => set({ statusValue: value }),
  statusOptions,
}));
