import { IStudent } from "../Students/Students.types";

export interface IClassCreate {
  classId: string;
  name: string;
  maxSeats: number;
}

export interface IClass extends IClassCreate {
  students: IStudent[]
}
