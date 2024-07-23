import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

interface CrudCompanySliceInitial {
  isModalOpen: boolean;
  handleSettings: boolean;
}

const initialState: CrudCompanySliceInitial = {
  isModalOpen: false,
  handleSettings: false,
};

export const CrudCompanySlice = createSlice({
  name: "Company",
  initialState,
  reducers: {
    handleModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
    handleSettings: (state, action) => {
      state.handleSettings = action.payload;
    },
  },
});

export const { handleModal, handleSettings } = CrudCompanySlice.actions;

export const isModalOpenValue = (state: RootState): boolean => {
  return state.crudCompanySlice.isModalOpen;
};

export const handleSettingsValue = (state: RootState): boolean => {
  return state.crudCompanySlice.handleSettings;
};

export default CrudCompanySlice.reducer;
