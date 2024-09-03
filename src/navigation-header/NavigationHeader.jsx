import {Button} from "@mui/material";
import classes from "./NavigationHeader.module.css";

export default function NavigationHeader({onLogout}) {

    return (
        <>
            <div className={classes.navigationBar}>
                <h3>Home</h3>
                <Button
                    variant="contained"
                    onClick={() => onLogout()}
                    type="button"
                >Logout</Button>
            </div>
        </>
    )
}
