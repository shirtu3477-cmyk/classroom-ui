import { configureStore } from "@reduxjs/toolkit";
import { classesSlice } from "./redux/slices/classes";

export const store = configureStore({
  reducer: {
    classes: classesSlice.reducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
