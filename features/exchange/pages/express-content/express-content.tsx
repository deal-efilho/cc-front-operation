"use client"

import { OperationsCart } from "../../components/operation-cart/operation-cart"
import { ExpressForm } from "../../express/express-form/express-form"
import { useOperationsCartStore } from "../../hooks/use-operation-cart"

export function ExpressContent() {
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
      <ExpressForm />

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