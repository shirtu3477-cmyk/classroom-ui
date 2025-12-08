import { createStyles } from "../../styles/create-styles";

export const useStyles = () =>
  createStyles({
    formBox: {
      margin: "10%",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      height: '40vh',
      width: '100%',
    },
  });
