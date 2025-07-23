// features/exchange/express/simplified-express-form/simplified-express-form.tsx
"use client"

import { useState } from "react"
import { Button, Input, Label, Card, CardContent } from "@mfe/cc-front-shared"
import { PlusIcon, RefreshCwIcon, SettingsIcon, CircleIcon, SearchIcon, XIcon } from "lucide-react"
import { useOperationsCartStore } from "../../hooks/use-operation-cart"
import { useModal } from "@/hooks/use-modal"
import { AdjustmentModal, type AdjustmentData } from "../../components/adjustment-modal/adjustment-modal"

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
}

const TODAS_MOEDAS: CurrencyLineData[] = [
  {
    moeda: "USD_ESPECIE",
    moedaLabel: "USD",
    moedaNome: "Espécie",
    taxaCompra: 5.08375,
    taxaVenda: 5.18420,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null
  },
  {
    moeda: "EUR_ESPECIE",
    moedaLabel: "EUR",
    moedaNome: "Espécie",
    taxaCompra: 5.45123,
    taxaVenda: 5.55890,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null
  },
  {
    moeda: "GBP_ESPECIE",
    moedaLabel: "GBP",
    moedaNome: "Espécie",
    taxaCompra: 6.12456,
    taxaVenda: 6.24789,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null
  },
  {
    moeda: "CAD_ESPECIE",
    moedaLabel: "CAD",
    moedaNome: "Espécie",
    taxaCompra: 3.75234,
    taxaVenda: 3.82156,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null
  },
  {
    moeda: "AUD_ESPECIE",
    moedaLabel: "AUD",
    moedaNome: "Espécie",
    taxaCompra: 3.32145,
    taxaVenda: 3.38967,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null
  },
  {
    moeda: "JPY_ESPECIE",
    moedaLabel: "JPY",
    moedaNome: "Espécie",
    taxaCompra: 0.03234,
    taxaVenda: 0.03389,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null
  },
  {
    moeda: "CHF_ESPECIE",
    moedaLabel: "CHF",
    moedaNome: "Espécie",
    taxaCompra: 5.67234,
    taxaVenda: 5.78456,
    quantidade: 0,
    taxaAdmin: 12.90,
    valor: 0,
    operacaoSelecionada: null
  }
]

interface SimplifiedExpressFormProps {
  commonData: {
    loja: string
    canalAtendimento: string
    naturezaOperacao: string
  }
}

