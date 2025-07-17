"use client";

import { Checkbox, Label } from "@mfe/cc-front-shared";

interface CheckboxProps {
  value: boolean;
  handleChange: (value: boolean) => void;
  label: string;
  id: string;
}

export const CheckboxField = ({
  handleChange,
  id,
  label,
  value,
}: CheckboxProps) => (
  <div className="flex items-center gap-2">
    <Checkbox id={id} checked={value || false} onCheckedChange={handleChange} />
    <Label htmlFor={id}>{label}</Label>
  </div>
);
