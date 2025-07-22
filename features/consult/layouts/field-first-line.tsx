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

      onFocus: () =>
        setTextAssistenceValue("Número de identificação da proposta"),
    },
    {
      id: "clientName",
      label: "Nome do cliente",
      onFocus: () => setTextAssistenceValue("Nome do Cliente"),
    },
  ];

  return (
    <div className="flex center justify-between">
      {fields.map(({ id, label, type, onFocus }) => (
        <InputField
          id={id}
          key={id}
          label={label}
          type={type}
          onFocus={onFocus}
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
