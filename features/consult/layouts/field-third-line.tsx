"use client";

import { InputField } from "../components";

import { useFilterDataStateStore, type FieldFilter } from "../hooks";

export const FieldThirdLine = () => {
  const { filterData, setFilterData } = useFilterDataStateStore();

  const handleFilterDataChange = (value: string, field: FieldFilter) =>
    setFilterData({ field, value });

  const fields = [
    {
      id: "bankId",
      label: "Identificador banco",
      type: "number",
      value: filterData.bankIdValue,
      handleChange: (value: string) =>
        handleFilterDataChange(value, "bankIdValue"),
    },
    {
      id: "certificate",
      label: "Certificado Allianz",
      value: filterData.certificateValue,
      handleChange: (value: string) =>
        handleFilterDataChange(value, "certificateValue"),
    },
    {
      id: "createdAtFrom",
      label: "Criação de:",
      type: "date",
      value: filterData.createdAtFromValue,
      handleChange: (value: string) =>
        handleFilterDataChange(value, "createdAtFromValue"),
      modifiWidth: "min-w-24",
    },
    {
      id: "createdAtTo",
      label: "a:",
      type: "date",
      value: filterData.createdAtToValue,
      handleChange: (value: string) =>
        handleFilterDataChange(value, "createdAtToValue"),
      modifiWidth: "min-w-24",
    },
  ];

  return (
    <div className="flex center justify-between">
      {fields.map(({ id, label, value, type, handleChange, modifiWidth }) => (
        <InputField
          id={id}
          key={id}
          label={label}
          type={type}
          value={value}
          handleChange={handleChange}
          modifiWidth={modifiWidth}
        />
      ))}
    </div>
  );
};
