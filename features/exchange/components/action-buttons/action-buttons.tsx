"use client"

import { Button } from "@mfe/cc-front-shared";
import { ClockIcon, UserSearchIcon } from "lucide-react";
import { useModal } from "@/hooks/use-modal";
import { ContactSelectionModal } from "../contact-selection-modal/contact-selection-modal";
import { HistoryModal } from "../history-modal/history-modal";

interface ActionButtonsProps {
  clientName?: string;
}

function ActionButtons({ clientName }: ActionButtonsProps) {
  const contactModal = useModal()
  const historyModal = useModal()

  const handleContactSearch = (type: string, value: string) => {
    console.log('Buscar contato:', { type, value })
  }

  const handleHistorico = () => {
    console.log('Abrindo histórico de operações')
    historyModal.open()
  }

  return (
    <>
      <div className="flex gap-3">
        <Button
          onClick={contactModal.open}
          className="flex items-center gap-2"
        >
          <UserSearchIcon className="size-4" />
          Selecionar
        </Button>

        <Button
          variant="outline"
          onClick={handleHistorico}
          className="flex items-center gap-2"
        >
          <ClockIcon className="size-4" />
          Histórico de Operações
        </Button>
      </div>

      <ContactSelectionModal
        isOpen={contactModal.isOpen}
        onClose={contactModal.close}
        onSearch={handleContactSearch}
      />

      <HistoryModal
        isOpen={historyModal.isOpen}
        onClose={historyModal.close}
        clientName={clientName}
      />
    </>
  );
}

export { ActionButtons };