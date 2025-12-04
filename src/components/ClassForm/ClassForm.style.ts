import { createStyles } from "../../styles/create-styles";

export const useStyles = () =>
    createStyles({
        comp: {
            margin: '10%',
        },
        form: {
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-evenly',
            height: '27vh',
            width: '100%'
        },
    });
