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

export const fields: IClassFieldKeys[] = [
  { id: "classId", label: "Class ID *" },
  { id: "name", label: "Name *" },
  { id: "maxSeats", label: "Max Seats *" },
];
