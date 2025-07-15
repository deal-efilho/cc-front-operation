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
  valorLiquido: number
  campanha: string
  naturezaOperacao: string
}

export interface AdjustmentData {
  adjustBy: 'taxa' | 'quantidade'
  liquidValue: number
  options: {
    cedulas200_500_1000: boolean
    caraGrandeBrancaPequena: boolean
    foraCirculacao: boolean
    manchadasRiscadas: boolean
  }
  discountApplied?: number
}

interface ExchangeFormState {
  formData: ExchangeFormData
  isVisible: boolean
  documento: string | null
  setFormData: (data: Partial<ExchangeFormData>) => void
  calculateValues: () => void
  adjustValues: (adjustmentData: AdjustmentData) => void
  roundValues: () => void
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
  valorLiquido: 0,
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
    const valorLiquido = valorTotal - taxaAdministrativa - iof

    set((state) => ({
      formData: {
        ...state.formData,
        taxa: Number(taxa.toFixed(5)),
        taxaEspecial: Number(taxaEspecial.toFixed(5)),
        taxaDesejada: Number(taxaDesejada.toFixed(5)),
        iof: Number(iof.toFixed(2)),
        valorTotal: Number(valorTotal.toFixed(2)),
        valorLiquido: Number(valorLiquido.toFixed(2))
      }
    }))
  },

  adjustValues: (adjustmentData: AdjustmentData) => {
    const { formData } = get()
    const { taxaAdministrativa } = formData
    let { liquidValue } = adjustmentData

    // Aplicar desconto se selecionado
    if (adjustmentData.options.cedulas200_500_1000) {
      liquidValue = liquidValue * 0.88 // 12% de desconto
    }

    if (adjustmentData.adjustBy === 'taxa') {
      // Ajustar pela taxa, mantendo a quantidade
      const quantidade = formData.quantidade
      const iof = liquidValue * 0.0038
      const valorTotal = liquidValue + taxaAdministrativa + iof
      const taxa = (valorTotal - taxaAdministrativa - iof) / quantidade

      set((state) => ({
        formData: {
          ...state.formData,
          taxa: Number(taxa.toFixed(5)),
          taxaEspecial: Number((taxa * 0.998).toFixed(5)),
          taxaDesejada: Number((taxa * 1.002).toFixed(5)),
          iof: Number(iof.toFixed(2)),
          valorTotal: Number(valorTotal.toFixed(2)),
          valorLiquido: Number(liquidValue.toFixed(2))
        }
      }))
    } else {
      // Ajustar pela quantidade, mantendo a taxa
      const taxa = formData.taxa
      const quantidade = liquidValue / taxa
      const iof = quantidade * taxa * 0.0038
      const valorTotal = quantidade * taxa + iof + taxaAdministrativa

      set((state) => ({
        formData: {
          ...state.formData,
          quantidade: Number(quantidade.toFixed(2)),
          iof: Number(iof.toFixed(2)),
          valorTotal: Number(valorTotal.toFixed(2)),
          valorLiquido: Number(liquidValue.toFixed(2))
        }
      }))
    }
  },

  roundValues: () => {
    const { formData } = get()
    const { taxaAdministrativa } = formData

    const valorTotalRounded = Math.ceil(formData.valorTotal)
    const valorLiquido = valorTotalRounded - taxaAdministrativa - formData.iof

    const taxa = (valorTotalRounded - taxaAdministrativa - formData.iof) / formData.quantidade

    set((state) => ({
      formData: {
        ...state.formData,
        taxa: Number(taxa.toFixed(5)),
        taxaEspecial: Number((taxa * 0.998).toFixed(5)),
        taxaDesejada: Number((taxa * 1.002).toFixed(5)),
        valorTotal: valorTotalRounded,
        valorLiquido: Number(valorLiquido.toFixed(2))
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