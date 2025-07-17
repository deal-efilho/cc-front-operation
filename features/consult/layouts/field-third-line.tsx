"use client";

import { InputField } from "../components";

import {
  useBankIdStore,
  useCertificateStore,
  useCreatedAtFromStore,
  useCreatedAtToStore,
} from "../hooks";

export const FieldThirdLine = () => {
  const { bankIdValue, setBankIdValue } = useBankIdStore();
  const { certificateValue, setCertificateValue } = useCertificateStore();
  const { createdAtFromValue, setCreatedAtFromValue } = useCreatedAtFromStore();
  const { createdAtToValue, setCreatedAtToValue } = useCreatedAtToStore();

  const handleBankIdChange = (value: string) => setBankIdValue(value);
  const handleCertificateChange = (value: string) => setCertificateValue(value);
  const handleCreatedAtFromChange = (value: string) =>
    setCreatedAtFromValue(value);
  const handleCreatedAtToChange = (value: string) => setCreatedAtToValue(value);

  const fields = [
    {
      id: "bankId",
      label: "Identificador banco",
      type: "number",
      value: bankIdValue,
      handleChange: handleBankIdChange,
    },
    {
      id: "certificate",
      label: "Certificado Allianz",
      value: certificateValue,
      handleChange: handleCertificateChange,
    },
    {
      id: "createdAtFrom",
      label: "Criação de:",
      type: "date",
      value: createdAtFromValue,
      handleChange: handleCreatedAtFromChange,
      modifiWidth: 24,
    },
    {
      id: "createdAtTo",
      label: "a:",
      type: "date",
      value: createdAtToValue,
      handleChange: handleCreatedAtToChange,
      modifiWidth: 24,
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
