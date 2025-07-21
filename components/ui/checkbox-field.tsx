"use client";

import { Checkbox as CheckboxUi } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange: (value: boolean) => void;
  label: string;
  id: string;
  disabled?: boolean;
}

export const CheckboxField = ({
  onCheckedChange,
  id,
  label,
  checked = false,
  disabled = false,
}: CheckboxProps) => (
  <div className="flex items-center gap-2">
    <CheckboxUi
      className="[--primary:var(--color-black-500)] [--ring:var(--color-black-300)] in-[.dark]:[--primary:var(--color-black-500)] in-[.dark]:[--ring:var(--color-black-900)]"
      id={id}
      disabled={disabled}
      checked={checked}
      onCheckedChange={onCheckedChange}
    />
    <Label htmlFor={id}>{label}</Label>
  </div>
);
