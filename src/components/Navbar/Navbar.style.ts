import { createStyles } from "../../styles/create-styles";

export const useStyles = () =>
  createStyles({
    menuButton: {
      height: 90,
      display: "flex",
      alignItems: "center",
    },
    item: {
      marginLeft: 20,
    },
  });
