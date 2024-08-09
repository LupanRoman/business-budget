import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

interface ExpensesSlice {
  isExpensesFormOpen: boolean;
  showExpensesTypesList: boolean;
}

const initialState: ExpensesSlice = {
  isExpensesFormOpen: false,
  showExpensesTypesList: false,
};

export const ExpensesSliceReducer = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    handleExpensesForm: (state, action) => {
      state.isExpensesFormOpen = action.payload;
    },
    handleTypesList: (state, action) => {
      state.showExpensesTypesList = action.payload;
    },
  },
});

export const { handleExpensesForm, handleTypesList } =
  ExpensesSliceReducer.actions;

export const expensesFormStateValue = (state: RootState): boolean => {
  return state.expensesSlice.isExpensesFormOpen;
};

export const expensesTypesStateValue = (state: RootState): boolean => {
  return state.expensesSlice.showExpensesTypesList;
};

export default ExpensesSliceReducer.reducer;
