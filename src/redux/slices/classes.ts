import { createSlice } from "@reduxjs/toolkit";

export interface IClass {
  classId: number;
  name: string;
  maxSeats: number;
}

export type ClassesState = IClass[]

const initialState: IClass[] = [];

export const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    addClass(state, action) {
      state.push(action.payload);
    },

    removeClass(state, action) {
      state = state.filter(
        (clas) => clas.classId !== action.payload
      );
      return state;
    },

    setClasses(state, action) {
      return action.payload;
    },
  },
});

export const { addClass, removeClass, setClasses } = classesSlice.actions;
export default classesSlice.reducer;
