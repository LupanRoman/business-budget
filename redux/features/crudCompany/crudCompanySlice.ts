import { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';

interface CrudCompanySliceInitial {
  isModalOpen: boolean;
}

const initialState: CrudCompanySliceInitial = {
  isModalOpen: false,
};

export const CrudCompanySlice = createSlice({
  name: 'Company',
  initialState,
  reducers: {
    handleModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { handleModal } = CrudCompanySlice.actions;

export const isModalOpenValue = (state: RootState): boolean => {
  return state.crudCompanySlice.isModalOpen;
};

export default CrudCompanySlice.reducer;
