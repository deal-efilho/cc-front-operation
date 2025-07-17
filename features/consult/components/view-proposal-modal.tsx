"use client";

import { Check } from "lucide-react";
import { Button } from "@mfe/cc-front-shared";
import { BaseModal } from "@/components/ui/base-modal";

import { useviewProposalModalStore } from "../hooks";

export function ViewProposalModal() {
  const { proposal, viewProposalModalIsOpen, setOpenViewProposalModal } =
    useviewProposalModalStore();

  const handleClose = () => setOpenViewProposalModal(false);

  return (
    <BaseModal
      isOpen={viewProposalModalIsOpen}
      onClose={handleClose}
      title="Visualizar proposta"
      size="md"
      showIcon={false}
    >
      <div className="px-6 pt-4 pb-6">
        <div className="space-y-4">
          <div className="space-y-3"></div>

          <p>
            Número da proposta: {proposal.number} <br />
            Nome do cliente: {proposal.name} <br />
            Documento do cliente: {proposal.doc}
          </p>
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex items-center gap-2"
            >
              <Check className="size-4" />
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
