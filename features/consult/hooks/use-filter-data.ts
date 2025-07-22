import { create } from "zustand";

export type FieldFilter = "onlyMineValue" | "onlyWithBalanceValue";

interface SetFilterDataProps {
  field: FieldFilter;
  value: string | boolean;
}

interface FilterDataState {
  filterData: {
    onlyMineValue?: boolean;
    onlyWithBalanceValue?: boolean;
  };
  setFilterData: ({ field, value }: SetFilterDataProps) => void;
}

const filterData = {
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
