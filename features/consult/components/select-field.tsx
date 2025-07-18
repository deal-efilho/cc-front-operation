"use client";

import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mfe/cc-front-shared";

type Options = {
  value: string;
  label: string;
};

interface SelectFieldProps {
  value: string;
  handleChange: (value: string) => void;
  id: string;
  label: string;
  options?: Options[];
  placeholder?: string;
  modifiWidth?: string;
}

export const SelectField = ({
  handleChange,
  options,
  value,
  id,
  label,
  placeholder,
  modifiWidth = "min-w-64",
}: SelectFieldProps) => (
  <div className={`space-y-2`}>
    <Label htmlFor={id} className="text-sm">
      {label}
    </Label>
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className={`h-8 ${modifiWidth}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options &&
          options.map((op) => (
            <SelectItem key={op.value} value={op.value}>
              {op.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  </div>
);
