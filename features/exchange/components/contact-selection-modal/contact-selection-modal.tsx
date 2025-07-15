// features/exchange/components/contact-selection-modal/contact-selection-modal.tsx
"use client"

import { useId, useState } from "react"
import { SearchIcon, XIcon } from "lucide-react"
import {
  Button,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem
} from "@mfe/cc-front-shared"
import { BaseModal } from "@/components/ui/base-modal"

interface ContactSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSearch?: (type: string, value: string) => void
}

export function ContactSelectionModal({
  isOpen,
  onClose,
  onSearch
}: ContactSelectionModalProps) {
  const id = useId()
  const [selectedType, setSelectedType] = useState("CPF")
  const [searchValue, setSearchValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Pesquisando:', { selectedType, searchValue })
    onSearch?.(selectedType, searchValue)
    // Não fechar o modal automaticamente - deixar para o usuário decidir
  }

  const handleClose = () => {
    // Reset form when closing
    setSelectedType("CPF")
    setSearchValue("")
    onClose()
  }

  const getPlaceholder = () => {
    switch (selectedType) {
      case "CPF":
        return "000.000.000-00"
      case "PASSAPORTE":
        return "Digite o número do documento"
      default:
        return "Digite o documento"
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Seleção de Contato"
      description="Selecione o tipo de documento e digite o número para buscar o contato."
      size="md"
      showIcon={false}
    >
      <div className="px-6 pt-4 pb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tipo de documento */}
          <div className="space-y-3">
            <RadioGroup
              value={selectedType}
              onValueChange={setSelectedType}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CPF" id={`${id}-cpf`} />
                <Label htmlFor={`${id}-cpf`} className="text-sm">CPF</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PASSAPORTE" id={`${id}-passaporte`} />
                <Label htmlFor={`${id}-passaporte`} className="text-sm">
                  Passaporte/CNE/Identidade
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Input
            type="text"
            value={""}
            onChange={() => { }}
            placeholder={getPlaceholder()}
            className="flex-1 min-w-80"
          />

          {/* Campo de busca */}
          <div className="space-y-2">
            <Label htmlFor={`${id}-search`} className="text-sm">
              Nome contato para busca
            </Label>
            <Input
              id={`${id}-search`}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Botões de ação */}
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              className="flex items-center gap-2 flex-1"
              disabled={!searchValue.trim()}
            >
              <SearchIcon className="size-4" />
              Pesquisar
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex items-center gap-2"
            >
              <XIcon className="size-4" />
              Fechar
            </Button>
          </div>
        </form>
      </div>
    </BaseModal>
  )
}