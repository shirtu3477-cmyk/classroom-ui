import { createStyles } from "../../styles/create-styles";

export const useStyles = () =>
  createStyles({
    students: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    student: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "11vw",
    }
  });
