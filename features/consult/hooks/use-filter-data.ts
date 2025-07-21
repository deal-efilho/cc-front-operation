import { create } from "zustand";

export type FieldFilter =
  | "bankIdValue"
  | "certificateValue"
  | "clientNameValue"
  | "createdAtFromValue"
  | "createdAtToValue"
  | "numberValue"
  | "onlyMineValue"
  | "onlyWithBalanceValue";

interface SetFilterDataProps {
  field: FieldFilter;
  value: string | boolean;
}

interface FilterDataState {
  filterData: {
    bankIdValue?: string;
    certificateValue?: string;
    clientNameValue?: string;
    createdAtFromValue?: string;
    createdAtToValue?: string;
    numberValue?: string;
    onlyMineValue?: boolean;
    onlyWithBalanceValue?: boolean;
  };
  setFilterData: ({ field, value }: SetFilterDataProps) => void;
}

const setInitialDate = () => {
  const date = new Date();
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();

  const dataFormatada = `${ano}-${mes}-${dia}`;

  return dataFormatada;
};

const filterData = {
  bankIdValue: "",
  certificateValue: "",
  clientNameValue: "",
  createdAtFromValue: setInitialDate(),
  createdAtToValue: setInitialDate(),
  numberValue: "",
  onlyMineValue: true,
  onlyWithBalanceValue: true,
};

export const useFilterDataStateStore = create<FilterDataState>((set, get) => ({
  filterData,
  setFilterData: ({ field, value }: SetFilterDataProps) => {
    const currentFilterData = get().filterData;
    set({
      filterData: {
        ...currentFilterData,
        [field]: value,
      },
    });
  },
}));
