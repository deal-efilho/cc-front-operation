"use client"

import { Button, Card, CardContent, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@mfe/cc-front-shared"
import { SearchIcon } from "lucide-react"
import { useDocumentStore, applyCPFMask, applyCNPJMask } from "../../hooks/use-document-search"
import { useUserDetailsStore } from "../../hooks/use-user-details"
import { CompactClientInfo } from "../compact-client-info/compact-client-info"

const LOJAS = [
  { value: "CPS_SH_DOM_PEDRO", label: "CPS SH DOM PEDRO" },
  { value: "CPS_JUDIAI_SH", label: "CPS JUDIAI SH" }
]

const CANAIS_ATENDIMENTO = [
  { value: "APP", label: "APP" },
  { value: "CHAT", label: "CHAT" },
  { value: "EMAIL", label: "E-MAIL" },
  { value: "PARCEIROS", label: "PARCEIROS" },
  { value: "PRESENCIAL", label: "PRESENCIAL" },
  { value: "REDES_SOCIAIS", label: "REDES SOCIAIS" },
  { value: "TELEFONE", label: "TELEFONE" },
  { value: "WHATSAPP", label: "WHATSAPP" }
]

interface SharedExchangeSectionProps {
  commonData: {
    loja: string
    canalAtendimento: string
    naturezaOperacao: string
  }
  onCommonDataChange: (field: string, value: string) => void
}

export function SharedExchangeSection({ commonData, onCommonDataChange }: SharedExchangeSectionProps) {
  const { selectedType, documentValue, setSelectedType, setDocumentValue } = useDocumentStore()
  const { userDetails, isVisible: clientVisible, showUserDetails } = useUserDetailsStore()

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

  const getPlaceholder = () => {
    switch (selectedType) {
      case "CPF":
        return "000.000.000-00"
      case "CNPJ":
        return "00.000.000/0000-00"
      default:
        return `Digite o ${selectedType}`
    }
  }

  return (
    <div className="space-y-4">
      {/* Card Principal - Forma Compacta */}
      <Card>
        <CardContent className="p-4">
          {/* Primeira linha - Busca de cliente (destaque) */}
          {/* Tipos de documento - inline */}
          <div className="flex gap-2 items-center">
            <div className="flex items-center space-x-1">
              <input
                type="radio"
                id="cpf"
                name="documentType"
                value="CPF"
                checked={selectedType === "CPF"}
                onChange={() => setSelectedType("CPF")}
                className="h-3 w-3"
              />
              <Label htmlFor="cpf" className="text-xs">CPF</Label>
            </div>

            <div className="flex items-center space-x-1">
              <input
                type="radio"
                id="passaporte"
                name="documentType"
                value="PASSAPORTE"
                checked={selectedType === "PASSAPORTE"}
                onChange={() => setSelectedType("PASSAPORTE")}
                className="h-3 w-3"
              />
              <Label htmlFor="passaporte" className="text-xs">Passaporte/CNE</Label>
            </div>

            <div className="flex items-center space-x-1">
              <input
                type="radio"
                id="cnpj"
                name="documentType"
                value="CNPJ"
                checked={selectedType === "CNPJ"}
                onChange={() => setSelectedType("CNPJ")}
                className="h-3 w-3"
              />
              <Label htmlFor="cnpj" className="text-xs">CNPJ</Label>
            </div>
          </div>

          {/* Campo de busca + configurações em linha */}
          <div className="grid grid-cols-12 gap-2 items-end">
            {/* Documento - 4 colunas */}
            <div className="col-span-3">
              <Input
                type="text"
                value={documentValue}
                onChange={handleDocumentChange}
                placeholder={getPlaceholder()}
                className="h-8 text-sm"
              />
            </div>

            {/* Botão pesquisar - 1 coluna */}
            <div className="col-span-1">
              <Button
                onClick={handleSearch}
                disabled={!documentValue.trim()}
                className="h-8 w-full p-0"
                size="sm"
              >
                <SearchIcon className="size-3" />
              </Button>
            </div>

            {/* Loja - 2 colunas */}
            <div className="col-span-3 space-y-1">
              <Label className="text-xs text-gray-600">Loja</Label>
              <Select
                value={commonData.loja}
                onValueChange={(value) => onCommonDataChange('loja', value)}
              >
                <SelectTrigger className="h-8 text-xs">
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

            {/* Canal - 2 colunas */}
            <div className="col-span-2 space-y-1">
              <Label className="text-xs text-gray-600">Canal</Label>
              <Select
                value={commonData.canalAtendimento}
                onValueChange={(value) => onCommonDataChange('canalAtendimento', value)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
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

            {/* Natureza - 3 colunas */}
            <div className="col-span-3 space-y-1">
              <Label className="text-xs text-gray-600">Natureza</Label>
              <Select
                value={commonData.naturezaOperacao}
                onValueChange={(value) => onCommonDataChange('naturezaOperacao', value)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="32999 - Viagem Internacional">
                    32999 - Viagem Internacional
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações do Cliente - Aparece quando pesquisar */}
      {clientVisible && (
        <CompactClientInfo
          nome={userDetails.nome}
          classificacao={userDetails.classificacao}
          valorDisponivelCompra={userDetails.valorDisponivelCompra}
          valorDisponivelVenda={userDetails.valorDisponivelVenda}
          situacaoReceita={userDetails.situacaoReceita}
          usuarioUltimaAtualizacao={userDetails.usuarioUltimaAtualizacao}
          dataUltimaAtualizacao={userDetails.dataUltimaAtualizacao}
          diferencial={userDetails.diferencial}
        />
      )}
    </div>
  )
}