export function SimplifiedExpressForm({ commonData }: SimplifiedExpressFormProps) {
  const { addOperation } = useOperationsCartStore()
  const adjustmentModal = useModal()
  const [currencyLines, setCurrencyLines] = useState<CurrencyLineData[]>(TODAS_MOEDAS)
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCurrencies = currencyLines.filter(line =>
    line.moedaLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    line.moedaNome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const calculateValue = (line: CurrencyLineData, quantidade: number) => {
    if (!line.operacaoSelecionada || quantidade <= 0) return 0

    const taxa = line.operacaoSelecionada === 'compra' ? line.taxaCompra : line.taxaVenda
    return quantidade * taxa + line.taxaAdmin
  }

  const handleTaxaClick = (index: number, operacao: 'compra' | 'venda') => {
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
      campanha: "",
      naturezaOperacao: commonData.naturezaOperacao
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDecimal = (value: number, decimals: number = 5) => {
    return value.toFixed(decimals).replace(".", ",")
  }

  return (
    <>
      <Card className="w-full">
        <CardContent className="p-0">
          {/* Header com busca */}
          <div className="p-4 border-b bg-blue-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Câmbio Express - Operação Única</h3>
              <span className="text-xs text-gray-500">{filteredCurrencies.length} moedas</span>
            </div>

            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
              <Input
                type="text"
                placeholder="Buscar moeda (USD, EUR, Dólar...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 h-9 text-sm"
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
              <div className="p-3 space-y-3">
                {filteredCurrencies.map((line, filteredIndex) => {
                  const originalIndex = currencyLines.findIndex(original => original.moeda === line.moeda)

                  return (
                    <div key={line.moeda} className="border rounded-lg p-4 bg-gray-50 hover:bg-blue-50 transition-colors">
                      {/* Header da moeda */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="text-sm font-bold">{line.moedaLabel}</div>
                            <div className="text-xs text-gray-500">{line.moedaNome}</div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRecalcular(originalIndex)}
                            className="h-7 w-7 p-0"
                            title="Recalcular"
                          >
                            <RefreshCwIcon className="size-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAjustar(originalIndex)}
                            className="h-7 w-7 p-0"
                            title="Ajustar"
                          >
                            <SettingsIcon className="size-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleArredondar(originalIndex)}
                            className="h-7 w-7 p-0"
                            title="Arredondar"
                          >
                            <CircleIcon className="size-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Linha única com taxas clicáveis */}
                      <div className="grid grid-cols-12 gap-2 items-end">
                        {/* Taxas clicáveis - 4 colunas */}
                        <div className="col-span-4 space-y-1">
                          <Label className="text-xs text-gray-600">Taxas (clique para selecionar)</Label>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleTaxaClick(originalIndex, 'compra')}
                              className={`flex-1 p-2 text-xs rounded border transition-all ${line.operacaoSelecionada === 'compra'
                                ? 'bg-green-100 border-green-400 text-green-800 font-semibold'
                                : 'bg-white border-gray-200 hover:bg-green-50'
                                }`}
                            >
                              <div className="text-xs font-medium">Compra</div>
                              <div className="font-mono">{formatDecimal(line.taxaCompra)}</div>
                            </button>
                            <button
                              onClick={() => handleTaxaClick(originalIndex, 'venda')}
                              className={`flex-1 p-2 text-xs rounded border transition-all ${line.operacaoSelecionada === 'venda'
                                ? 'bg-red-100 border-red-400 text-red-800 font-semibold'
                                : 'bg-white border-gray-200 hover:bg-red-50'
                                }`}
                            >
                              <div className="text-xs font-medium">Venda</div>
                              <div className="font-mono">{formatDecimal(line.taxaVenda)}</div>
                            </button>
                          </div>
                        </div>

                        {/* Quantidade - 2 colunas */}
                        <div className="col-span-2">
                          <Label className="text-xs text-gray-600">Quantidade</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={line.quantidade || ''}
                            onChange={(e) => handleQuantityChange(originalIndex, parseFloat(e.target.value) || 0)}
                            className="h-8 text-xs text-center"
                            placeholder="0,00"
                            disabled={!line.operacaoSelecionada}
                          />
                        </div>

                        {/* Taxa Admin - 2 colunas */}
                        <div className="col-span-2">
                          <Label className="text-xs text-gray-600">Taxa Admin</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={line.taxaAdmin}
                            onChange={(e) => handleTaxaAdminChange(originalIndex, parseFloat(e.target.value) || 0)}
                            className="h-8 text-xs text-center"
                            disabled={!line.operacaoSelecionada}
                          />
                        </div>

                        {/* Valor Total - 2 colunas */}
                        <div className="col-span-2">
                          <Label className="text-xs text-gray-600">Valor Total</Label>
                          <Input
                            value={formatCurrency(line.valor)}
                            readOnly
                            className={`h-8 text-xs text-center font-semibold ${line.operacaoSelecionada === 'compra' ? 'bg-green-100' :
                              line.operacaoSelecionada === 'venda' ? 'bg-red-100' : 'bg-gray-100'
                              }`}
                          />
                        </div>

                        {/* Botão Adicionar - 2 colunas */}
                        <div className="col-span-2">
                          <Button
                            onClick={() => handleAddToCart(originalIndex)}
                            disabled={!line.operacaoSelecionada || line.quantidade <= 0}
                            className={`h-8 w-full text-xs ${line.operacaoSelecionada === 'compra' ? 'bg-green-600 hover:bg-green-700' :
                              line.operacaoSelecionada === 'venda' ? 'bg-red-600 hover:bg-red-700' :
                                'bg-gray-400'
                              }`}
                            size="sm"
                          >
                            <PlusIcon className="size-3 mr-1" />
                            {line.operacaoSelecionada ? line.operacaoSelecionada.charAt(0).toUpperCase() + line.operacaoSelecionada.slice(1) : 'Adicionar'}
                          </Button>
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
    </>
  )
}