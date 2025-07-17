"use client";

import { Button } from "@mfe/cc-front-shared";

import { CheckboxField } from "../components";
import { useOnlyMineStore, useOnlyWithBalanceStore } from "../hooks";
import { ListFilter } from "lucide-react";

interface FieldFourLineProps {
  onFilter: () => void;
}

export const FieldFourLine = ({ onFilter }: FieldFourLineProps) => {
  const { onlyMineValue, setOnlyMineValue } = useOnlyMineStore();
  const { onlyWithBalanceValue, setOnlyWithBalanceValue } =
    useOnlyWithBalanceStore();

  const handleOnlyMineChange = (value: boolean) => setOnlyMineValue(value);
  const handleOnlyWithBalanceChange = (value: boolean) =>
    setOnlyWithBalanceValue(value);

  const fields = [
    {
      id: "onlyMine",
      label: "Somente minhas propostas",
      value: onlyMineValue,
      handleChange: handleOnlyMineChange,
    },
    {
      id: "onlyWithBalance",
      label: "Somente com saldo para liquidar?",
      value: onlyWithBalanceValue,
      handleChange: handleOnlyWithBalanceChange,
    },
  ];

  return (
    <div className="flex items-end justify-between mt-2">
      <div className="flex items-center gap-4 mt-2">
        {fields.map(({ id, label, value, handleChange }) => (
          <CheckboxField
            id={id}
            key={id}
            label={label}
            value={value}
            handleChange={handleChange}
          />
        ))}
      </div>

      <Button
        size="sm"
        type="button"
        className="flex items-center gap-2  min-w-32"
        onClick={onFilter}
      >
        <ListFilter className="size-4" />
        Filtrar
      </Button>
    </div>
  );
};
