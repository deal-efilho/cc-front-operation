"use client"

import { useEffect } from "react"
import { Button, Input, Label, RadioGroup, RadioGroupItem, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Checkbox, Card, CardContent } from "@mfe/cc-front-shared"
import { RefreshCwIcon, SettingsIcon, PlusIcon, CircleIcon } from "lucide-react"
import { CurrencyInput } from "@/components/ui/currency-input"
import { useModal } from "@/hooks/use-modal"
import { AdjustmentModal, type AdjustmentData } from "../adjustment-modal/adjustment-modal"
import { useOperationsCartStore } from "../../hooks/use-operation-cart"
import React from "react"

const MOEDAS = [
  { value: "USD_ESPECIE", label: "Dólar Espécie" },
  { value: "EUR_ESPECIE", label: "Euro Espécie" }
]

interface SimplifiedFormData {
  operacao: 'COMPRA' | 'VENDA'
  moeda: string
  taxaAdministrativa: number
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
}

interface SimplifiedNormalFormProps {
  commonData: {
    loja: string
    canalAtendimento: string
    naturezaOperacao: string
  }
}

export function SimplifiedNormalForm({ commonData }: SimplifiedNormalFormProps) {
  const { addOperation } = useOperationsCartStore()
  const adjustmentModal = useModal()

  const [formData, setFormData] = React.useState<SimplifiedFormData>({
    operacao: 'COMPRA',
    moeda: '',
    taxaAdministrativa: 12.90,
    corporate: false,
    retiradaHoje: false,
    quantidade: 1.00,
    taxa: 5.08375,
    taxaEspecial: 5.08375,
    taxaDesejada: 5.08375,
    iof: 0.02,
    valorTotal: 0,
    valorLiquido: 0,
    campanha: ''
  })

  const calculateValues = () => {
    const { quantidade, taxaAdministrativa } = formData
    const taxaBase = 5.08375
    const taxa = taxaBase * (1 + (quantidade - 1) * 0.001)
    const taxaEspecial = taxa * 0.998
    const taxaDesejada = taxa * 1.002
    const iof = quantidade * taxa * 0.0038
    const valorTotal = quantidade * taxa + iof + taxaAdministrativa
    const valorLiquido = valorTotal - taxaAdministrativa - iof

    setFormData(prev => ({
      ...prev,
      taxa: Number(taxa.toFixed(5)),
      taxaEspecial: Number(taxaEspecial.toFixed(5)),
      taxaDesejada: Number(taxaDesejada.toFixed(5)),
      iof: Number(iof.toFixed(2)),
      valorTotal: Number(valorTotal.toFixed(2)),
      valorLiquido: Number(valorLiquido.toFixed(2))
    }))
  }

  const adjustValues = (adjustmentData: AdjustmentData) => {
    const { taxaAdministrativa } = formData
    let { liquidValue } = adjustmentData

    if (adjustmentData.options.cedulas200_500_1000) {
      liquidValue = liquidValue * 0.88
    }

    if (adjustmentData.adjustBy === 'taxa') {
      const quantidade = formData.quantidade
      const iof = liquidValue * 0.0038
      const valorTotal = liquidValue + taxaAdministrativa + iof
      const taxa = (valorTotal - taxaAdministrativa - iof) / quantidade

      setFormData(prev => ({
        ...prev,
        taxa: Number(taxa.toFixed(5)),
        taxaEspecial: Number((taxa * 0.998).toFixed(5)),
        taxaDesejada: Number((taxa * 1.002).toFixed(5)),
        iof: Number(iof.toFixed(2)),
        valorTotal: Number(valorTotal.toFixed(2)),
        valorLiquido: Number(liquidValue.toFixed(2))
      }))
    } else {
      const taxa = formData.taxa
      const quantidade = liquidValue / taxa
      const iof = quantidade * taxa * 0.0038
      const valorTotal = quantidade * taxa + iof + taxaAdministrativa

      setFormData(prev => ({
        ...prev,
        quantidade: Number(quantidade.toFixed(2)),
        iof: Number(iof.toFixed(2)),
        valorTotal: Number(valorTotal.toFixed(2)),
        valorLiquido: Number(liquidValue.toFixed(2))
      }))
    }
  }

  const roundValues = () => {
    const { taxaAdministrativa } = formData
    const valorTotalRounded = Math.ceil(formData.valorTotal)
    const valorLiquido = valorTotalRounded - taxaAdministrativa - formData.iof
    const taxa = (valorTotalRounded - taxaAdministrativa - formData.iof) / formData.quantidade

    setFormData(prev => ({
      ...prev,
      taxa: Number(taxa.toFixed(5)),
      taxaEspecial: Number((taxa * 0.998).toFixed(5)),
      taxaDesejada: Number((taxa * 1.002).toFixed(5)),
      valorTotal: valorTotalRounded,
      valorLiquido: Number(valorLiquido.toFixed(2))
    }))
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (field === 'quantidade') {
      calculateValues()
    }
  }

  const handleAddToCart = () => {
    const operationData = {
      loja: commonData.loja,
      operacao: formData.operacao,
      moeda: formData.moeda,
      taxaAdministrativa: formData.taxaAdministrativa,
      canalAtendimento: commonData.canalAtendimento,
      corporate: formData.corporate,
      retiradaHoje: formData.retiradaHoje,
      quantidade: formData.quantidade,
      taxa: formData.taxa,
      taxaEspecial: formData.taxaEspecial,
      taxaDesejada: formData.taxaDesejada,
      iof: formData.iof,
      valorTotal: formData.valorTotal,
      valorLiquido: formData.valorLiquido,
      campanha: formData.campanha,
      naturezaOperacao: commonData.naturezaOperacao
    }

    addOperation(operationData)
  }

  const isFormValid = () => {
    return !!(
      commonData.loja &&
      formData.operacao &&
      formData.moeda &&
      commonData.canalAtendimento &&
      formData.quantidade > 0
    )
  }

  const formatCurrency = (value: number, decimals: number = 2) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value)
  }

  const formatDecimal = (value: number, decimals: number = 5) => {
    return value.toFixed(decimals).replace(".", ",")
  }

  useEffect(() => {
    calculateValues()
  }, [])

  return (
    <>
      <Card className="w-full">
        <CardContent className="space-y-4 mt-2">
          {/* Operação e Moeda */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm">Operação *</Label>
              <RadioGroup
                value={formData.operacao}
                onValueChange={(value) => handleInputChange('operacao', value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="COMPRA" id="compra" />
                  <Label htmlFor="compra" className="text-sm">Compra</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="VENDA" id="venda" />
                  <Label htmlFor="venda" className="text-sm">Venda</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="moeda" className="text-sm">Moeda *</Label>
              <Select value={formData.moeda} onValueChange={(value) => handleInputChange('moeda', value)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Selecione a moeda" />
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
          </div>

          {/* Configurações */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxaAdministrativa" className="text-sm">Taxa Administrativa *</Label>
              <Input
                id="taxaAdministrativa"
                type="number"
                step="0.01"
                value={formData.taxaAdministrativa}
                onChange={(e) => handleInputChange('taxaAdministrativa', parseFloat(e.target.value) || 0)}
                className="h-9"
              />
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <Checkbox
                id="corporate"
                checked={formData.corporate}
                disabled={true}
                onCheckedChange={(checked) => handleInputChange('corporate', checked)}
              />
              <Label htmlFor="corporate" className="text-sm opacity-50">Corporate</Label>
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <Checkbox
                id="retiradaHoje"
                checked={formData.retiradaHoje}
                onCheckedChange={(checked) => handleInputChange('retiradaHoje', checked)}
              />
              <Label htmlFor="retiradaHoje" className="text-sm">Retirada Hoje (D0)</Label>
            </div>
          </div>

          {/* Valores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantidade" className="text-sm">Quantidade *</Label>
              <CurrencyInput
                id="quantidade"
                value={formData.quantidade}
                onChange={(value) => handleInputChange('quantidade', value)}
                className="h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxa" className="text-sm">Taxa</Label>
              <Input
                id="taxa"
                type="text"
                value={formatDecimal(formData.taxa)}
                readOnly
                className="bg-gray-50 h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorTotal" className="text-sm">Valor Total</Label>
              <Input
                id="valorTotal"
                type="text"
                value={formatCurrency(formData.valorTotal)}
                readOnly
                className="bg-gray-50 font-semibold h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxaEspecial" className="text-sm">Taxa Especial</Label>
              <Input
                id="taxaEspecial"
                type="text"
                value={formatDecimal(formData.taxaEspecial)}
                readOnly
                className="bg-gray-50 h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="iof" className="text-sm">IOF</Label>
              <Input
                id="iof"
                type="text"
                value={formatCurrency(formData.iof)}
                readOnly
                className="bg-gray-50 h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorLiquido" className="text-sm">Valor Líquido</Label>
              <Input
                id="valorLiquido"
                type="text"
                value={formatCurrency(formData.valorLiquido)}
                readOnly
                className="bg-gray-50 font-semibold h-9"
              />
            </div>
          </div>

          {/* Campanha */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="campanha" className="text-sm">Campanha</Label>
              <Input
                id="campanha"
                type="text"
                value={formData.campanha}
                onChange={(e) => handleInputChange('campanha', e.target.value)}
                placeholder="Digite a campanha"
                className="h-9"
              />
            </div>
          </div>

          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t">
            <div className="space-y-1">
              <Label className="text-sm font-medium text-orange-600">Spread da Operação</Label>
              <div className="text-xl font-bold text-orange-600">6,00 %</div>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-red-600">Resultado da Operação</Label>
              <div className="text-xl font-bold text-red-600">R$ 0,33</div>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={calculateValues}
              className="flex items-center gap-2 h-9"
            >
              <RefreshCwIcon className="size-4" /> Recalcular
            </Button>

            <Button
              variant="outline"
              onClick={adjustmentModal.open}
              className="flex items-center gap-2 h-9"
            >
              <SettingsIcon className="size-4" /> Ajustar
            </Button>

            <Button
              variant="outline"
              onClick={roundValues}
              className="flex items-center gap-2 h-9"
            >
              <CircleIcon className="size-4" /> Arredondar
            </Button>

            <Button
              onClick={handleAddToCart}
              disabled={!isFormValid()}
              className="flex items-center gap-2 h-9 ml-auto"
            >
              <PlusIcon className="size-4" /> Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>

      <AdjustmentModal
        isOpen={adjustmentModal.isOpen}
        onClose={adjustmentModal.close}
        onConfirm={adjustValues}
        initialValue={formData.valorLiquido}
      />
    </>
  )
}