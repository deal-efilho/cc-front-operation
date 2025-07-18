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
  bandeira: string
  taxaCompra: number
  taxaVenda: number
  quantidadeCompra: number
  quantidadeVenda: number
  taxaAdminCompra: number
  taxaAdminVenda: number
  valorCompra: number
  valorVenda: number
  spreadCompra: number
  spreadVenda: number
}

const TODAS_MOEDAS: CurrencyLineData[] = [
  {
    moeda: "USD_ESPECIE",
    moedaLabel: "USD",
    moedaNome: "Dólar Americano",
    bandeira: "🇺🇸",
    taxaCompra: 5.08375,
    taxaVenda: 5.18420,
    quantidadeCompra: 0,
    quantidadeVenda: 0,
    taxaAdminCompra: 12.90,
    taxaAdminVenda: 12.90,
    valorCompra: 0,
    valorVenda: 0,
    spreadCompra: 6.00,
    spreadVenda: 6.00
  },
  {
    moeda: "EUR_ESPECIE",
    moedaLabel: "EUR",
    moedaNome: "Euro",
    bandeira: "🇪🇺",
    taxaCompra: 5.45123,
    taxaVenda: 5.55890,
    quantidadeCompra: 0,
    quantidadeVenda: 0,
    taxaAdminCompra: 12.90,
    taxaAdminVenda: 12.90,
    valorCompra: 0,
    valorVenda: 0,
    spreadCompra: 6.00,
    spreadVenda: 6.00
  },
  {
    moeda: "GBP_ESPECIE",
    moedaLabel: "GBP",
    moedaNome: "Libra Esterlina",
    bandeira: "🇬🇧",
    taxaCompra: 6.12456,
    taxaVenda: 6.24789,
    quantidadeCompra: 0,
    quantidadeVenda: 0,
    taxaAdminCompra: 12.90,
    taxaAdminVenda: 12.90,
    valorCompra: 0,
    valorVenda: 0,
    spreadCompra: 6.00,
    spreadVenda: 6.00
  },
  {
    moeda: "CAD_ESPECIE",
    moedaLabel: "CAD",
    moedaNome: "Dólar Canadense",
    bandeira: "🇨🇦",
    taxaCompra: 3.75234,
    taxaVenda: 3.82156,
    quantidadeCompra: 0,
    quantidadeVenda: 0,
    taxaAdminCompra: 12.90,
    taxaAdminVenda: 12.90,
    valorCompra: 0,
    valorVenda: 0,
    spreadCompra: 6.00,
    spreadVenda: 6.00
  },
  {
    moeda: "AUD_ESPECIE",
    moedaLabel: "AUD",
    moedaNome: "Dólar Australiano",
    bandeira: "🇦🇺",
    taxaCompra: 3.32145,
    taxaVenda: 3.38967,
    quantidadeCompra: 0,
    quantidadeVenda: 0,
    taxaAdminCompra: 12.90,
    taxaAdminVenda: 12.90,
    valorCompra: 0,
    valorVenda: 0,
    spreadCompra: 6.00,
    spreadVenda: 6.00
  },
  {
    moeda: "JPY_ESPECIE",
    moedaLabel: "JPY",
    moedaNome: "Iene Japonês",
    bandeira: "🇯🇵",
    taxaCompra: 0.03234,
    taxaVenda: 0.03389,
    quantidadeCompra: 0,
    quantidadeVenda: 0,
    taxaAdminCompra: 12.90,
    taxaAdminVenda: 12.90,
    valorCompra: 0,
    valorVenda: 0,
    spreadCompra: 6.00,
    spreadVenda: 6.00
  },
  {
    moeda: "CHF_ESPECIE",
    moedaLabel: "CHF",
    moedaNome: "Franco Suíço",
    bandeira: "🇨🇭",
    taxaCompra: 5.67234,
    taxaVenda: 5.78456,
    quantidadeCompra: 0,
    quantidadeVenda: 0,
    taxaAdminCompra: 12.90,
    taxaAdminVenda: 12.90,
    valorCompra: 0,
    valorVenda: 0,
    spreadCompra: 6.00,
    spreadVenda: 6.00
  },
  {
    moeda: "ARS_ESPECIE",
    moedaLabel: "ARS",
    moedaNome: "Peso Argentino",
    bandeira: "🇦🇷",
    taxaCompra: 0.00523,
    taxaVenda: 0.00567,
    quantidadeCompra: 0,
    quantidadeVenda: 0,
    taxaAdminCompra: 12.90,
    taxaAdminVenda: 12.90,
    valorCompra: 0,
    valorVenda: 0,
    spreadCompra: 6.00,
    spreadVenda: 6.00
  },
  {
    moeda: "UYU_ESPECIE",
    moedaLabel: "UYU",
    moedaNome: "Peso Uruguaio",
    bandeira: "🇺🇾",
    taxaCompra: 0.11234,
    taxaVenda: 0.11789,
    quantidadeCompra: 0,
    quantidadeVenda: 0,
    taxaAdminCompra: 12.90,
    taxaAdminVenda: 12.90,
    valorCompra: 0,
    valorVenda: 0,
    spreadCompra: 6.00,
    spreadVenda: 6.00
  },
  {
    moeda: "CLP_ESPECIE",
    moedaLabel: "CLP",
    moedaNome: "Peso Chileno",
    bandeira: "🇨🇱",
    taxaCompra: 0.00523,
    taxaVenda: 0.00567,
    quantidadeCompra: 0,
    quantidadeVenda: 0,
    taxaAdminCompra: 12.90,
    taxaAdminVenda: 12.90,
    valorCompra: 0,
    valorVenda: 0,
    spreadCompra: 6.00,
    spreadVenda: 6.00
  },
  {
    moeda: "MXN_ESPECIE",
    moedaLabel: "MXN",
    moedaNome: "Peso Mexicano",
    bandeira: "🇲🇽",
    taxaCompra: 0.28456,
    taxaVenda: 0.29123,
    quantidadeCompra: 0,
    quantidadeVenda: 0,
    taxaAdminCompra: 12.90,
    taxaAdminVenda: 12.90,
    valorCompra: 0,
    valorVenda: 0,
    spreadCompra: 6.00,
    spreadVenda: 6.00
  },
  {
    moeda: "PYG_ESPECIE",
    moedaLabel: "PYG",
    moedaNome: "Guarani Paraguaio",
    bandeira: "🇵🇾",
    taxaCompra: 0.00067,
    taxaVenda: 0.00072,
    quantidadeCompra: 0,
    quantidadeVenda: 0,
    taxaAdminCompra: 12.90,
    taxaAdminVenda: 12.90,
    valorCompra: 0,
    valorVenda: 0,
    spreadCompra: 6.00,
    spreadVenda: 6.00
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

  // Filtrar moedas baseado no termo de busca
  const filteredCurrencies = currencyLines.filter(line =>
    line.moedaLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    line.moedaNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    line.moeda.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const calculateValues = (lineData: CurrencyLineData, tipo: 'compra' | 'venda', quantidade: number) => {
    const taxa = tipo === 'compra' ? lineData.taxaCompra : lineData.taxaVenda
    const taxaAdmin = tipo === 'compra' ? lineData.taxaAdminCompra : lineData.taxaAdminVenda
    const valor = quantidade * taxa + taxaAdmin
    const spread = tipo === 'compra' ? lineData.spreadCompra : lineData.spreadVenda

    return {
      valor: Number(valor.toFixed(2)),
      spread: spread
    }
  }

  const handleQuantityChange = (index: number, tipo: 'compra' | 'venda', quantidade: number) => {
    setCurrencyLines(prev => prev.map((line, i) => {
      if (i !== index) return line

      const calculated = calculateValues(line, tipo, quantidade)

      if (tipo === 'compra') {
        return {
          ...line,
          quantidadeCompra: quantidade,
          valorCompra: calculated.valor
        }
      } else {
        return {
          ...line,
          quantidadeVenda: quantidade,
          valorVenda: calculated.valor
        }
      }
    }))
  }

  const handleTaxaAdminChange = (index: number, tipo: 'compra' | 'venda', taxaAdmin: number) => {
    setCurrencyLines(prev => prev.map((line, i) => {
      if (i !== index) return line

      if (tipo === 'compra') {
        const calculated = calculateValues({ ...line, taxaAdminCompra: taxaAdmin }, tipo, line.quantidadeCompra)
        return {
          ...line,
          taxaAdminCompra: taxaAdmin,
          valorCompra: calculated.valor
        }
      } else {
        const calculated = calculateValues({ ...line, taxaAdminVenda: taxaAdmin }, tipo, line.quantidadeVenda)
        return {
          ...line,
          taxaAdminVenda: taxaAdmin,
          valorVenda: calculated.valor
        }
      }
    }))
  }

  const handleRecalcular = (index: number) => {
    setCurrencyLines(prev => prev.map((line, i) => {
      if (i !== index) return line

      const calculatedCompra = calculateValues(line, 'compra', line.quantidadeCompra)
      const calculatedVenda = calculateValues(line, 'venda', line.quantidadeVenda)

      return {
        ...line,
        valorCompra: calculatedCompra.valor,
        valorVenda: calculatedVenda.valor
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

      const valorCompraRounded = Math.ceil(line.valorCompra)
      const valorVendaRounded = Math.ceil(line.valorVenda)

      return {
        ...line,
        valorCompra: valorCompraRounded,
        valorVenda: valorVendaRounded
      }
    }))
  }

  const handleAddToCart = (index: number, tipo: 'compra' | 'venda') => {
    const line = currencyLines[index]
    const quantidade = tipo === 'compra' ? line.quantidadeCompra : line.quantidadeVenda
    const valor = tipo === 'compra' ? line.valorCompra : line.valorVenda

    if (quantidade <= 0) return

    const operationData = {
      loja: commonData.loja,
      operacao: tipo.toUpperCase() as 'COMPRA' | 'VENDA',
      moeda: line.moeda,
      taxaAdministrativa: tipo === 'compra' ? line.taxaAdminCompra : line.taxaAdminVenda,
      canalAtendimento: commonData.canalAtendimento,
      corporate: false,
      retiradaHoje: false,
      quantidade: quantidade,
      taxa: tipo === 'compra' ? line.taxaCompra : line.taxaVenda,
      taxaEspecial: (tipo === 'compra' ? line.taxaCompra : line.taxaVenda) * 0.998,
      taxaDesejada: (tipo === 'compra' ? line.taxaCompra : line.taxaVenda) * 1.002,
      iof: 0,
      valorTotal: valor,
      valorLiquido: valor - (tipo === 'compra' ? line.taxaAdminCompra : line.taxaAdminVenda),
      campanha: "",
      naturezaOperacao: commonData.naturezaOperacao
    }

    addOperation(operationData)

    // Limpar quantidade após adicionar
    handleQuantityChange(index, tipo, 0)
  }

  const adjustValues = (adjustmentData: AdjustmentData) => {
    if (activeLineIndex === null) return
    console.log('Ajustando linha:', activeLineIndex, adjustmentData)
  }

  const clearSearch = () => {
    setSearchTerm("")
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
          {/* Header fixo com título e busca */}
          <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <h3 className="text-sm font-semibold text-gray-800">Câmbio Express</h3>
                <span className="text-xs text-gray-500">• Operações Rápidas</span>
              </div>
              <div className="text-xs text-gray-500">
                {filteredCurrencies.length} de {currencyLines.length} moedas
              </div>
            </div>

            {/* Campo de busca elegante */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
              <Input
                type="text"
                placeholder="Buscar por código, nome ou país (USD, Dólar, Estados Unidos...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 h-9 text-sm border-gray-200 focus:border-blue-400 focus:ring-blue-400 bg-white/80 backdrop-blur-sm"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XIcon className="size-4" />
                </button>
              )}
            </div>
          </div>

          {/* Container com scroll para as moedas */}
          <div className="max-h-96 overflow-y-auto">
            {/* Verificar se há resultados */}
            {filteredCurrencies.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <SearchIcon className="size-12 text-gray-300 mx-auto mb-4" />
                <div className="text-sm">Nenhuma moeda encontrada</div>
                <div className="text-xs text-gray-400 mt-1">
                  Tente buscar por: {searchTerm ? `"${searchTerm.slice(0, 20)}"` : 'USD, EUR, Dólar...'}
                </div>
                {searchTerm && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearSearch}
                    className="mt-3 text-xs"
                  >
                    Limpar busca
                  </Button>
                )}
              </div>
            ) : (
              /* Linhas de Moedas Filtradas */
              <div className="p-3 space-y-3">
                {filteredCurrencies.map((line, filteredIndex) => {
                  // Encontrar o índice original para as operações
                  const originalIndex = currencyLines.findIndex(original => original.moeda === line.moeda)

                  return (
                    <div key={line.moeda} className="border rounded-xl p-4 space-y-3 bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 shadow-sm hover:shadow-md">
                      {/* Linha 1 - Header da Moeda com bandeira */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{line.bandeira}</span>
                          <div>
                            <div className="text-sm font-bold text-gray-800">{line.moedaLabel}</div>
                            <div className="text-xs text-gray-500">{line.moedaNome}</div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRecalcular(originalIndex)}
                            className="h-7 w-7 p-0 hover:bg-blue-50 hover:border-blue-300"
                            title="Recalcular"
                          >
                            <RefreshCwIcon className="size-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAjustar(originalIndex)}
                            className="h-7 w-7 p-0 hover:bg-orange-50 hover:border-orange-300"
                            title="Ajustar"
                          >
                            <SettingsIcon className="size-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleArredondar(originalIndex)}
                            className="h-7 w-7 p-0 hover:bg-purple-50 hover:border-purple-300"
                            title="Arredondar"
                          >
                            <CircleIcon className="size-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Linha 2 - Compra com visual melhorado */}
                      <div className="grid grid-cols-12 gap-2 items-end p-2 bg-green-50/50 rounded-lg border border-green-100">
                        <div className="col-span-1 text-xs font-semibold text-green-700 pb-1 flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Compra
                        </div>
                        <div className="col-span-2">
                          <Label className="text-xs text-gray-600 font-medium">Taxa</Label>
                          <Input
                            value={formatDecimal(line.taxaCompra)}
                            readOnly
                            className="h-8 text-xs bg-white text-center font-mono border-green-200"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label className="text-xs text-gray-600 font-medium">Quantidade</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={line.quantidadeCompra || ''}
                            onChange={(e) => handleQuantityChange(originalIndex, 'compra', parseFloat(e.target.value) || 0)}
                            className="h-8 text-xs text-center border-green-200 focus:border-green-400"
                            placeholder="0,00"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label className="text-xs text-gray-600 font-medium">Taxa Admin</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={line.taxaAdminCompra}
                            onChange={(e) => handleTaxaAdminChange(originalIndex, 'compra', parseFloat(e.target.value) || 0)}
                            className="h-8 text-xs text-center border-green-200 focus:border-green-400"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label className="text-xs text-gray-600 font-medium">Valor</Label>
                          <Input
                            value={formatCurrency(line.valorCompra)}
                            readOnly
                            className="h-8 text-xs bg-green-100 text-center font-semibold"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label className="text-xs text-gray-600 font-medium">Spread %</Label>
                          <Input
                            value={`${line.spreadCompra.toFixed(2)}%`}
                            readOnly
                            className="h-8 text-xs bg-green-100 text-center font-bold text-green-700"
                          />
                        </div>
                        <div className="col-span-1 pb-1">
                          <Button
                            onClick={() => handleAddToCart(originalIndex, 'compra')}
                            disabled={line.quantidadeCompra <= 0}
                            className="h-8 w-full p-0 bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
                            size="sm"
                          >
                            <PlusIcon className="size-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Linha 3 - Venda com visual melhorado */}
                      <div className="grid grid-cols-12 gap-2 items-end p-2 bg-red-50/50 rounded-lg border border-red-100">
                        <div className="col-span-1 text-xs font-semibold text-red-700 pb-1 flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Venda
                        </div>
                        <div className="col-span-2">
                          <Input
                            value={formatDecimal(line.taxaVenda)}
                            readOnly
                            className="h-8 text-xs bg-white text-center font-mono border-red-200"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            step="0.01"
                            value={line.quantidadeVenda || ''}
                            onChange={(e) => handleQuantityChange(originalIndex, 'venda', parseFloat(e.target.value) || 0)}
                            className="h-8 text-xs text-center border-red-200 focus:border-red-400"
                            placeholder="0,00"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            step="0.01"
                            value={line.taxaAdminVenda}
                            onChange={(e) => handleTaxaAdminChange(originalIndex, 'venda', parseFloat(e.target.value) || 0)}
                            className="h-8 text-xs text-center border-red-200 focus:border-red-400"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            value={formatCurrency(line.valorVenda)}
                            readOnly
                            className="h-8 text-xs bg-red-100 text-center font-semibold"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            value={`${line.spreadVenda.toFixed(2)}%`}
                            readOnly
                            className="h-8 text-xs bg-red-100 text-center font-bold text-red-700"
                          />
                        </div>
                        <div className="col-span-1 pb-1">
                          <Button
                            onClick={() => handleAddToCart(originalIndex, 'venda')}
                            disabled={line.quantidadeVenda <= 0}
                            className="h-8 w-full p-0 bg-red-600 hover:bg-red-700 disabled:bg-gray-300"
                            size="sm"
                          >
                            <PlusIcon className="size-3" />
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
        initialValue={activeLineIndex !== null ? currencyLines[activeLineIndex].valorCompra : 0}
      />
    </>
  )
}