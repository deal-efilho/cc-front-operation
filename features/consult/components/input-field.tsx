"use client";

import { Input, Label } from "@mfe/cc-front-shared";

interface InputFieldProps {
  value?: string;
  handleChange: (value: string) => void;
  label: string;
  id: string;
  onFocus?: () => void;
  type?: string;
  modifiWidth?: string;
}

export const InputField = ({
  handleChange,
  id,
  label,
  value = '',
  onFocus,
  type,
  modifiWidth = "min-w-64",
}: InputFieldProps) => (
  <div className="space-y-5" onFocus={onFocus && onFocus}>
    <div className="flex items-center space-x-2">
      <Label htmlFor={id}>{label}</Label>
    </div>

    <div className="flex gap-2">
      <Input
        type={type || "text"}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={`flex-1 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${modifiWidth}`}
      />
    </div>
  </div>
);
