"use client"

import { useState } from "react"
import { Button, Card, CardContent, Label, Checkbox } from "@mfe/cc-front-shared"
import { SaveIcon, EditIcon } from "lucide-react"
import { useModal } from "@/hooks/use-modal"
import { ConfirmationModal } from "@/components/confirmation-modal"

export interface OperationItem {
  id: string
  operacao: 'COMPRA' | 'VENDA'
  moedaOperacional: string
  quantidade: number
  taxaNegociada: number
  valorOperacao: number
  taxaAdministrativa: number
  iof: number
  valorTotal: number
  vet: number
  corporate: boolean
}

interface OperationsCartProps {
  operations: OperationItem[]
  onCopy: (operation: OperationItem) => void
  onRemove: (id: string) => void
  onSave: () => void
  onRegister: () => void
  getTotalValue: () => number
  getTotalType: () => string
  getAbsoluteTotalValue: () => number
}

export function OperationsCart({
  operations,
  onCopy,
  onRemove,
  onSave,
  onRegister,
  getTotalValue,
  getTotalType,
  getAbsoluteTotalValue
}: OperationsCartProps) {
  const [cartaoDebitoChecked, setCartaoDebitoChecked] = useState(false)
  const [pendingAction, setPendingAction] = useState<{
    type: 'copy' | 'remove'
    data: OperationItem | string
  } | null>(null)

  const confirmationModal = useModal()
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value)
  }

  const handleCopyClick = (operation: OperationItem) => {
    setPendingAction({ type: 'copy', data: operation })
    confirmationModal.open()
  }

  const handleRemoveClick = (id: string) => {
    setPendingAction({ type: 'remove', data: id })
    confirmationModal.open()
  }

  const handleConfirmAction = () => {
    if (pendingAction) {
      if (pendingAction.type === 'copy') {
        onCopy(pendingAction.data as OperationItem)
      } else {
        onRemove(pendingAction.data as string)
      }
      setPendingAction(null)
    }
  }

  const handleCancelAction = () => {
    setPendingAction(null)
    confirmationModal.close()
  }

  const getConfirmationMessage = () => {
    if (!pendingAction) return ''

    if (pendingAction.type === 'copy') {
      const operation = pendingAction.data as OperationItem
      return `Deseja realmente copiar a operação de ${operation.operacao.toLowerCase()} de ${operation.moedaOperacional}?`
    } else {
      return 'Deseja realmente remover esta operação do carrinho?'
    }
  }

  if (operations.length === 0) {
    return null
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center pb-4">
            <Label className="text-lg font-semibold">Carrinho de Operações</Label>
          </div>

          {/* DataTable sem paginação */}
          <div className="border rounded-lg">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">Operação</th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">Moeda Operacional</th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">Quantidade</th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">Taxa Negociada</th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">Valor Operação</th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">Taxa Administrativa</th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">IOF</th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">Valor Total</th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">V.E.T</th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">Corporate</th>
                  <th className="border-b px-3 py-2 text-left text-sm font-semibold text-blue-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {operations.map((operation, index) => (
                  <tr key={operation.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border-b px-3 py-2 text-sm">
                      <span className={operation.operacao === 'VENDA' ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                        {operation.operacao.charAt(0) + operation.operacao.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="border-b px-3 py-2 text-sm">{operation.moedaOperacional}</td>
                    <td className="border-b px-3 py-2 text-sm font-medium">
                      ${operation.quantidade.toFixed(2)}
                    </td>
                    <td className="border-b px-3 py-2 text-sm">
                      R$ {operation.taxaNegociada.toFixed(5).replace(".", ",")}
                    </td>
                    <td className="border-b px-3 py-2 text-sm font-medium">
                      {formatCurrency(operation.valorOperacao)}
                    </td>
                    <td className="border-b px-3 py-2 text-sm">
                      {formatCurrency(operation.taxaAdministrativa)}
                    </td>
                    <td className="border-b px-3 py-2 text-sm">
                      {formatCurrency(operation.iof)}
                    </td>
                    <td className="border-b px-3 py-2 text-sm font-bold">
                      {formatCurrency(operation.valorTotal)}
                    </td>
                    <td className="border-b px-3 py-2 text-sm">
                      {operation.vet.toFixed(5)}
                    </td>
                    <td className="border-b px-3 py-2 text-sm">
                      {operation.corporate ? "Sim" : "Não"}
                    </td>
                    <td className="border-b px-3 py-2">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyClick(operation)}
                          className="h-8 w-8 p-0"
                          title="Copiar"
                        >
                          <span className="text-blue-600">📋</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveClick(operation.id)}
                          className="h-8 w-8 p-0"
                          title="Remover"
                        >
                          <span className="text-red-600">🗑️</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer com totais */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex items-center gap-2">
              <Checkbox
                id="cartaoDebito"
                checked={cartaoDebitoChecked}
                disabled />
              <Label htmlFor="cartaoDebito" className="text-sm text-gray-600">
                Propostas criadas para cancelamento de Cartão de Débito
              </Label>
            </div>
            <div className="text-lg font-bold">
              Total {getTotalType()} {formatCurrency(getAbsoluteTotalValue()).replace('R$ ', '')}
            </div>
          </div>

          {/* Botões movidos para baixo */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="primary"
              size="sm"
              onClick={onSave}
              className="flex items-center gap-2"
            >
              <SaveIcon className="size-4" />
              Salvar / Incluir Proposta
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onRegister}
              className="flex items-center gap-2"
            >
              <EditIcon className="size-4" />
              Registrar Cotação
            </Button>
          </div>
        </div>

        <ConfirmationModal
          isOpen={confirmationModal.isOpen}
          onClose={handleCancelAction}
          onConfirm={handleConfirmAction}
          title={pendingAction?.type === 'copy' ? 'Confirmar Cópia' : 'Confirmar Remoção'}
          message={getConfirmationMessage()}
          confirmText={pendingAction?.type === 'copy' ? 'Copiar' : 'Remover'}
          cancelText="Cancelar"
          variant={pendingAction?.type === 'remove' ? 'danger' : 'info'}
        />
      </CardContent>
    </Card>
  )
}