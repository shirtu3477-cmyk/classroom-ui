import { createStyles } from "../../styles/create-styles";

export const useStyles = () =>
  createStyles({
    classes: {
      padding: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    clas: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: 180
    },
    name: {
        width:30
    }
  });
