// features/exchange/components/simplified-normal-form/simplified-normal-form.tsx
"use client"

import { useEffect } from "react"
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Checkbox, Card, CardContent } from "@mfe/cc-front-shared"
import { RefreshCwIcon, SettingsIcon, PlusIcon, CircleIcon } from "lucide-react"
import { CurrencyInput } from "@/components/ui/currency-input"
import { SwitchTwo } from "@/components/ui/switch-two"
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
        <CardContent className="space-y-3 p-4">
          {/* Linha 1 - Operação, Moeda e Taxa Admin */}
          <div className="grid grid-cols-12 gap-3 items-end">
            {/* Operação - 3 colunas */}
            <div className="col-span-3 space-y-1">
              <Label className="text-xs">Operação *</Label>
              <div className="flex flex-col items-center gap-1">
                <div className="inline-flex items-center gap-2" data-state={formData.operacao === 'VENDA' ? "checked" : "unchecked"}>
                  <span
                    className={`flex-1 cursor-pointer text-right text-xs font-medium ${formData.operacao === 'COMPRA' ? 'text-green-600' : 'text-muted-foreground/70'
                      }`}
                    onClick={() => handleInputChange('operacao', 'COMPRA')}
                  >
                    Compra
                  </span>
                  <SwitchTwo
                    checked={formData.operacao === 'VENDA'}
                    onCheckedChange={(checked) => handleInputChange('operacao', checked ? 'VENDA' : 'COMPRA')}
                  />
                  <span
                    className={`flex-1 cursor-pointer text-left text-xs font-medium ${formData.operacao === 'VENDA' ? 'text-red-600' : 'text-muted-foreground/70'
                      }`}
                    onClick={() => handleInputChange('operacao', 'VENDA')}
                  >
                    Venda
                  </span>
                </div>
              </div>
            </div>

            {/* Moeda - 4 colunas */}
            <div className="col-span-4 space-y-1">
              <Label className="text-xs">Moeda *</Label>
              <Select value={formData.moeda} onValueChange={(value) => handleInputChange('moeda', value)}>
                <SelectTrigger className="h-8 text-sm">
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

            {/* Taxa Admin - 3 colunas */}
            <div className="col-span-3 space-y-1">
              <Label className="text-xs">Taxa Admin *</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.taxaAdministrativa}
                onChange={(e) => handleInputChange('taxaAdministrativa', parseFloat(e.target.value) || 0)}
                className="h-8 text-sm"
              />
            </div>

            {/* Checkboxes - 2 colunas */}
            <div className="col-span-2 space-y-1">
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Checkbox
                    id="corporate"
                    checked={formData.corporate}
                    disabled={true}
                    onCheckedChange={(checked) => handleInputChange('corporate', checked)}
                    className="h-3 w-3"
                  />
                  <Label htmlFor="corporate" className="text-xs opacity-50">Corporate</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <Checkbox
                    id="retiradaHoje"
                    checked={formData.retiradaHoje}
                    onCheckedChange={(checked) => handleInputChange('retiradaHoje', checked)}
                    className="h-3 w-3"
                  />
                  <Label htmlFor="retiradaHoje" className="text-xs">Retirada D0</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Linha 2 - Valores principais */}
          <div className="grid grid-cols-6 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Quantidade *</Label>
              <CurrencyInput
                value={formData.quantidade}
                onChange={(value) => handleInputChange('quantidade', value)}
                className="h-8 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Taxa</Label>
              <Input
                type="text"
                value={formatDecimal(formData.taxa)}
                readOnly
                className="bg-gray-50 h-8 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Taxa Especial</Label>
              <Input
                type="text"
                value={formatDecimal(formData.taxaEspecial)}
                readOnly
                className="bg-gray-50 h-8 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs">IOF</Label>
              <Input
                type="text"
                value={formatCurrency(formData.iof)}
                readOnly
                className="bg-gray-50 h-8 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Valor Total</Label>
              <Input
                type="text"
                value={formatCurrency(formData.valorTotal)}
                readOnly
                className="bg-gray-50 font-semibold h-8 text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Valor Líquido</Label>
              <Input
                type="text"
                value={formatCurrency(formData.valorLiquido)}
                readOnly
                className="bg-gray-50 font-semibold h-8 text-sm"
              />
            </div>
          </div>

          {/* Linha 3 - Campanha */}
          <div className="grid grid-cols-1">
            <div className="space-y-1">
              <Label className="text-xs">Campanha</Label>
              <Input
                type="text"
                value={formData.campanha}
                onChange={(e) => handleInputChange('campanha', e.target.value)}
                placeholder="Digite a campanha"
                className="h-8 text-sm"
              />
            </div>
          </div>

          {/* Linha 4 - Resumo */}
          <div className="grid grid-cols-2 gap-4 py-2 border-t">
            <div>
              <Label className="text-xs font-medium text-orange-600">Spread da Operação</Label>
              <div className="text-lg font-bold text-orange-600">6,00 %</div>
            </div>
            <div>
              <Label className="text-xs font-medium text-red-600">Resultado da Operação</Label>
              <div className="text-lg font-bold text-red-600">R$ 0,33</div>
            </div>
          </div>

          {/* Linha 5 - Botões */}
          <div className="flex gap-2 pt-1">
            <Button
              variant="outline"
              onClick={calculateValues}
              className="flex items-center gap-1 h-8 text-xs px-3"
            >
              <RefreshCwIcon className="size-3" /> Recalcular
            </Button>

            <Button
              variant="outline"
              onClick={adjustmentModal.open}
              className="flex items-center gap-1 h-8 text-xs px-3"
            >
              <SettingsIcon className="size-3" /> Ajustar
            </Button>

            <Button
              variant="outline"
              onClick={roundValues}
              className="flex items-center gap-1 h-8 text-xs px-3"
            >
              <CircleIcon className="size-3" /> Arredondar
            </Button>

            <Button
              onClick={handleAddToCart}
              disabled={!isFormValid()}
              className="flex items-center gap-1 h-8 text-xs px-3 ml-auto"
            >
              <PlusIcon className="size-3" /> Adicionar
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