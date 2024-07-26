import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

interface IncomesSlice {
  isIncomesFormOpen: boolean;
  showActions: boolean;
  showTypesList: boolean;
}

const initialState: IncomesSlice = {
  isIncomesFormOpen: false,
  showActions: false,
  showTypesList: false,
};

export const IncomeSliceReducer = createSlice({
  name: "incomes",
  initialState,
  reducers: {
    handleIncomesForm: (state, action) => {
      state.isIncomesFormOpen = action.payload;
    },
    handleActions: (state, action) => {
      state.showActions = action.payload;
    },
    handleTypesList: (state, action) => {
      state.showTypesList = action.payload;
    },
  },
});

export const { handleIncomesForm, handleActions, handleTypesList } =
  IncomeSliceReducer.actions;

export const incomesFormStateValue = (state: RootState): boolean => {
  return state.incomesSlice.isIncomesFormOpen;
};

export const showActionsValue = (state: RootState): boolean => {
  return state.incomesSlice.showActions;
};

export const showTypesListValue = (state: RootState): boolean => {
  return state.incomesSlice.showTypesList;
};

export default IncomeSliceReducer.reducer;
