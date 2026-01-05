import { IStudent } from "../Students/Students.types";

export interface IClassCreate {
  classId: string;
  name: string;
  maxSeats: number | null;
}

export interface IClass extends IClassCreate {
  students: IStudent[]
}

export interface IClassFormvalues {
  classId: string;
  name: string;
  maxSeats: number | null;
}

type FormKeys = keyof IClassFormvalues;

export interface IClassFieldKeys {
  id: FormKeys;
  label: string;
}