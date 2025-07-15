import { create } from 'zustand'

export interface ExchangeFormData {
  loja: string
  operacao: 'COMPRA' | 'VENDA'
  moeda: string
  taxaAdministrativa: number
  canalAtendimento: string
  corporate: boolean
  retiradaHoje: boolean
  quantidade: number
  taxa: number
  taxaEspecial: number
  taxaDesejada: number
  iof: number
  valorTotal: number
  campanha: string
  naturezaOperacao: string
}

interface ExchangeFormState {
  formData: ExchangeFormData
  isVisible: boolean
  documento: string | null
  setFormData: (data: Partial<ExchangeFormData>) => void
  calculateValues: () => void
  showForm: (documento: string) => void
  hideForm: () => void
  resetForm: () => void
}

const initialFormData: ExchangeFormData = {
  loja: '',
  operacao: 'COMPRA',
  moeda: '',
  taxaAdministrativa: 12.90,
  canalAtendimento: '',
  corporate: false,
  retiradaHoje: false,
  quantidade: 1.00,
  taxa: 5.08375,
  taxaEspecial: 5.08375,
  taxaDesejada: 5.08375,
  iof: 0.02,
  valorTotal: 0,
  campanha: '',
  naturezaOperacao: '32999 - Viagem Internacional'
}

export const useExchangeFormStore = create<ExchangeFormState>((set, get) => ({
  formData: initialFormData,
  isVisible: false,
  documento: null,

  setFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data }
    }))

    if (data.quantidade !== undefined) {
      get().calculateValues()
    }
  },

  calculateValues: () => {
    const { formData } = get()
    const { quantidade, taxaAdministrativa } = formData

    const taxaBase = 5.08375
    const taxa = taxaBase * (1 + (quantidade - 1) * 0.001)
    const taxaEspecial = taxa * 0.998
    const taxaDesejada = taxa * 1.002
    const iof = quantidade * taxa * 0.0038
    const valorTotal = quantidade * taxa + iof + taxaAdministrativa

    set((state) => ({
      formData: {
        ...state.formData,
        taxa: Number(taxa.toFixed(5)),
        taxaEspecial: Number(taxaEspecial.toFixed(5)),
        taxaDesejada: Number(taxaDesejada.toFixed(5)),
        iof: Number(iof.toFixed(2)),
        valorTotal: Number(valorTotal.toFixed(2))
      }
    }))
  },

  showForm: (documento) => {
    set({ isVisible: true, documento })
    get().calculateValues()
  },

  hideForm: () => {
    set({ isVisible: false, documento: null })
  },

  resetForm: () => {
    set({
      formData: initialFormData,
      isVisible: false,
      documento: null
    })
  }
}))