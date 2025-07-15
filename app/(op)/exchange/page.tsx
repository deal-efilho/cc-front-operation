import { DocumentSearch } from "@/features/exchange/components/document-search/document-search";
import { ExchangeForm } from "@/features/exchange/components/eschange-form/exchange-form";
import { Heading } from "@mfe/cc-front-shared";

const ExchangePage = () => {

  return (
    <div className="flex flex-col gap-4">
      <Heading title="Negociar Câmbio" />

      <DocumentSearch />

      <ExchangeForm />
    </div>
  );
}

export default ExchangePage;