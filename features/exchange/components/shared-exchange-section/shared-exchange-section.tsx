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
      {/* Card Principal - Área Compartilhada */}
      <Card>
        <CardContent className="p-6">
          {/* Seção principal - Busca de Cliente (destaque) */}
          <div className="space-y-4 mb-6">
            <div className="flex gap-6 items-center">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="cpf"
                  name="documentType"
                  value="CPF"
                  checked={selectedType === "CPF"}
                  onChange={() => setSelectedType("CPF")}
                  className="h-4 w-4"
                />
                <Label htmlFor="cpf" className="text-sm">CPF</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="passaporte"
                  name="documentType"
                  value="PASSAPORTE"
                  checked={selectedType === "PASSAPORTE"}
                  onChange={() => setSelectedType("PASSAPORTE")}
                  className="h-4 w-4"
                />
                <Label htmlFor="passaporte" className="text-sm">Passaporte/CNE/Identidade</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="cnpj"
                  name="documentType"
                  value="CNPJ"
                  checked={selectedType === "CNPJ"}
                  onChange={() => setSelectedType("CNPJ")}
                  className="h-4 w-4"
                />
                <Label htmlFor="cnpj" className="text-sm">CNPJ</Label>
              </div>
            </div>

            <div className="flex gap-3">
              <Input
                type="text"
                value={documentValue}
                onChange={handleDocumentChange}
                placeholder={getPlaceholder()}
                className="flex-1 h-10 text-base"
              />
              <Button
                onClick={handleSearch}
                disabled={!documentValue.trim()}
                className="flex items-center gap-2 h-10 px-6"
              >
                <SearchIcon className="size-4" />
                Pesquisar
              </Button>
            </div>
          </div>

          {/* Configurações secundárias em linha */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="space-y-2">
              <Label htmlFor="loja" className="text-sm text-gray-600">Loja *</Label>
              <Select
                value={commonData.loja}
                onValueChange={(value) => onCommonDataChange('loja', value)}
              >
                <SelectTrigger className="h-9">
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
              <Label htmlFor="canalAtendimento" className="text-sm text-gray-600">Canal *</Label>
              <Select
                value={commonData.canalAtendimento}
                onValueChange={(value) => onCommonDataChange('canalAtendimento', value)}
              >
                <SelectTrigger className="h-9">
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

            <div className="space-y-2">
              <Label htmlFor="naturezaOperacao" className="text-sm text-gray-600">Natureza *</Label>
              <Select
                value={commonData.naturezaOperacao}
                onValueChange={(value) => onCommonDataChange('naturezaOperacao', value)}
              >
                <SelectTrigger className="h-9">
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