import { createStyles } from "../../styles/create-styles";

export const useStyles = () =>
  createStyles({
    card: {
      width: "11%",
      height: "50%",
      margin: "1%",
    },
    content: {
      paddingTop: "1%",
    },
    btn: {
      color: "black",
    },
    seatsDeatils: {
      color: "gray",
      display: "flex",
    },
    seats: {
      marginLeft: "2%",
      marginRight: "2%",
      fontWeight: 700,
    },
    header: {
      fontWeight: 700,
    },
  });
