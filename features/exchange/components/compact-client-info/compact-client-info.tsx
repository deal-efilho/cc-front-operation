// features/exchange/components/compact-client-info/compact-client-info.tsx
"use client"

import { Button, Card, CardContent, StarRating, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@mfe/cc-front-shared"
import { ClockIcon, Link2Icon, SquareArrowOutUpRightIcon, UserIcon } from "lucide-react"
import { useModal } from "@/hooks/use-modal"
import { ClientDetailsModal } from "../client-details-modal/client-details-modal"
import { HistoryModal } from "../history-modal/history-modal"
import { useUserDetailsStore } from "../../hooks/use-user-details"

const SITUACOES_RECEITA = [
  { value: "regular", label: "Regular" },
  { value: "pendente", label: "Pendente de Regularização" },
  { value: "cancelado", label: "Suspenso/Cancelado" },
]

interface CompactClientInfoProps {
  nome: string
  classificacao: number
  valorDisponivelCompra: number
  valorDisponivelVenda: number
  situacaoReceita: string
  usuarioUltimaAtualizacao: string
  dataUltimaAtualizacao: string
  diferencial: number
}

export function CompactClientInfo({
  nome,
  classificacao,
  valorDisponivelCompra,
  valorDisponivelVenda,
  situacaoReceita,
  usuarioUltimaAtualizacao,
  dataUltimaAtualizacao,
  diferencial
}: CompactClientInfoProps) {
  const clientDetailsModal = useModal()
  const historyModal = useModal()
  const { setUserDetails } = useUserDetailsStore()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const handleSituacaoChange = (value: string) => {
    setUserDetails({ situacaoReceita: value })
  }

  return (
    <>
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="space-y-2">
            {/* Linha 1 - Nome, Estrelas e Botão Histórico */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserIcon className="size-4 text-blue-600" />
                <button
                  onClick={clientDetailsModal.open}
                  className="text-base font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  {nome}
                </button>
                <StarRating filledStars={classificacao} />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={historyModal.open}
                className="flex items-center gap-1 h-8 text-xs px-3"
              >
                <ClockIcon className="size-3" />
                Histórico
              </Button>
            </div>

            {/* Linha 2 - Dados de Atualização */}
            <div className="text-xs text-gray-600 flex items-center gap-6">
              <span>
                <strong>Atualizado por:</strong> {usuarioUltimaAtualizacao}
              </span>
              <span>
                <strong>Em:</strong> {dataUltimaAtualizacao}
              </span>
              <span>
                <strong>% Diferencial:</strong> {diferencial.toFixed(2)}%
              </span>
            </div>

            {/* Linha 3 - Situação Receita e Valores Disponíveis */}
            <div className="flex items-center justify-between">
              {/* Situação Receita */}
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-600 font-medium">Situação Receita:</span>
                <Select value={situacaoReceita} onValueChange={handleSituacaoChange}>
                  <SelectTrigger className="h-7 text-sm w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SITUACOES_RECEITA.map((situacao) => (
                      <SelectItem key={situacao.value} value={situacao.value}>
                        {situacao.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-3"
                  onClick={() => console.log('Validando situação...')}
                >
                  <SquareArrowOutUpRightIcon className="size-4" />
                </Button>
              </div>

              {/* Valores Disponíveis */}
              <div className="bg-white rounded-lg px-4 py-2 border shadow-sm">
                <div className="text-xs font-semibold text-gray-700 mb-1 text-center">
                  Valor Disponível
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-gray-500 text-xs">Compra:</div>
                    <div className="font-bold text-blue-600">{formatCurrency(valorDisponivelCompra)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-500 text-xs">Venda:</div>
                    <div className="font-bold text-red-600">{formatCurrency(valorDisponivelVenda)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ClientDetailsModal
        isOpen={clientDetailsModal.isOpen}
        onClose={clientDetailsModal.close}
        clientName={nome}
      />

      <HistoryModal
        isOpen={historyModal.isOpen}
        onClose={historyModal.close}
        clientName={nome}
      />
    </>
  )
}