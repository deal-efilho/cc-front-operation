"use client"

import { useState } from "react"
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Card, CardContent } from "@mfe/cc-front-shared"
import { SearchIcon, PlusIcon } from "lucide-react"
import { useDocumentStore, applyCPFMask, applyCNPJMask } from "@/features/exchange/hooks/use-document-search"
import { useOperationsCartStore } from "@/features/exchange/hooks/use-operation-cart"
import { useUserDetailsStore } from "@/features/exchange/hooks/use-user-details"
import { ExpressClientInfo } from "../express-client-info/express-client-info"

const LOJAS = [
  { value: "CPS_SH_DOM_PEDRO", label: "CPS SH DOM PEDRO" },
  { value: "CPS_JUDIAI_SH", label: "CPS JUDIAI SH" }
]

const MOEDAS = [
  { value: "USD_ESPECIE", label: "USD" },
  { value: "EUR_ESPECIE", label: "EUR" },
  { value: "GBP_ESPECIE", label: "GBP" },
  { value: "CAD_ESPECIE", label: "CAD" }
]

const CANAIS_ATENDIMENTO = [
  { value: "PRESENCIAL", label: "Presencial" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "TELEFONE", label: "Telefone" },
  { value: "APP", label: "App" }
]

interface ExpressFormData {
  loja: string
  canalAtendimento: string
  naturezaOperacao: string
  operacao: 'COMPRA' | 'VENDA'
  moeda: string
  valorBRL: number
  quantidade: number
  taxa: number
  iof: number
  valorTotal: number
}

