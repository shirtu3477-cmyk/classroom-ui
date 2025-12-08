import { IStudent } from "../Students/Students.types";

export interface IClassCreate {
  classId: string;
  name: string;
  maxSeats: number | null;
}

export interface IClass extends IClassCreate {
  students: IStudent[]
}
