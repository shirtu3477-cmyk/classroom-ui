import { IStudent } from "../pages/Students/Students.types";

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

export const studentTableData: IStudentDataColumn[] = [
  {
      kind: "data",
      title: "ID",
      key: "id",
    },
    {
      kind: "data",
      title: "First Name",
      key: "firstName",
    },
    {
      kind: "data",
      title: "Last Name",
      key: "lastName",
    },
    {
      kind: "data",
      title: "Age",
      key: "age",
    },
    {
      kind: "data",
      title: "Profession",
      key: "profession",
    },
]