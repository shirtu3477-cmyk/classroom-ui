import { createStyles } from "../../styles/create-styles";

export const useStyles = () =>
  createStyles({
    students: {
      padding: '10%',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    student: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    name: {
      width: '100%',
    },
  });
