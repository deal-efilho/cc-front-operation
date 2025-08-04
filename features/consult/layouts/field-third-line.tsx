"use client";

import { InputField } from "../components";

export const FieldThirdLine = () => {
  const setInitialDate = () => {
    const date = new Date();
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();

    const dataFormatada = `${ano}-${mes}-${dia}`;

    return dataFormatada;
  };

  const fields = [
    {
      id: "bankId",
      label: "Identificador banco",
      type: "number",
    },
    {
      id: "certificate",
      label: "Certificado Allianz",
    },
    {
      id: "createdAtFrom",
      label: "Criação de:",
      type: "date",
      modifiWidth: "min-w-[150px]",
      defaultValue: setInitialDate(),
    },
    {
      id: "createdAtTo",
      label: "a:",
      type: "date",
      modifiWidth: "min-w-[150px]",
      defaultValue: setInitialDate(),
    },
  ];

  return (
   <div className="flex center gap-8">
      {fields.map(({ id, label, type, modifiWidth, defaultValue }) => (
        <InputField
          id={id}
          key={id}
          label={label}
          type={type}
          modifiWidth={modifiWidth}
          defaultValue={defaultValue}
        />
      ))}
    </div>
  );
};
