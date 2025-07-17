"use client";

import { DocumentSearch, InputField } from "../components";
import {
  useClientNameStore,
  useNumberStore,
  usetextAssistenceStore,
} from "../hooks";

export const FieldFirstLine = () => {
  const { numberValue, setNumberValue } = useNumberStore();
  const { setTextAssistenceValue } = usetextAssistenceStore();
  const { clientNameValue, setClientNameValue } = useClientNameStore();

  const handleNumberChange = (value: string) => setNumberValue(value);
  const handleClientNameChange = (value: string) => setClientNameValue(value);

  const fields = [
    {
      id: "number",
      label: "Número",
      type: "number",
      value: numberValue,
      onFocus: () =>
        setTextAssistenceValue("Número de identificação da proposta"),
      handleChange: handleNumberChange,
    },
    {
      id: "clientName",
      label: "Nome do cliente",
      value: clientNameValue,
      onFocus: () => setTextAssistenceValue("Nome do Cliente"),
      handleChange: handleClientNameChange,
    },
  ];

  return (
    <div className="flex center justify-between">
      <DocumentSearch
        onFocus={() =>
          setTextAssistenceValue(
            "Documento do Cliente. Ex.: CPF, CNPJ, Passaporte ou CNE."
          )
        }
      />

      {fields.map(({ id, label, value, type, handleChange, onFocus }) => (
        <InputField
          id={id}
          key={id}
          label={label}
          type={type}
          value={value}
          onFocus={onFocus}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};
