"use client";

import { DocumentSearch, InputField } from "../components";
import { usetextAssistenceStore } from "../hooks";

export const FieldFirstLine = () => {
  const { setTextAssistenceValue } = usetextAssistenceStore();

  const fields = [
    {
      id: "number",
      label: "Número",
      type: "number",
      tooltipMessage: "Número de identificação da proposta",
    },
    {
      id: "clientName",
      label: "Nome do cliente",
      tooltipMessage: "Nome do Cliente",
    },
  ];

  return (
    <div className="flex center gap-8">
      {fields.map(({ id, label, type, tooltipMessage }) => (
        <InputField
          id={id}
          key={id}
          label={label}
          type={type}
          tooltipMessage={tooltipMessage}
        />
      ))}

      <DocumentSearch
        onFocus={() =>
          setTextAssistenceValue(
            "Documento do Cliente. Ex.: CPF, CNPJ, Passaporte ou CNE."
          )
        }
      />
    </div>
  );
};
