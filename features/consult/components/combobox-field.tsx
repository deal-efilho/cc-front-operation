"use client";

import { Label } from "@mfe/cc-front-shared";

import { Combobox } from "@/components/combobox";

type Options = {
  value: string;
  label: string;
};

interface ComboboxFieldProps {
  value: string;
  handleChange: (value: string) => void;
  id: string;
  label: string;
  options: Options[];
  placeholder?: string;
  modifiWidth?: string;
}

export const ComboboxField = ({
  handleChange,
  options,
  value,
  placeholder,
  modifiWidth = "min-w-64",
  id,
  label,
}: ComboboxFieldProps) => (
  <div className={`space-y-3 flex flex-col`}>
    <Label htmlFor={id} className="text-sm">
      {label}
    </Label>
    <Combobox {...{ handleChange, options, value, placeholder, modifiWidth }} />
  </div>
);
