import { createStyles } from "../../styles/create-styles";

export const useStyles = () =>
  createStyles({
    classes: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    clas: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: '11vw'
    }
  });
