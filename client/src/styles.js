import colors from "./colors.js";
import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        color: colors.VoidBlack,
    },
    image: {
        marginLeft: '15px',
    },
}))