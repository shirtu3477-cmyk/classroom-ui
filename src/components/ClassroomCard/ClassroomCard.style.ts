import { createStyles } from "../../styles/create-styles";

export const useStyles = () =>
  createStyles({
    card: {
      width: 200,
      height: 200,
      margin:20
    },
    content: {
      paddingTop: 1,
      paddingBottom: 25,
    },
  });