export function ExpressForm() {
  const { selectedType, documentValue, setSelectedType, setDocumentValue } = useDocumentStore()
  const { userDetails, isVisible: clientVisible, showUserDetails } = useUserDetailsStore()
  const { addOperation } = useOperationsCartStore()

  const [formData, setFormData] = useState<ExpressFormData>({
    loja: "CPS_SH_DOM_PEDRO",
    canalAtendimento: "",
    naturezaOperacao: "32999 - Viagem Internacional",
    operacao: 'COMPRA',
    moeda: "USD_ESPECIE",
    valorBRL: 0,
    quantidade: 0,
    taxa: 5.08375,
    iof: 0,
    valorTotal: 0
  })

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let maskedValue = value

    if (selectedType === "CPF") {
      maskedValue = applyCPFMask(value)
    } else if (selectedType === "CNPJ") {
      maskedValue = applyCNPJMask(value)
    }

    setDocumentValue(maskedValue)
  }

  const handleSearch = () => {
    if (documentValue.trim()) {
      showUserDetails()
    }
  }

  const handleOperationToggle = (operation: 'COMPRA' | 'VENDA') => {
    setFormData(prev => ({ ...prev, operacao: operation }))
  }

  const handleValueChange = (value: number) => {
    // Calcular automaticamente quantidade, IOF e valor total
    const taxa = 5.08375 // Simulado
    const quantidade = value / taxa
    const iof = quantidade * taxa * 0.0038
    const valorTotal = value + iof + 12.90 // 12.90 é taxa administrativa

    setFormData(prev => ({
      ...prev,
      valorBRL: value,
      quantidade,
      iof,
      valorTotal
    }))
  }

  const handleAddToCart = () => {
    if (!isFormValid()) return

    // Converter para o formato do carrinho
    const operationData = {
      loja: formData.loja,
      operacao: formData.operacao,
      moeda: formData.moeda,
      taxaAdministrativa: 12.90,
      canalAtendimento: formData.canalAtendimento,
      corporate: false,
      retiradaHoje: false,
      quantidade: formData.quantidade,
      taxa: formData.taxa,
      taxaEspecial: formData.taxa * 0.998,
      taxaDesejada: formData.taxa * 1.002,
      iof: formData.iof,
      valorTotal: formData.valorTotal,
      valorLiquido: formData.valorBRL,
      campanha: "",
      naturezaOperacao: formData.naturezaOperacao
    }

    addOperation(operationData)

    // Limpar campos para próxima operação
    setFormData(prev => ({
      ...prev,
      valorBRL: 0,
      quantidade: 0,
      iof: 0,
      valorTotal: 0
    }))
  }

  const isFormValid = () => {
    return !!(
      documentValue.trim() &&
      clientVisible &&
      formData.loja &&
      formData.canalAtendimento &&
      formData.moeda &&
      formData.valorBRL > 0
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        {/* Configurações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-3 border-b">
          <div className="space-y-1">
            <Label htmlFor="loja" className="text-xs text-gray-600">Loja</Label>
            <Select value={formData.loja} onValueChange={(value) => setFormData(prev => ({ ...prev, loja: value }))}>
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOJAS.map((loja) => (
                  <SelectItem key={loja.value} value={loja.value}>
                    {loja.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="canal" className="text-xs text-gray-600">Canal *</Label>
            <Select value={formData.canalAtendimento} onValueChange={(value) => setFormData(prev => ({ ...prev, canalAtendimento: value }))}>
              <SelectTrigger className="h-8 text-sm">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {CANAIS_ATENDIMENTO.map((canal) => (
                  <SelectItem key={canal.value} value={canal.value}>
                    {canal.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="natureza" className="text-xs text-gray-600">Natureza</Label>
            <Select value={formData.naturezaOperacao} onValueChange={(value) => setFormData(prev => ({ ...prev, naturezaOperacao: value }))}>
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="32999 - Viagem Internacional">32999 - Viagem Internacional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Formulário Principal */}
        <div className="grid grid-cols-12 gap-2 items-end">
          {/* CPF/Documento */}
          <div className="col-span-2 space-y-1">
            <Label className="text-xs text-gray-600">CPF/Doc *</Label>
            <Input
              type="text"
              value={documentValue}
              onChange={handleDocumentChange}
              placeholder="000.000.000-00"
              className="h-9 text-sm"
            />
          </div>

          {/* Botão Pesquisar */}
          <div className="col-span-1">
            <Button
              onClick={handleSearch}
              disabled={!documentValue.trim()}
              className="h-9 w-full p-0"
              size="sm"
            >
              <SearchIcon className="size-4" />
            </Button>
          </div>

          {/* Toggle Compra/Venda */}
          <div className="col-span-2 space-y-1">
            <Label className="text-xs text-gray-600">Operação *</Label>
            <div className="flex bg-gray-100 rounded-md p-1 h-9">
              <button
                type="button"
                onClick={() => handleOperationToggle('COMPRA')}
                className={`flex-1 text-xs rounded px-2 py-1 transition-colors ${formData.operacao === 'COMPRA'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
                  }`}
              >
                Compra
              </button>
              <button
                type="button"
                onClick={() => handleOperationToggle('VENDA')}
                className={`flex-1 text-xs rounded px-2 py-1 transition-colors ${formData.operacao === 'VENDA'
                  ? 'bg-red-500 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
                  }`}
              >
                Venda
              </button>
            </div>
          </div>

          {/* Moeda */}
          <div className="col-span-1 space-y-1">
            <Label className="text-xs text-gray-600">Moeda *</Label>
            <Select value={formData.moeda} onValueChange={(value) => setFormData(prev => ({ ...prev, moeda: value }))}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MOEDAS.map((moeda) => (
                  <SelectItem key={moeda.value} value={moeda.value}>
                    {moeda.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Valor BRL */}
          <div className="col-span-2 space-y-1">
            <Label className="text-xs text-gray-600">Valor R$ *</Label>
            <Input
              type="number"
              step="0.01"
              value={formData.valorBRL || ''}
              onChange={(e) => handleValueChange(parseFloat(e.target.value) || 0)}
              placeholder="0,00"
              className="h-9 text-sm"
            />
          </div>

          {/* Resultado */}
          <div className="col-span-3 space-y-1">
            <Label className="text-xs text-gray-600">Resultado</Label>
            <div className="h-9 flex items-center text-sm bg-gray-50 rounded-md px-3">
              {formData.valorBRL > 0 ? (
                <span>
                  {formatUSD(formData.quantidade)} = {formatCurrency(formData.valorTotal)}
                </span>
              ) : (
                <span className="text-gray-400">-</span>
              )}
            </div>
          </div>

          {/* Botão Adicionar */}
          <div className="col-span-1">
            <Button
              onClick={handleAddToCart}
              disabled={!isFormValid()}
              className="h-9 w-full p-0"
              size="sm"
            >
              <PlusIcon className="size-4" />
            </Button>
          </div>
        </div>

        {/* Informações do Cliente */}
        {clientVisible && (
          <ExpressClientInfo
            nome={userDetails.nome}
            classificacao={userDetails.classificacao}
            valorDisponivelCompra={userDetails.valorDisponivelCompra}
            valorDisponivelVenda={userDetails.valorDisponivelVenda}
          />
        )}

        {/* Detalhes do Cálculo */}
        {formData.valorBRL > 0 && (
          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            Taxa: R$ {formData.taxa.toFixed(5)} | IOF: {formatCurrency(formData.iof)} | Taxa Admin: R$ 12,90
          </div>
        )}
      </CardContent>
    </Card>
  )
}