import { createStyles } from "../../styles/create-styles";

export const useStyles = () =>
    createStyles({
        comp: {
            margin: 150,
        },
        form: {
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-evenly',
            height:450,
            width: 250
        },
    });
