import { create } from "zustand";

interface TextAssistenceState {
  textAssistenceValue: string;
  setTextAssistenceValue: (value: string) => void;
}

export const usetextAssistenceStore = create<TextAssistenceState>((set) => ({
  textAssistenceValue: "Ao selecionar os campos para preenchimento, deixamos aqui algumas dicas para tornar sua tarefa mais fácil e rápida.",
  setTextAssistenceValue: (value: string) => set({ textAssistenceValue: value }),
}));
