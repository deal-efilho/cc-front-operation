"use client"

import { useState } from "react"
import { Button, Card, CardContent, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@mfe/cc-front-shared"
import { SearchIcon } from "lucide-react"
import { useDocumentStore, applyCPFMask, applyCNPJMask } from "../../hooks/use-document-search"
import { useUserDetailsStore } from "../../hooks/use-user-details"
import { CompactClientInfo } from "../compact-client-info/compact-client-info"
import { Combobox } from "@/components/combobox"
import { normalizeText } from "@/lib/utils"

const LOJAS = [
  { value: "CPS_SH_DOM_PEDRO", label: "CPS SH DOM PEDRO" },
  { value: "CPS_JUDIAI_SH", label: "CPS JUDIAI SH" },
  { value: "CE_MESA", label: "CE MESA" },
  { value: "CI_ONLINE", label: "CI ONLINE" }
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

const PROMOCODES = [
  "VIAGEM2024",
  "DESCONTO10",
  "BLACKFRIDAY",
  "NATAL2024",
  "FERIAS25",
  "ESTUDANTE",
  "PRIMEIRA_COMPRA",
  "CLIENTE_VIP",
  "CASHBACK15",
  "SUPER_OFERTA",
  "MEGA_DESCONTO",
  "PROMO_ESPECIAL"
]

interface SharedExchangeSectionProps {
  commonData: {
    loja: string
    canalAtendimento: string
    naturezaOperacao: string
    campanha: string
  }
  onCommonDataChange: (field: string, value: string) => void
}

export function SharedExchangeSection({ commonData, onCommonDataChange }: SharedExchangeSectionProps) {
  const { selectedType, documentValue, setSelectedType, setDocumentValue } = useDocumentStore()
  const { userDetails, isVisible: clientVisible, showUserDetails } = useUserDetailsStore()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredPromocodes, setFilteredPromocodes] = useState<string[]>([])

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

  const handleCampanhaChange = (value: string) => {
    onCommonDataChange('campanha', value)

    if (value.length > 0) {
      const normalizedValue = normalizeText(value)
      const filtered = PROMOCODES.filter(code =>
        normalizeText(code).includes(normalizedValue)
      )
      setFilteredPromocodes(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
      setFilteredPromocodes([])
    }
  }

  const handlePromocodeSuggestionClick = (code: string) => {
    onCommonDataChange('campanha', code)
    setShowSuggestions(false)
    setFilteredPromocodes([])
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
            {/* Documento - 3 colunas */}
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

            {/* Loja - 3 colunas */}
            <div className="col-span-3 space-y-1">
              <Label className="text-xs text-gray-600">Loja</Label>
              <div className="relative">
                <Combobox
                  value={commonData.loja}
                  handleChange={(value) => onCommonDataChange('loja', value)}
                  options={LOJAS}
                  placeholder="Selecione a loja"
                  modifiWidth="w-full h-8"
                />
              </div>
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

            {/* Campo de Campanha - 3 colunas */}
            <div className="col-span-3 space-y-1 relative">
              <Label className="text-xs text-gray-600">Campanha</Label>
              <Input
                type="text"
                value={commonData.campanha}
                onChange={(e) => handleCampanhaChange(e.target.value)}
                onFocus={() => {
                  if (commonData.campanha.length > 0) {
                    const normalizedValue = normalizeText(commonData.campanha)
                    const filtered = PROMOCODES.filter(code =>
                      normalizeText(code).includes(normalizedValue)
                    )
                    setFilteredPromocodes(filtered)
                    setShowSuggestions(filtered.length > 0)
                  }
                }}
                onBlur={() => {
                  // Delay para permitir clique nas sugestões
                  setTimeout(() => setShowSuggestions(false), 200)
                }}
                placeholder="Código promocional"
                className="h-8 text-sm"
                autoComplete="off"
              />

              {/* Sugestões de autocomplete */}
              {showSuggestions && filteredPromocodes.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                  {filteredPromocodes.map((code) => (
                    <button
                      key={code}
                      onClick={() => handlePromocodeSuggestionClick(code)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              )}
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