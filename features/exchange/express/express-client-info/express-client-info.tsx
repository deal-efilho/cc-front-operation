"use client"

import { Button, StarRating } from "@mfe/cc-front-shared"
import { ClockIcon } from "lucide-react"
import { useModal } from "@/hooks/use-modal"
import { HistoryModal } from "@/features/exchange/components/history-modal/history-modal"

interface ExpressClientInfoProps {
  nome: string
  classificacao: number
  valorDisponivelCompra: number
  valorDisponivelVenda: number
}

export function ExpressClientInfo({
  nome,
  classificacao,
  valorDisponivelCompra,
  valorDisponivelVenda
}: ExpressClientInfoProps) {
  const historyModal = useModal()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <>
      <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">👤 {nome}</span>
            <StarRating filledStars={classificacao} />
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span>
              <span className="text-gray-600">Compra:</span>
              <span className="font-medium text-blue-600 ml-1">{formatCurrency(valorDisponivelCompra)}</span>
            </span>
            <span>
              <span className="text-gray-600">Venda:</span>
              <span className="font-medium text-red-600 ml-1">{formatCurrency(valorDisponivelVenda)}</span>
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={historyModal.open}
          className="flex items-center gap-2 h-8"
        >
          <ClockIcon className="size-4" />
          Histórico
        </Button>
      </div>

      <HistoryModal
        isOpen={historyModal.isOpen}
        onClose={historyModal.close}
        clientName={nome}
      />
    </>
  )
}