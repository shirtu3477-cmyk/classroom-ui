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

export interface IStudentDataColumn {
  kind: "data";
  key: keyof IStudent;
  title: string;
}

export interface IStudenActionColumn {
  kind: "action";

  key: string;
  title: string;
  cellRender: (row: IStudent) => React.ReactElement;
}

export interface IStudentFormvalues {
  id: string;
  firstName: string;
  lastName: string;
  age: number | null;
  profession: string;
}

type FormKeys = keyof IStudentFormvalues;

export interface IStudentFieldKeys {
  id: FormKeys;
  label: string;
}
