export interface IStudentCreate {
  id: string ;
  firstName: string;
  lastName: string;
  age: number | null;
  profession: string;
}

export interface IStudent extends IStudentCreate {
  classId: number;
}
