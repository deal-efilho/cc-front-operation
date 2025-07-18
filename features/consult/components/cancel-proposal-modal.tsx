"use client";

import { XIcon, Trash2 } from "lucide-react";
import { Button } from "@mfe/cc-front-shared";
import { BaseModal } from "@/components/ui/base-modal";

import {
  useCancelProposalModalStore,
  useviewProposalModalStore,
} from "../hooks";

export function CancelProposalModal() {
  const { cancelProposalModalIsOpen, setOpenCancelProposalModal } =
    useCancelProposalModalStore();
  const { proposal } = useviewProposalModalStore();

  const handleClose = () => setOpenCancelProposalModal(false);

  return (
    <BaseModal
      isOpen={cancelProposalModalIsOpen}
      onClose={handleClose}
      title="Cancelar proposta"
      size="md"
      showIcon={false}
    >
      <div className="px-6 pt-4 pb-6">
        <div className="space-y-4">
          <div className="space-y-3"></div>

          <p>
            <b>Você tem certeza que quer cancelar a proposta com os dados abaixo?</b> <br /><br />
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
              <Trash2 className="size-4" />
              Confirmar cancelamento
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex items-center gap-2"
            >
              <XIcon className="size-4" />
              Fechar
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
