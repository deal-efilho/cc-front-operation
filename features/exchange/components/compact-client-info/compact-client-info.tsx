"use client"

import { Button, Card, CardContent, StarRating, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@mfe/cc-front-shared"
import { ClockIcon, UserIcon } from "lucide-react"
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
            {/* Informações Básicas do Cliente */}
            <div className="lg:col-span-2 space-y-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={clientDetailsModal.open}
                  className="text-lg font-semibold text-blue-600 hover:underline cursor-pointer transition-colors flex items-center gap-2"
                >
                  <UserIcon className="size-5" />
                  {nome}
                </button>
                <StarRating filledStars={classificacao} />
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Atualizado por:</span> {usuarioUltimaAtualizacao}
                </div>
                <div>
                  <span className="font-medium">Em:</span> {dataUltimaAtualizacao}
                </div>
                <div>
                  <span className="font-medium">% Diferencial:</span> {diferencial.toFixed(2)}%
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-xs">Situação Receita:</span>
                  <Select value={situacaoReceita} onValueChange={handleSituacaoChange}>
                    <SelectTrigger className="h-6 text-xs w-auto min-w-20">
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
                  <button className="text-blue-600 hover:text-blue-800 text-xs underline">
                    Validar
                  </button>
                </div>
              </div>
            </div>

            {/* Valores Disponíveis */}
            <div className="bg-white rounded-lg p-3 border">
              <h4 className="text-sm font-semibold text-gray-700 mb-2 text-center">
                Valor Disponível
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Compra:</span>
                  <span className="font-medium text-blue-600">{formatCurrency(valorDisponivelCompra)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Venda:</span>
                  <span className="font-medium text-red-600">{formatCurrency(valorDisponivelVenda)}</span>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col gap-2">
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