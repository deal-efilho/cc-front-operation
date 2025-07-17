"use client"

import { Heading } from "@mfe/cc-front-shared"
import { DocumentSearch } from "../../components/document-search/document-search"
import { ExchangeForm } from "../../components/eschange-form/exchange-form"
import { OperationsCart } from "../../components/operation-cart/operation-cart"
import { UserDetailsSection } from "../../components/user-details-section/user-details-section"
import { useOperationsCartStore } from "../../hooks/use-operation-cart"

export function NormalExchangeContent() {
  const {
    operations,
    copyOperation,
    removeOperation,
    getTotalValue,
    getTotalType,
    getAbsoluteTotalValue
  } = useOperationsCartStore()

  const handleSave = () => {
    console.log('Salvando propostas...', operations)
    // Implementar lógica de salvar
  }

  const handleRegister = () => {
    console.log('Registrando cotação...', operations)
    // Implementar lógica de registrar
  }

  const handleCopy = (operation: any) => {
    console.log('Copiando operação:', operation)
    copyOperation(operation)
  }

  const handleRemove = (id: string) => {
    console.log('Removendo operação:', id)
    removeOperation(id)
  }

  return (
    <div className="flex flex-col gap-4">
      <Heading title="Negociar Câmbio" />

      <DocumentSearch />

      <UserDetailsSection />

      <ExchangeForm />

      {operations.length > 0 && (
        <OperationsCart
          operations={operations}
          onCopy={handleCopy}
          onRemove={handleRemove}
          onSave={handleSave}
          onRegister={handleRegister}
          getTotalValue={getTotalValue}
          getTotalType={getTotalType}
          getAbsoluteTotalValue={getAbsoluteTotalValue}
        />
      )}
    </div>
  )
}