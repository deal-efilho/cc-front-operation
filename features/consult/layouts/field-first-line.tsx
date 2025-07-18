"use client";

import { DocumentSearch, InputField } from "../components";
import {
  useFilterDataStateStore,
  usetextAssistenceStore,
  type FieldFilter,
} from "../hooks";

export const FieldFirstLine = () => {
  const { setTextAssistenceValue } = usetextAssistenceStore();
  const { filterData, setFilterData } = useFilterDataStateStore();

  const handleFilterDataChange = (value: string, field: FieldFilter) =>
    setFilterData({ field, value });

  const fields = [
    {
      id: "number",
      label: "Número",
      type: "number",
      value: filterData.numberValue,
      onFocus: () =>
        setTextAssistenceValue("Número de identificação da proposta"),
      handleChange: (value: string) =>
        handleFilterDataChange(value, "numberValue"),
    },
    {
      id: "clientName",
      label: "Nome do cliente",
      value: filterData.clientNameValue,
      onFocus: () => setTextAssistenceValue("Nome do Cliente"),
      handleChange: (value: string) =>
        handleFilterDataChange(value, "clientNameValue"),
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
