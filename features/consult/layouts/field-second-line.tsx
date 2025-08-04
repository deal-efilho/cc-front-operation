"use client";

import { SelectField, ComboboxField } from "../components";

import {
  useStatusStore,
  useStoreTaxStore,
  useStoreCreateStore,
  useManualContractStore,
} from "../hooks";

export const FieldSecondLine = () => {
  const { statusValue, setStatusValue, statusOptions } = useStatusStore();
  const { storeTaxValue, setStoreTaxValue, storeTaxOptions } =
    useStoreTaxStore();
  const { storeCreateValue, setStoreCreateValue, storeCreateOptions } =
    useStoreCreateStore();
  const { manualContractValue, setManualContractValue, manualContractOptions } =
    useManualContractStore();

  const handleStatusChange = (value: string) => setStatusValue(value);

  const handleStoreTaxChange = (value: string) => setStoreTaxValue(value);

  const handleStoreCreateChange = (value: string) => setStoreCreateValue(value);

  const handleManualContractChange = (value: string) =>
    setManualContractValue(value);

  const fields = [
    {
      id: "status",
      label: "Status",
      placeholder: "Selecione o status",
      options: statusOptions,
      value: statusValue,
      handleChange: handleStatusChange,
    },
    {
      type: "combobox",
      id: "storeTax",
      label: "Loja da taxa",
      placeholder: "Selecione a Loja",
      options: storeTaxOptions,
      value: storeTaxValue,
      handleChange: handleStoreTaxChange,
    },
    {
      type: "combobox",
      id: "storeCreate",
      label: "Loja de criação",
      placeholder: "Selecione a Loja",
      options: storeCreateOptions,
      value: storeCreateValue,
      handleChange: handleStoreCreateChange,
    },
    {
      id: "manualContract",
      label: "Contrato manual",
      options: manualContractOptions,
      value: manualContractValue,
      handleChange: handleManualContractChange,
      modifiWidth: "min-w-24",
    },
  ];

  return (
   <div className="flex center gap-8">
      {fields.map(
        ({
          id,
          type,
          label,
          placeholder,
          options,
          value,
          handleChange,
          modifiWidth,
        }) =>
          type !== "combobox" ? (
            <SelectField
              id={id}
              key={id}
              label={label}
              placeholder={placeholder}
              options={options}
              value={value as string}
              handleChange={handleChange}
              modifiWidth={modifiWidth}
            />
          ) : (
            <ComboboxField
              id={id}
              key={id}
              label={label}
              placeholder={placeholder}
              options={options}
              value={value as string}
              handleChange={handleChange}
              modifiWidth={modifiWidth}
            />
          )
      )}
    </div>
  );
};
