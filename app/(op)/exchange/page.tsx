import { DocumentSearch } from "@/features/exchange/components/document-search/document-search";
import { Heading } from "@mfe/cc-front-shared";

const ExchangePage = () => {

  return (
    <div className="flex flex-col gap-4">
      <Heading title="Negociar Câmbio" />

      <DocumentSearch />
    </div>
  );
}

export default ExchangePage;