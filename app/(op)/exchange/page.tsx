"use client"
import { DocumentSearch } from "@/features/exchange/components/document-search/document-search";
import { ExchangeForm } from "@/features/exchange/components/eschange-form/exchange-form";
import { OperationsCart } from "@/features/exchange/components/operation-cart/operation-cart";
import { UserDetailsSection } from "@/features/exchange/components/user-details-section/user-details-section";
import { useOperationsCartStore } from "@/features/exchange/hooks/use-operation-cart";
import { Heading } from "@mfe/cc-front-shared";

const ExchangePage = () => {
  const {
    operations,
    copyOperation,
    removeOperation,
    getTotalValue,
    getTotalType,
    getAbsoluteTotalValue
  } = useOperationsCartStore();

  const handleSave = () => {
    console.log('Salvando propostas...', operations);
    // Implementar lógica de salvar
  };

  const handleRegister = () => {
    console.log('Registrando cotação...', operations);
    // Implementar lógica de registrar
  };

  const handleCopy = (operation: any) => {
    console.log('Copiando operação:', operation);
    copyOperation(operation);
  };

  const handleRemove = (id: string) => {
    console.log('Removendo operação:', id);
    removeOperation(id);
  };

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
  );
}

export default ExchangePage;