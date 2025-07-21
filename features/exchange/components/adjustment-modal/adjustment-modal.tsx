"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
} from "@mfe/cc-front-shared";
import { BaseModal } from "@/components/ui/base-modal";
import { CheckIcon, InfoIcon, XIcon } from "lucide-react";
import { CheckboxField } from "@/components/ui/checkbox-field";

interface AdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (adjustmentData: AdjustmentData) => void;
  initialValue?: number;
}

export interface AdjustmentData {
  adjustBy: "taxa" | "quantidade";
  liquidValue: number;
  options: {
    cedulas200_500_1000: boolean;
    caraGrandeBrancaPequena: boolean;
    foraCirculacao: boolean;
    manchadasRiscadas: boolean;
  };
  discountApplied?: number;
}

export function AdjustmentModal({
  isOpen,
  onClose,
  onConfirm,
  initialValue = 493.51,
}: AdjustmentModalProps) {
  const [adjustBy, setAdjustBy] = useState<"taxa" | "quantidade">("taxa");
  const [liquidValue, setLiquidValue] = useState(initialValue);
  const [options, setOptions] = useState({
    cedulas200_500_1000: false,
    caraGrandeBrancaPequena: false,
    foraCirculacao: false,
    manchadasRiscadas: false,
  });

  const handleOptionChange = (
    optionKey: keyof typeof options,
    checked: boolean
  ) => {
    const newOptions = { ...options, [optionKey]: checked };
    setOptions(newOptions);

    // Calcular desconto quando alguma opção é selecionada
    if (checked && optionKey === "cedulas200_500_1000") {
      // Aplicar desconto de 12% quando cédulas de 200, 500 e/ou 1000 são selecionadas
      const discount = liquidValue * 0.12;
      setLiquidValue(liquidValue - discount);
    }
  };

  const handleConfirm = () => {
    const adjustmentData: AdjustmentData = {
      adjustBy,
      liquidValue,
      options,
      discountApplied: options.cedulas200_500_1000 ? 12 : undefined,
    };
    onConfirm(adjustmentData);
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setAdjustBy("taxa");
    setLiquidValue(initialValue);
    setOptions({
      cedulas200_500_1000: false,
      caraGrandeBrancaPequena: false,
      foraCirculacao: false,
      manchadasRiscadas: false,
    });
    onClose();
  };

  const formatCurrency = (value: number) => {
    return value.toFixed(2).replace(".", ",");
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Ajuste Pelo Líquido"
      description="Ajuste o valor líquido por taxa ou quantidade"
      size="md"
      showIcon
      icon={<InfoIcon className="size-3 text-white" />}
    >
      <div className="px-6 pt-4 pb-6 space-y-4">
        {/* Tipo de ajuste */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Ajustar:</Label>
          <RadioGroup
            value={adjustBy}
            onValueChange={(value) =>
              setAdjustBy(value as "taxa" | "quantidade")
            }
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="taxa" id="taxa" />
              <Label htmlFor="taxa" className="text-sm">
                Taxa
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="quantidade" id="quantidade" />
              <Label htmlFor="quantidade" className="text-sm">
                Quantidade
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Valor líquido */}
        <div className="space-y-2">
          <Label htmlFor="valorLiquido" className="text-sm font-medium">
            Valor líquido: <span className="text-red-500">*</span>
          </Label>
          <Input
            id="valorLiquido"
            type="text"
            value={formatCurrency(liquidValue)}
            onChange={(e) => {
              const value = e.target.value.replace(",", ".");
              const numValue = parseFloat(value) || 0;
              setLiquidValue(numValue);
            }}
            className="w-32"
          />
        </div>

        {/* Opções de desconto */}
        <div className="space-y-3">
          <div className="space-y-2">
            <CheckboxField
              id="cedulas200"
              checked={options.cedulas200_500_1000}
              onCheckedChange={(checked) =>
                handleOptionChange("cedulas200_500_1000", checked as boolean)
              }
              label="Cédulas de 200, 500 e/ou 1000"
            />

            <CheckboxField
              id="caraGrande"
              checked={options.caraGrandeBrancaPequena}
              label="Cara grande, branca e/ou pequena"
              onCheckedChange={(checked) =>
                handleOptionChange(
                  "caraGrandeBrancaPequena",
                  checked as boolean
                )
              }
            />

            <CheckboxField
              id="foraCirculacao"
              checked={options.foraCirculacao}
              onCheckedChange={(checked) =>
                handleOptionChange("foraCirculacao", checked as boolean)
              }
              label="Fora de circulação"
            />

            <CheckboxField
              id="manchadas"
              checked={options.manchadasRiscadas}
              onCheckedChange={(checked) =>
                handleOptionChange("manchadasRiscadas", checked as boolean)
              }
              label="Manchadas, riscadas ou com pequenos rasgos"
            />
          </div>

          {/* Mostrar desconto aplicado */}
          {(options.cedulas200_500_1000 || options.caraGrandeBrancaPequena) && (
            <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
              Diságio aplicado: 12,00%
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <XIcon className="size-4" />
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex items-center gap-2"
            variant="primary"
          >
            <CheckIcon className="size-4" />
            Confirmar
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}
