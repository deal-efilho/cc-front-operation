"use client";

import { ListFilter } from "lucide-react";

import { Button } from "@mfe/cc-front-shared";

import { CheckboxField } from "@/components/ui/checkbox-field";

import { useFilterDataStateStore, type FieldFilter } from "../hooks";

interface FieldFourLineProps {
  onFilter: () => void;
}

export const FieldFourLine = ({ onFilter }: FieldFourLineProps) => {
  const { filterData, setFilterData } = useFilterDataStateStore();

  const handleFilterDataChange = (value: boolean, field: FieldFilter) =>
    setFilterData({ field, value });

  const fields = [
    {
      id: "onlyMine",
      label: "Somente minhas propostas",
      value: filterData.onlyMineValue,
      handleChange: (value: boolean) =>
        handleFilterDataChange(value, "onlyMineValue"),
    },
    {
      id: "onlyWithBalance",
      label: "Somente com saldo para liquidar?",
      value: filterData.onlyWithBalanceValue,
      handleChange: (value: boolean) =>
        handleFilterDataChange(value, "onlyWithBalanceValue"),
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
            checked={value}
            onCheckedChange={handleChange}
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
