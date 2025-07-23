"use client";

import { Input, Label, RadioGroup, RadioGroupItem } from "@mfe/cc-front-shared";

import {
  useDocumentStore,
  applyCPFMask,
  applyCNPJMask,
} from "../hooks";

type DocumentSearchProps = {
  onFocus: () => void;
};

export const DocumentSearch = ({ onFocus }: DocumentSearchProps) => {
  const { selectedType, documentValue, setSelectedType, setDocumentValue } =
    useDocumentStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let maskedValue = value;

    if (selectedType === "CPF") {
      maskedValue = applyCPFMask(value);
    } else if (selectedType === "CNPJ") {
      maskedValue = applyCNPJMask(value);
    }

    setDocumentValue(maskedValue);
  };

  const getPlaceholder = () => {
    switch (selectedType) {
      case "CPF":
        return "000.000.000-00";
      case "CNPJ":
        return "00.000.000/0000-00";
      default:
        return `Digite o ${selectedType}`;
    }
  };

  return (
    <div className="space-y-4" onFocus={onFocus}>
      <RadioGroup
        value={selectedType}
        onValueChange={setSelectedType}
        className="flex gap-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="CPF" id="cpf" />
          <Label htmlFor="cpf">CPF</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="PASSAPORTE" id="passaporte" />
          <Label htmlFor="passaporte">Passaporte/CNE/Identidade</Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="CNPJ" id="cnpj" />
          <Label htmlFor="cnpj">CNPJ</Label>
        </div>
      </RadioGroup>

      <div className="flex gap-2">
        <Input
          type="text"
          value={documentValue}
          onChange={handleInputChange}
          placeholder={getPlaceholder()}
          className="flex-1 min-w-60"
        />
      </div>
    </div>
  );
};
