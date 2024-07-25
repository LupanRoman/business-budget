import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

interface IncomesSlice {
  isIncomesFormOpen: boolean;
  showActions: boolean;
}

const initialState: IncomesSlice = {
  isIncomesFormOpen: false,
  showActions: false,
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
  },
});

export const { handleIncomesForm, handleActions } = IncomeSliceReducer.actions;

export const incomesFormStateValue = (state: RootState): boolean => {
  return state.incomesSlice.isIncomesFormOpen;
};

export const showActionsValue = (state: RootState): boolean => {
  return state.incomesSlice.showActions;
};

export default IncomeSliceReducer.reducer;
