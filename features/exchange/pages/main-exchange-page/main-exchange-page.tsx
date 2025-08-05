"use client"

import { useState } from "react"
import { Heading } from "@mfe/cc-front-shared"
import { SharedExchangeSection } from "../../components/shared-exchange-section/shared-exchange-section"
import { OperationsCart } from "../../components/operation-cart/operation-cart"
import { useOperationsCartStore } from "../../hooks/use-operation-cart"
import { SimplifiedExpressForm } from "../../express/simplified-express-form/simplified-express-form"

export function MainExchangePage() {
  const [commonData, setCommonData] = useState({
    loja: "CPS_SH_DOM_PEDRO",
    canalAtendimento: "",
    naturezaOperacao: "32999 - Viagem Internacional",
    campanha: ""
  })

  const {
    operations,
    removeOperation,
    getTotalValue,
    getTotalType,
    getAbsoluteTotalValue
  } = useOperationsCartStore()

  const handleCommonDataChange = (field: string, value: string) => {
    setCommonData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Salvando propostas...', operations)
    // Implementar lógica de salvar
  }

  const handleRegister = () => {
    console.log('Registrando cotação...', operations)
    // Implementar lógica de registrar
  }

  const handleRemove = (id: string) => {
    console.log('Removendo operação:', id)
    removeOperation(id)
  }

  return (
    <div className="flex flex-col gap-6">
      <Heading title="Negociar Câmbio" />

      {/* Área Compartilhada */}
      <SharedExchangeSection
        commonData={commonData}
        onCommonDataChange={handleCommonDataChange}
      />

      {/* Câmbio Express */}
      <SimplifiedExpressForm commonData={commonData} />

      {/* Carrinho de Operações */}
      {operations.length > 0 && (
        <OperationsCart
          operations={operations}
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