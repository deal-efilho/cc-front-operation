"use client";

import { useEffect } from "react";
import { create } from "zustand";

import { Input, Label } from "@mfe/cc-front-shared";

interface InputFieldProps {
  label: string;
  id: string;
  onFocus?: () => void;
  type?: string;
  modifiWidth?: string;
  defaultValue?: string;
}

interface SetInputValueProps {
  name: string;
  value: string;
}

type InputValues = {
  [key: string]: string;
};

interface UseInputState {
  inputValues: InputValues;
  setInputValue: ({ name, value }: SetInputValueProps) => void;
  cleanInputValues: () => void;
}

export const useInputStore = create<UseInputState>((set, get) => ({
  inputValues: {},
  setInputValue: ({ name, value }) => {
    const stateInputValues = get().inputValues;
    set({
      inputValues: {
        ...stateInputValues,
        [name]: value,
      },
    });
  },
  cleanInputValues: () => set({ inputValues: {} }),
}));

export const InputField = ({
  id,
  label,
  onFocus,
  type,
  defaultValue,
  modifiWidth = "min-w-64",
}: InputFieldProps) => {
  const { inputValues, setInputValue } = useInputStore();

  useEffect(() => {
    if (id && defaultValue) setInputValue({ name: id, value: defaultValue });
    else setInputValue({ name: id, value: "" });
  }, [id, defaultValue, setInputValue]);

  return (
    <div className="space-y-5" onFocus={onFocus && onFocus}>
      <div className="flex items-center space-x-2">
        <Label htmlFor={id}>{label}</Label>
      </div>

      <div className="flex gap-2">
        <Input
          type={type || "text"}
          id={id}
          value={inputValues?.[id] || ""}
          onChange={(e) => setInputValue({ name: id, value: e.target.value })}
          className={`flex-1 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${modifiWidth}`}
        />
      </div>
    </div>
  );
};
