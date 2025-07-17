import { create } from "zustand";

interface CertificateState {
  certificateValue: string;
  setCertificateValue: (value: string) => void;
}

export const useCertificateStore = create<CertificateState>((set) => ({
  certificateValue: "",
  setCertificateValue: (value: string) => set({ certificateValue: value }),
}));
