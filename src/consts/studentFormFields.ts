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

export const fields: IStudentFieldKeys[] = [
  { id: "id", label: "ID *" },
  { id: "firstName", label: "First Name *" },
  { id: "lastName", label: "Last Name *" },
  { id: "age", label: "Age" },
  { id: "profession", label: "Profession" },
];
