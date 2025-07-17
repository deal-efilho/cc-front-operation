import { create } from "zustand";

type Proposal = {
  name: string;
  doc: string;
  number: string;
};

interface ViewProposalModalState {
  viewProposalModalIsOpen: boolean;
  setOpenViewProposalModal: (value: boolean) => void;
  setViewProposalDataValue: (proposal: Proposal) => void;
  proposal: Proposal;
}

export const useviewProposalModalStore = create<ViewProposalModalState>(
  (set) => ({
    viewProposalModalIsOpen: false,
    setOpenViewProposalModal: (value: boolean) =>
      set({ viewProposalModalIsOpen: value }),
    setViewProposalDataValue: (proposal) => set({ proposal }),
    proposal: {
      name: "",
      doc: "",
      number: "",
    },
  })
);
