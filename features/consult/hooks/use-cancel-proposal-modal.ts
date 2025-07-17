import { create } from "zustand";

interface CancelProposalModalState {
  cancelProposalModalIsOpen: boolean;
  setOpenCancelProposalModal: (value: boolean) => void;
}

export const useCancelProposalModalStore = create<CancelProposalModalState>(
  (set) => ({
    cancelProposalModalIsOpen: false,
    setOpenCancelProposalModal: (value: boolean) =>
      set({ cancelProposalModalIsOpen: value }),
  })
);
