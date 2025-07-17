import { FileText, Trash2, Receipt } from "lucide-react";

import type { FilterResponseColumn } from "../mocks";
import {
  useCancelProposalModalStore,
  useviewProposalModalStore,
} from "../hooks";

interface ActionTableComponentProps {
  original: FilterResponseColumn;
}

export const ActionTableComponent = ({
  original,
}: ActionTableComponentProps) => {
  const { setOpenCancelProposalModal } = useCancelProposalModalStore();
  const { setViewProposalDataValue, setOpenViewProposalModal } =
    useviewProposalModalStore();

  const verifyStatus = () => original.status.toLowerCase();

  return (
    <div className="flex items-center gap-1">
      <button
        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
        title="Visualizar proposta"
        onClick={() => {
          setViewProposalDataValue({
            doc: original.clientDocument,
            number: original.number,
            name: original.clientName,
          });
          setOpenViewProposalModal(true);
        }}
      >
        <FileText className="size-6" />
      </button>

      {verifyStatus() === "aprovado" && (
        <button
          className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
          title="Visualizar comprovante"
          onClick={() => alert("baixando comprovante ...")}
        >
          <Receipt className="size-6" />
        </button>
      )}

      {verifyStatus() !== "cancelado" && (
        <button
          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
          title="Cancelar proposta"
          onClick={() => {
            setViewProposalDataValue({
              doc: original.clientDocument,
              number: original.number,
              name: original.clientName,
            });
            setOpenCancelProposalModal(true);
          }}
        >
          <Trash2 className="size-6" />
        </button>
      )}
    </div>
  );
};
