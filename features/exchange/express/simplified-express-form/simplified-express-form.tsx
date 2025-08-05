// features/exchange/express/simplified-express-form/simplified-express-form.tsx
"use client"

import { useEffect, useState } from "react"
import { Button, Input, Card, CardContent, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Label } from "@mfe/cc-front-shared"
import { PlusIcon, RefreshCwIcon, SettingsIcon, CircleIcon, SearchIcon, XIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"
import { useOperationsCartStore } from "../../hooks/use-operation-cart"
import { useModal } from "@/hooks/use-modal"
import { AdjustmentModal, type AdjustmentData } from "../../components/adjustment-modal/adjustment-modal"
import { normalizeText } from "@/lib/utils"
import { CardBalanceModal } from "../../components/card-balance-modal/card-balance-modal"

interface CurrencyLineData {
  moeda: string
  moedaLabel: string
  moedaNome: string
  taxaCompra: number
  taxaVenda: number
  quantidade: number
  taxaAdmin: number
  valor: number
  operacaoSelecionada: 'compra' | 'venda' | null
  naturezasDisponiveis: string[]
  naturezaSelecionada: string
}

const TODAS_MOEDAS: CurrencyLineData[] = [
  // Dólar Americano
  {
    moeda: "USD_ESPECIE",
    moedaLabel: "Dólar",
    moedaNome: "Espécie",
    taxaCompra: 6.08,
    taxaVenda: 6.18,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional", "Importação", "Exportação"],
    naturezaSelecionada: "Viagem Internacional"
  },
  {
    moeda: "USD_CONFIDENCE",
    moedaLabel: "Dólar",
    moedaNome: "CONFIDENCE MULTI MOEDA PLATINUM",
    taxaCompra: 6.05,
    taxaVenda: 6.15,
    quantidade: 0,
    taxaAdmin: 8.50,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Euro
  {
    moeda: "EUR_ESPECIE",
    moedaLabel: "Euro",
    moedaNome: "Espécie",
    taxaCompra: 6.35,
    taxaVenda: 6.48,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional", "32300 - Investimento Exterior"],
    naturezaSelecionada: "Viagem Internacional"
  },
  {
    moeda: "EUR_CONFIDENCE",
    moedaLabel: "Euro",
    moedaNome: "CONFIDENCE MULTI MOEDA PLATINUM",
    taxaCompra: 6.32,
    taxaVenda: 6.45,
    quantidade: 0,
    taxaAdmin: 8.50,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Libra Esterlina
  {
    moeda: "GBP_ESPECIE",
    moedaLabel: "Libra Esterlina",
    moedaNome: "Espécie",
    taxaCompra: 7.65,
    taxaVenda: 7.82,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  {
    moeda: "GBP_CONFIDENCE",
    moedaLabel: "Libra Esterlina",
    moedaNome: "CONFIDENCE MULTI MOEDA PLATINUM",
    taxaCompra: 7.62,
    taxaVenda: 7.79,
    quantidade: 0,
    taxaAdmin: 8.50,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Dólar Canadense
  {
    moeda: "CAD_ESPECIE",
    moedaLabel: "Dólar Canadense",
    moedaNome: "Espécie",
    taxaCompra: 4.28,
    taxaVenda: 4.38,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional", "Importação", "32400 - Serviços"],
    naturezaSelecionada: "Viagem Internacional"
  },
  {
    moeda: "CAD_CONFIDENCE",
    moedaLabel: "Dólar Canadense",
    moedaNome: "CONFIDENCE MULTI MOEDA PLATINUM",
    taxaCompra: 4.25,
    taxaVenda: 4.35,
    quantidade: 0,
    taxaAdmin: 8.50,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Dólar Australiano
  {
    moeda: "AUD_ESPECIE",
    moedaLabel: "Dólar Australiano",
    moedaNome: "Espécie",
    taxaCompra: 3.85,
    taxaVenda: 3.95,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  {
    moeda: "AUD_CONFIDENCE",
    moedaLabel: "Dólar Australiano",
    moedaNome: "CONFIDENCE MULTI MOEDA PLATINUM",
    taxaCompra: 3.82,
    taxaVenda: 3.92,
    quantidade: 0,
    taxaAdmin: 8.50,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Dólar Neozelandês
  {
    moeda: "NZD_ESPECIE",
    moedaLabel: "Dólar Neozelandês",
    moedaNome: "Espécie",
    taxaCompra: 3.52,
    taxaVenda: 3.62,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Coroa Dinamarquesa
  {
    moeda: "DKK_ESPECIE",
    moedaLabel: "Coroa Dinamarquesa",
    moedaNome: "Espécie",
    taxaCompra: 0.85,
    taxaVenda: 0.92,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Coroa Norueguesa
  {
    moeda: "NOK_ESPECIE",
    moedaLabel: "Coroa Norueguesa",
    moedaNome: "Espécie",
    taxaCompra: 0.54,
    taxaVenda: 0.58,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Coroa Sueca
  {
    moeda: "SEK_ESPECIE",
    moedaLabel: "Coroa Sueca",
    moedaNome: "Espécie",
    taxaCompra: 0.55,
    taxaVenda: 0.59,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Dirham Emirados Árabes
  {
    moeda: "AED_ESPECIE",
    moedaLabel: "Dirham Emir. Árabes",
    moedaNome: "Espécie",
    taxaCompra: 1.65,
    taxaVenda: 1.72,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Dólar Hong Kong
  {
    moeda: "HKD_ESPECIE",
    moedaLabel: "Dólar Hong Kong",
    moedaNome: "Espécie",
    taxaCompra: 0.78,
    taxaVenda: 0.82,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Franco Suíço
  {
    moeda: "CHF_ESPECIE",
    moedaLabel: "Franco Suíço",
    moedaNome: "Espécie",
    taxaCompra: 6.75,
    taxaVenda: 6.88,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional", "32300 - Investimento Exterior"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Iene Japonês
  {
    moeda: "JPY_ESPECIE",
    moedaLabel: "Iene",
    moedaNome: "Espécie",
    taxaCompra: 0.0385,
    taxaVenda: 0.0415,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional", "Importação"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Yuan Chinês
  {
    moeda: "CNY_ESPECIE",
    moedaLabel: "Yuan",
    moedaNome: "Espécie",
    taxaCompra: 0.82,
    taxaVenda: 0.88,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Novo Sol Peruano
  {
    moeda: "PEN_ESPECIE",
    moedaLabel: "Novo Sol Peruano",
    moedaNome: "Espécie",
    taxaCompra: 1.58,
    taxaVenda: 1.68,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Peso Argentino
  {
    moeda: "ARS_ESPECIE",
    moedaLabel: "Peso Argentino",
    moedaNome: "Espécie",
    taxaCompra: 0.0058,
    taxaVenda: 0.0068,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Peso Chileno
  {
    moeda: "CLP_ESPECIE",
    moedaLabel: "Peso Chileno",
    moedaNome: "Espécie",
    taxaCompra: 0.0058,
    taxaVenda: 0.0068,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Peso Colombiano
  {
    moeda: "COP_ESPECIE",
    moedaLabel: "Peso Colombiano",
    moedaNome: "Espécie",
    taxaCompra: 0.00135,
    taxaVenda: 0.00155,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Peso Mexicano
  {
    moeda: "MXN_ESPECIE",
    moedaLabel: "Peso Mexicano",
    moedaNome: "Espécie",
    taxaCompra: 0.285,
    taxaVenda: 0.315,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional", "Exportação"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Peso Uruguaio
  {
    moeda: "UYU_ESPECIE",
    moedaLabel: "Peso Uruguaio",
    moedaNome: "Espécie",
    taxaCompra: 0.135,
    taxaVenda: 0.155,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Rand Sul-Africano
  {
    moeda: "ZAR_ESPECIE",
    moedaLabel: "Rand",
    moedaNome: "Espécie",
    taxaCompra: 0.315,
    taxaVenda: 0.345,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Riyal do Qatar
  {
    moeda: "QAR_ESPECIE",
    moedaLabel: "Riyal de Qatar",
    moedaNome: "Espécie",
    taxaCompra: 1.65,
    taxaVenda: 1.75,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  },
  // Shekel Israelense
  {
    moeda: "ILS_ESPECIE",
    moedaLabel: "Shekel Israel",
    moedaNome: "Espécie",
    taxaCompra: 1.58,
    taxaVenda: 1.68,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null,
    naturezasDisponiveis: ["Viagem Internacional"],
    naturezaSelecionada: "Viagem Internacional"
  }
]

interface SimplifiedExpressFormProps {
  commonData: {
    loja: string
    canalAtendimento: string
    naturezaOperacao: string
    campanha: string
  }
}

export function SimplifiedExpressForm({ commonData }: SimplifiedExpressFormProps) {
  const { addOperation } = useOperationsCartStore()
  const adjustmentModal = useModal()
  const cardBalanceModal = useModal()
  const [currencyLines, setCurrencyLines] = useState<CurrencyLineData[]>(TODAS_MOEDAS)
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null)
  const [activeCurrencyForCard, setActiveCurrencyForCard] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const getFilteredCurrencies = () => {
    let filtered = currencyLines

    // Aplicar filtro de busca
    if (searchTerm) {
      const normalizedSearchTerm = normalizeText(searchTerm)
      filtered = filtered.filter(line =>
        normalizeText(line.moedaLabel).includes(normalizedSearchTerm) ||
        normalizeText(line.moedaNome).includes(normalizedSearchTerm)
      )
    }

    // Aplicar quick filter
    if (activeQuickFilter) {
      switch (activeQuickFilter) {
        case 'principais':
          filtered = filtered.filter(line =>
            ['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(line.moedaLabel.split(' ')[0])
          )
          break
        case 'especie':
          filtered = filtered.filter(line => line.moedaNome === 'Espécie')
          break
        case 'confidence':
          filtered = filtered.filter(line => line.moedaNome.includes('CONFIDENCE'))
          break
        case 'america':
          filtered = filtered.filter(line =>
            ['USD', 'CAD', 'Peso Mexicano', 'Peso Argentino', 'Peso Chileno', 'Peso Colombiano', 'Peso Uruguaio', 'Novo Sol Peruano'].includes(line.moedaLabel)
          )
          break
        case 'europa':
          filtered = filtered.filter(line =>
            ['EUR', 'GBP', 'Franco Suíço', 'Coroa Dinamarquesa', 'Coroa Norueguesa', 'Coroa Sueca'].includes(line.moedaLabel)
          )
          break
        case 'asia':
          filtered = filtered.filter(line =>
            ['Iene', 'Yuan', 'Dólar Hong Kong'].includes(line.moedaLabel)
          )
          break
      }
    }

    return filtered
  }

  const filteredCurrencies = getFilteredCurrencies()

  const calculateValue = (line: CurrencyLineData, quantidade: number) => {
    if (!line.operacaoSelecionada || quantidade <= 0) return 0

    const taxa = line.operacaoSelecionada === 'compra' ? line.taxaCompra : line.taxaVenda
    return quantidade * taxa + line.taxaAdmin
  }

  const calculateSpread = (line: CurrencyLineData) => {
    const spread = ((line.taxaVenda - line.taxaCompra) / line.taxaCompra) * 100
    return spread
  }

  const handleTaxaClick = (index: number, operacao: 'compra' | 'venda') => {
    const line = currencyLines[index]

    // Se for produto CONFIDENCE, abrir modal de saldo do cartão
    if (line.moedaNome.includes("CONFIDENCE MULTI MOEDA PLATINUM")) {
      setActiveCurrencyForCard(line.moedaLabel)
      cardBalanceModal.open()
      return
    }

    setCurrencyLines(prev => prev.map((line, i) => {
      if (i !== index) return line

      const novaOperacao = line.operacaoSelecionada === operacao ? null : operacao
      const novoValor = novaOperacao ? calculateValue({ ...line, operacaoSelecionada: novaOperacao }, line.quantidade) : 0

      return {
        ...line,
        operacaoSelecionada: novaOperacao,
        valor: novoValor
      }
    }))
  }

  const handleQuantityChange = (index: number, quantidade: number) => {
    setCurrencyLines(prev => prev.map((line, i) => {
      if (i !== index) return line

      const novoValor = calculateValue(line, quantidade)

      return {
        ...line,
        quantidade,
        valor: novoValor
      }
    }))
  }

  const handleTaxaAdminChange = (index: number, taxaAdmin: number) => {
    setCurrencyLines(prev => prev.map((line, i) => {
      if (i !== index) return line

      const novoValor = calculateValue({ ...line, taxaAdmin }, line.quantidade)

      return {
        ...line,
        taxaAdmin,
        valor: novoValor
      }
    }))
  }

  const handleNaturezaChange = (index: number, natureza: string) => {
    setCurrencyLines(prev => prev.map((line, i) => {
      if (i !== index) return line

      return {
        ...line,
        naturezaSelecionada: natureza
      }
    }))
  }

  const handleRecalcular = (index: number) => {
    setCurrencyLines(prev => prev.map((line, i) => {
      if (i !== index) return line

      const novoValor = calculateValue(line, line.quantidade)

      return {
        ...line,
        valor: novoValor
      }
    }))
  }

  const handleAjustar = (index: number) => {
    setActiveLineIndex(index)
    adjustmentModal.open()
  }

  const handleArredondar = (index: number) => {
    setCurrencyLines(prev => prev.map((line, i) => {
      if (i !== index) return line

      return {
        ...line,
        valor: Math.ceil(line.valor)
      }
    }))
  }

  const handleAddToCart = (index: number) => {
    const line = currencyLines[index]

    if (!line.operacaoSelecionada || line.quantidade <= 0) return

    const operationData = {
      loja: commonData.loja,
      operacao: line.operacaoSelecionada.toUpperCase() as 'COMPRA' | 'VENDA',
      moeda: line.moeda,
      taxaAdministrativa: line.taxaAdmin,
      canalAtendimento: commonData.canalAtendimento,
      corporate: false,
      retiradaHoje: false,
      quantidade: line.quantidade,
      taxa: line.operacaoSelecionada === 'compra' ? line.taxaCompra : line.taxaVenda,
      taxaEspecial: (line.operacaoSelecionada === 'compra' ? line.taxaCompra : line.taxaVenda) * 0.998,
      taxaDesejada: (line.operacaoSelecionada === 'compra' ? line.taxaCompra : line.taxaVenda) * 1.002,
      iof: 0,
      valorTotal: line.valor,
      valorLiquido: line.valor - line.taxaAdmin,
      campanha: commonData.campanha,
      naturezaOperacao: line.naturezaSelecionada
    }

    addOperation(operationData)

    // Limpar após adicionar
    setCurrencyLines(prev => prev.map((l, i) => i === index ? {
      ...l,
      quantidade: 0,
      valor: 0,
      operacaoSelecionada: null
    } : l))
  }

  const adjustValues = (adjustmentData: AdjustmentData) => {
    if (activeLineIndex === null) return
    console.log('Ajustando linha:', activeLineIndex, adjustmentData)
  }

  const handleCardBalanceConfirm = (cardNumber: string) => {
    console.log('Saldo verificado para cartão:', cardNumber, 'Moeda:', activeCurrencyForCard)
    // Aqui você pode implementar a lógica para verificar o saldo
    // Por exemplo, fazer uma chamada para API
    cardBalanceModal.close()
    setActiveCurrencyForCard("")
  }

  const handleQuickFilter = (filter: string) => {
    if (activeQuickFilter === filter) {
      setActiveQuickFilter(null) // Remove filter if already active
    } else {
      setActiveQuickFilter(filter)
      setSearchTerm("") // Clear search when using quick filter
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDecimal = (value: number, decimals: number = 5) => {
    return value.toFixed(decimals).replace(".", ",")
  }

  // Simular verificação de saldo do caixa
  const getCashBalanceStatus = (moeda: string, operacao: 'compra' | 'venda' | null, quantidade: number) => {
    // Não mostrar para produtos CONFIDENCE
    if (moeda.includes("CONFIDENCE")) return null

    if (!operacao || quantidade <= 0) return null

    // Simular diferentes status baseado na moeda e operação
    const mockBalances: Record<string, { compra: boolean, venda: boolean }> = {
      'USD_ESPECIE': { compra: true, venda: true },
      'EUR_ESPECIE': { compra: true, venda: false },
      'GBP_ESPECIE': { compra: false, venda: true },
      'CAD_ESPECIE': { compra: true, venda: true },
      'AUD_ESPECIE': { compra: false, venda: false },
      'JPY_ESPECIE': { compra: true, venda: true },
      'CHF_ESPECIE': { compra: false, venda: true }
    }

    const balance = mockBalances[moeda] || { compra: true, venda: true }
    const hasSufficientBalance = balance[operacao]

    if (hasSufficientBalance) {
      return {
        icon: CheckCircleIcon,
        color: "text-green-600",
        title: "Saldo suficiente no caixa"
      }
    } else {
      return {
        icon: XCircleIcon,
        color: "text-red-600",
        title: "Saldo insuficiente no caixa"
      }
    }
  }

  return (
    <>
      <Card className="w-full">
        <CardContent className="p-0">
          {/* Header com busca */}
          <div className="p-4 border-b bg-blue-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Câmbio Express</h3>
              <span className="text-xs text-gray-500">{filteredCurrencies.length} moedas</span>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
                <Input
                  type="text"
                  placeholder="Buscar moeda (USD, EUR, Dólar...)"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    if (e.target.value) setActiveQuickFilter(null) // Clear quick filter when typing
                  }}
                  className="pl-4 pr-10 h-9 text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <XIcon className="size-4" />
                  </button>
                )}
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => handleQuickFilter('especie')}
                  className={`px-2 py-1 text-xs rounded-md border transition-colors ${activeQuickFilter === 'especie'
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  Espécie
                </button>
                <button
                  onClick={() => handleQuickFilter('confidence')}
                  className={`px-2 py-1 text-xs rounded-md border transition-colors ${activeQuickFilter === 'confidence'
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  Cartão
                </button>
                <button
                  onClick={() => handleQuickFilter('america')}
                  className={`px-2 py-1 text-xs rounded-md border transition-colors ${activeQuickFilter === 'america'
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  América
                </button>
                <button
                  onClick={() => handleQuickFilter('europa')}
                  className={`px-2 py-1 text-xs rounded-md border transition-colors ${activeQuickFilter === 'europa'
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  Europa
                </button>
                <button
                  onClick={() => handleQuickFilter('asia')}
                  className={`px-2 py-1 text-xs rounded-md border transition-colors ${activeQuickFilter === 'asia'
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  Ásia
                </button>
              </div>
            </div>
          </div>

          {/* Lista de moedas */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCurrencies.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <SearchIcon className="size-12 text-gray-300 mx-auto mb-4" />
                <div className="text-sm">Nenhuma moeda encontrada</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="mt-3 text-xs"
                >
                  Limpar busca
                </Button>
              </div>
            ) : (
              <div className="p-2 space-y-2">
                {filteredCurrencies.map((line) => {
                  const originalIndex = currencyLines.findIndex(original => original.moeda === line.moeda)

                  return (
                    <div key={line.moeda} className="border rounded-lg p-3 bg-gray-50 hover:bg-blue-50 transition-colors">
                      {/* Header da moeda */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="text-sm font-bold">{line.moedaLabel}</div>
                            <div className="text-xs text-gray-500">{line.moedaNome}</div>
                          </div>

                          {/* Indicador de saldo do caixa */}
                          {(() => {
                            const balanceStatus = getCashBalanceStatus(line.moeda, line.operacaoSelecionada, line.quantidade)
                            if (!balanceStatus) return null

                            const IconComponent = balanceStatus.icon
                            const isAvailable = balanceStatus.color.includes('green')

                            return (
                              <div
                                className={`px-1.5 py-0.5 rounded text-xs font-medium flex items-center gap-1 ${isAvailable
                                  ? 'bg-green-50 text-green-700'
                                  : 'bg-red-50 text-red-700'
                                  }`}
                                title={balanceStatus.title}
                              >
                                <IconComponent className="size-3" />
                              </div>
                            )
                          })()}
                        </div>

                        <div className="flex gap-1 items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRecalcular(originalIndex)}
                            className="h-6 w-6 p-0"
                            title="Recalcular"
                          >
                            <RefreshCwIcon className="size-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAjustar(originalIndex)}
                            className="h-6 w-6 p-0"
                            title="Ajustar"
                          >
                            <SettingsIcon className="size-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleArredondar(originalIndex)}
                            className="h-6 w-6 p-0"
                            title="Arredondar"
                          >
                            <CircleIcon className="size-3" />
                          </Button>

                        </div>
                      </div>

                      {/* Layout em linha única compacta com labels */}
                      <div className="space-y-1">
                        {/* Labels */}
                        <div className="grid grid-cols-12 gap-1 text-xs text-gray-600">
                          <div className="col-span-3 text-center">Taxas</div>
                          {line.naturezasDisponiveis.length > 1 && (
                            <div className="col-span-2 text-center">Natureza</div>
                          )}
                          <div className={line.naturezasDisponiveis.length > 1 ? "col-span-2 text-center" : "col-span-3 text-center"}>Qtd</div>
                          <div className="col-span-1 text-center">Taxa</div>
                          <div className="col-span-2 text-center">Valor</div>
                          <div className="col-span-1 text-center">Spread</div>
                          <div className="col-span-1 text-center"></div>
                        </div>

                        {/* Campos */}
                        <div className="grid grid-cols-12 gap-1 items-center">
                          {/* Taxas - 3 colunas */}
                          <div className="col-span-3">
                            <div className="flex gap-0.5">
                              <button
                                onClick={() => handleTaxaClick(originalIndex, 'compra')}
                                className={`flex-1 p-1 text-xs rounded border transition-all ${line.operacaoSelecionada === 'compra'
                                  ? 'bg-green-100 border-green-400 text-green-800 font-semibold'
                                  : 'bg-white border-gray-200 hover:bg-green-50'
                                  }`}
                              >
                                <div className="text-xs">Compra</div>
                                <div className="font-mono text-xs">{formatDecimal(line.taxaCompra, 4)}</div>
                              </button>
                              <button
                                onClick={() => handleTaxaClick(originalIndex, 'venda')}
                                className={`flex-1 p-1 text-xs rounded border transition-all ${line.operacaoSelecionada === 'venda'
                                  ? 'bg-red-100 border-red-400 text-red-800 font-semibold'
                                  : 'bg-white border-gray-200 hover:bg-red-50'
                                  }`}
                              >
                                <div className="text-xs">Venda</div>
                                <div className="font-mono text-xs">{formatDecimal(line.taxaVenda, 4)}</div>
                              </button>
                            </div>
                          </div>

                          {/* Natureza (só se tiver múltiplas opções) - 2 colunas */}
                          {line.naturezasDisponiveis.length > 1 && (
                            <div className="col-span-2">
                              <Select
                                value={line.naturezaSelecionada}
                                onValueChange={(value) => handleNaturezaChange(originalIndex, value)}
                                disabled={!line.operacaoSelecionada}
                              >
                                <SelectTrigger className="h-6 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {line.naturezasDisponiveis.map((natureza) => (
                                    <SelectItem key={natureza} value={natureza} className="text-xs">
                                      {natureza.split(' - ')[0]}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {/* Quantidade - 2 colunas (ou 3 se não tiver natureza) */}
                          <div className={line.naturezasDisponiveis.length > 1 ? "col-span-2" : "col-span-3"}>
                            <Input
                              type="number"
                              step="0.01"
                              value={line.quantidade || ''}
                              onChange={(e) => handleQuantityChange(originalIndex, parseFloat(e.target.value) || 0)}
                              className="h-6 text-xs text-center"
                              placeholder="0"
                              disabled={!line.operacaoSelecionada}
                            />
                          </div>

                          {/* Taxa Admin - 1 coluna */}
                          <div className="col-span-1">
                            <Input
                              type="number"
                              step="0.01"
                              value={line.taxaAdmin}
                              onChange={(e) => handleTaxaAdminChange(originalIndex, parseFloat(e.target.value) || 0)}
                              className="h-6 text-xs text-center"
                              disabled={!line.operacaoSelecionada}
                            />
                          </div>

                          {/* Valor Total - 2 colunas */}
                          <div className="col-span-2">
                            <Input
                              value={formatCurrency(line.valor)}
                              readOnly
                              className={`h-6 text-xs text-center font-medium ${line.operacaoSelecionada === 'compra' ? 'bg-green-50' :
                                line.operacaoSelecionada === 'venda' ? 'bg-red-50' : 'bg-gray-50'
                                }`}
                            />
                          </div>

                          {/* Spread - 1 coluna */}
                          <div className="col-span-1">
                            <div className="h-6 bg-orange-50 border border-orange-200 rounded flex items-center justify-center">
                              <span className="text-xs font-medium text-orange-600">
                                {calculateSpread(line).toFixed(1)}%
                              </span>
                            </div>
                          </div>

                          {/* Botão Adicionar - sempre 1 coluna */}
                          <div className="col-span-1">
                            <Button
                              onClick={() => handleAddToCart(originalIndex)}
                              disabled={!line.operacaoSelecionada || line.quantidade <= 0}
                              className={`h-6 w-full text-xs ${line.operacaoSelecionada === 'compra' ? 'bg-green-600 hover:bg-green-700' :
                                line.operacaoSelecionada === 'venda' ? 'bg-red-600 hover:bg-red-700' :
                                  'bg-gray-400'
                                }`}
                              size="sm"
                            >
                              <PlusIcon className="size-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AdjustmentModal
        isOpen={adjustmentModal.isOpen}
        onClose={adjustmentModal.close}
        onConfirm={adjustValues}
        initialValue={activeLineIndex !== null ? currencyLines[activeLineIndex].valor : 0}
      />

      <CardBalanceModal
        isOpen={cardBalanceModal.isOpen}
        onClose={cardBalanceModal.close}
        onConfirm={handleCardBalanceConfirm}
        currencyLabel={activeCurrencyForCard}
      />
    </>
  )
}