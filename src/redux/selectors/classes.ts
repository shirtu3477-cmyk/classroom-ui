import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { IClass } from "../slices/classes";
import { createSelector } from "@reduxjs/toolkit";

export const useClassesSelector = useSelector.withTypes<RootState>();

export const selectOpenClasses = createSelector(
  (state) => state.classes,
  (classes: IClass[]) =>
    classes.filter((clas: IClass) => clas.maxSeats > clas.students.length)
);
