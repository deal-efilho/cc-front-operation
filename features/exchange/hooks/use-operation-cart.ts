import { create } from 'zustand'
import type { ExchangeFormData } from './use-exchange-form'
import type { OperationItem } from '../components/operation-cart/operation-cart'

interface OperationsCartState {
  operations: OperationItem[]
  addOperation: (formData: ExchangeFormData) => void
  copyOperation: (operation: OperationItem) => void
  removeOperation: (id: string) => void
  clearCart: () => void
  getTotalValue: () => number
  getTotalType: () => string
  getAbsoluteTotalValue: () => number
}

const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

const mapFormDataToOperation = (formData: ExchangeFormData): OperationItem => {
  // Calcular valor da operação (quantidade * taxa)
  const valorOperacao = formData.quantidade * formData.taxa

  // Calcular VET (Valor Efetivo Total) - simplificado
  const vet = formData.taxa * 1.001

  return {
    id: generateId(),
    operacao: formData.operacao,
    moedaOperacional: getMoedaLabel(formData.moeda),
    quantidade: formData.quantidade,
    taxaNegociada: formData.taxa,
    valorOperacao,
    taxaAdministrativa: formData.taxaAdministrativa,
    iof: formData.iof,
    valorTotal: formData.valorTotal,
    vet,
    corporate: formData.corporate
  }
}

const getMoedaLabel = (moeda: string): string => {
  const moedaMap: Record<string, string> = {
    'USD_ESPECIE': 'Dólar Espécie',
    'EUR_ESPECIE': 'Euro Espécie'
  }
  return moedaMap[moeda] || moeda
}

export const useOperationsCartStore = create<OperationsCartState>((set, get) => ({
  operations: [],

  addOperation: (formData: ExchangeFormData) => {
    const newOperation = mapFormDataToOperation(formData)
    set((state) => ({
      operations: [...state.operations, newOperation]
    }))
  },

  copyOperation: (operation: OperationItem) => {
    const copiedOperation = {
      ...operation,
      id: generateId() // Gera novo ID para a cópia
    }
    set((state) => ({
      operations: [...state.operations, copiedOperation]
    }))
    console.log('Operação copiada:', copiedOperation) // Debug
  },

  removeOperation: (id: string) => {
    set((state) => ({
      operations: state.operations.filter(op => op.id !== id)
    }))
  },

  clearCart: () => {
    set({ operations: [] })
  },

  getTotalValue: () => {
    const { operations } = get()
    return operations.reduce((total, op) => {
      // COMPRA: soma no total (valor a pagar)
      // VENDA: subtrai do total (valor a receber)
      return op.operacao === 'COMPRA'
        ? total + op.valorTotal
        : total - op.valorTotal
    }, 0)
  },

  getTotalType: () => {
    const totalValue = get().getTotalValue()
    return totalValue >= 0 ? 'A PAGAR' : 'A RECEBER'
  },

  getAbsoluteTotalValue: () => {
    return Math.abs(get().getTotalValue())
  }
}))