import {Button} from "@mui/material";
import classes from "./NavigationHeader.module.css";
import {useSelector} from "react-redux";

export default function NavigationHeader({onLogout}) {
    const currentUser = useSelector(state => state.authData.user);

    return (
        <>
            {currentUser && (
                <div className={`shadow ${classes.navigationBar}`}>
                    <h3>Home</h3>
                    <h6>{currentUser.name}</h6>
                    <Button
                        variant="contained"
                        onClick={() => onLogout()}
                        type="button"
                    >Logout</Button>
                </div>
            )}
        </>
    )
}
