import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import crudCompanyReducer from "@/redux/features/crudCompany/crudCompanySlice";
import incomesStateReducer from "@/redux/features/incomes/incomesSlice";

export const store = configureStore({
  reducer: {
    crudCompanySlice: crudCompanyReducer,
    incomesSlice: incomesStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
