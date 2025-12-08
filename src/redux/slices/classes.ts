import { createSlice } from "@reduxjs/toolkit";
import { IStudent } from "../../pages/Students/Students.types";

export interface IClass {
  classId: number;
  name: string;
  maxSeats: number;
  students: IStudent[];
}

const initialState: IClass[] = [];

export const classesSlice = createSlice({
  name: "classes",
  initialState,
  selectors: {
    selectClassById(state, classId) {
      return state.find((clas) => clas.classId === classId);
    },
    selectVacantClasses(state){
      return state.filter(clas=> clas.maxSeats > clas.students.length)
    }
  },
  reducers: {
    addClass(state, action) {
      state.push(action.payload);
    },

    removeClass(state, action) {
      state = state.filter((clas) => clas.classId !== action.payload);
      return state;
    },

    setClasses(_state, action) {
      return action.payload;
    },

    addStudent(state, action) {
      state.forEach((clas) => {
        if (clas.classId === action.payload.classId) {
          clas.students.push(action.payload.student);
        }
      });

      return state;
    },

    removeStudent(state, action) {
      state.forEach((clas) => {
        if (clas.classId === action.payload.classId) {
          clas.students = clas.students.filter(
            (student) => student.id !== action.payload.studentId
          );
        }
      });

      return state;
    },
  },
});

export const { addClass, removeClass, setClasses, addStudent, removeStudent } =
  classesSlice.actions;
export const { selectClassById, selectVacantClasses } = classesSlice.selectors;
export default classesSlice.reducer;
