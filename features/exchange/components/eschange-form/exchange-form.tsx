"use client"
import { useEffect } from "react";
import { useExchangeFormStore } from "../../hooks/use-exchange-form";
import { Button, Input, Label, RadioGroup, RadioGroupItem, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Checkbox, Card, CardContent, CardHeader, CardTitle } from "@mfe/cc-front-shared";
import { RefreshCwIcon } from "lucide-react";

const LOJAS = [
  { value: "CPS_SH_DOM_PEDRO", label: "CPS SH DOM PEDRO" },
  { value: "CPS_JUDIAI_SH", label: "CPS JUDIAI SH" }
];

const MOEDAS = [
  { value: "USD_ESPECIE", label: "Dólar Espécie" },
  { value: "EUR_ESPECIE", label: "Euro Espécie" }
];

const CANAIS_ATENDIMENTO = [
  { value: "APP", label: "APP" },
  { value: "CHAT", label: "CHAT" },
  { value: "EMAIL", label: "E-MAIL" },
  { value: "PARCEIROS", label: "PARCEIROS" },
  { value: "PRESENCIAL", label: "PRESENCIAL" },
  { value: "REDES_SOCIAIS", label: "REDES SOCIAIS" },
  { value: "TELEFONE", label: "TELEFONE" },
  { value: "WHATSAPP", label: "WHATSAPP" }
];

function ExchangeForm() {
  const { formData, isVisible, documento, setFormData, calculateValues } = useExchangeFormStore();

  useEffect(() => {
    if (isVisible) {
      calculateValues();
    }
  }, [isVisible, calculateValues]);

  const handleInputChange = (field: string, value: any) => {
    setFormData({ [field]: value });
  };

  const formatCurrency = (value: number, decimals: number = 2) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  };

  const formatDecimal = (value: number, decimals: number = 5) => {
    return value.toFixed(decimals);
  };

  if (!isVisible) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Negociar Câmbio - Documento: {documento}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dados da Operação */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="loja">Loja *</Label>
            <Select value={formData.loja} onValueChange={(value) => handleInputChange('loja', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a loja" />
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

          <div className="space-y-2">
            <Label>Operação *</Label>
            <RadioGroup
              value={formData.operacao}
              onValueChange={(value) => handleInputChange('operacao', value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="COMPRA" id="compra" />
                <Label htmlFor="compra">Compra</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="VENDA" id="venda" />
                <Label htmlFor="venda">Venda</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="moeda">Moeda *</Label>
            <Select value={formData.moeda} onValueChange={(value) => handleInputChange('moeda', value)}>
              <SelectTrigger>
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

          <div className="space-y-2">
            <Label htmlFor="canalAtendimento">Canal de Atendimento *</Label>
            <Select value={formData.canalAtendimento} onValueChange={(value) => handleInputChange('canalAtendimento', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o canal" />
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
        </div>

        {/* Configurações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="taxaAdministrativa">Taxa Administrativa *</Label>
            <Input
              id="taxaAdministrativa"
              type="number"
              step="0.01"
              value={formData.taxaAdministrativa}
              onChange={(e) => handleInputChange('taxaAdministrativa', parseFloat(e.target.value) || 0)}
              placeholder="12,90"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="naturezaOperacao">Natureza da Operação *</Label>
            <Select value={formData.naturezaOperacao} onValueChange={(value) => handleInputChange('naturezaOperacao', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="32999 - Viagem Internacional">32999 - Viagem Internacional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2 pt-8">
            <Checkbox
              id="corporate"
              checked={formData.corporate}
              disabled={true}
              onCheckedChange={(checked) => handleInputChange('corporate', checked)}
            />
            <Label htmlFor="corporate" className="text-sm opacity-50">Corporate</Label>
          </div>

          <div className="flex items-center space-x-2 pt-8">
            <Checkbox
              id="retiradaHoje"
              checked={formData.retiradaHoje}
              onCheckedChange={(checked) => handleInputChange('retiradaHoje', checked)}
            />
            <Label htmlFor="retiradaHoje" className="text-sm">Retirada Hoje (D0)</Label>
          </div>
        </div>

        {/* Valores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantidade">Quantidade *</Label>
            <Input
              id="quantidade"
              type="number"
              step="0.01"
              value={formData.quantidade}
              onChange={(e) => handleInputChange('quantidade', parseFloat(e.target.value) || 0)}
              placeholder="1,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxa">Taxa</Label>
            <Input
              id="taxa"
              type="text"
              value={formatDecimal(formData.taxa)}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxaEspecial">Taxa Especial</Label>
            <Input
              id="taxaEspecial"
              type="text"
              value={formatDecimal(formData.taxaEspecial)}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxaDesejada">Taxa Desejada</Label>
            <Input
              id="taxaDesejada"
              type="text"
              value={formatDecimal(formData.taxaDesejada)}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="iof">IOF</Label>
            <Input
              id="iof"
              type="text"
              value={formatCurrency(formData.iof)}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valorTotal">Valor Total</Label>
            <Input
              id="valorTotal"
              type="text"
              value={formatCurrency(formData.valorTotal)}
              readOnly
              className="bg-gray-50 font-semibold"
            />
          </div>
        </div>

        {/* Campanha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="campanha">Campanha</Label>
            <Input
              id="campanha"
              type="text"
              value={formData.campanha}
              onChange={(e) => handleInputChange('campanha', e.target.value)}
              placeholder="Digite a campanha"
            />
          </div>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-orange-600">Spread da Operação</Label>
            <div className="text-2xl font-bold text-orange-600">6,00 %</div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-red-600">Resultado da Operação</Label>
            <div className="text-2xl font-bold text-red-600">R$ 0,33</div>
          </div>
        </div>

        {/* Botão de Recalcular */}
        <div className="flex justify-start pt-4">
          <Button
            variant="outline"
            onClick={calculateValues}
            className="flex items-center gap-2"
          >
            <RefreshCwIcon className="size-5" /> Recalcular
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { ExchangeForm };