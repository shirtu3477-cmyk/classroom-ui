import { createStyles } from "../../styles/create-styles";

export const useStyles = () =>
    createStyles({
        menu: {
            padding:20
        },
        link: {
            color: 'black',
            textDecoration: 'none',
            fontSize: 'large',
            padding:10
        }
    });
