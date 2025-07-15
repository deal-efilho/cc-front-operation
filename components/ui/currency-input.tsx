"use client"

import React, { forwardRef } from "react";
import { Input } from "@mfe/cc-front-shared";
import { cn } from "@/lib/utils";

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: number;
  onChange?: (value: number) => void;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value = 0, onChange, className, ...props }, ref) => {

    const formatToBRL = (num: number) => {
      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(num);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;

      // Remove tudo que não é número
      let numbers = inputValue.replace(/\D/g, '');

      // Se não tem números, valor é 0
      if (!numbers) {
        onChange?.(0);
        return;
      }

      // Converte para número dividindo por 100 (para centavos)
      const numericValue = parseInt(numbers) / 100;
      onChange?.(numericValue);
    };

    return (
      <Input
        ref={ref}
        {...props}
        value={formatToBRL(value)}
        onChange={handleChange}
        className={className}
        placeholder="0,00"
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };