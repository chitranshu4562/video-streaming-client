import {
    getAuthToken,
    getAuthUserData,
    getExpirationTimeInSeconds,
    removeAuthDataFromLocalStorage
} from "../../utils/authHelper.js";
import {redirect, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {dispatch} from "../../store.js";
import {removeAuthData, storeAuthData} from "../../features/authDataSlice.js";
import {useEffect} from "react";
import NavigationHeader from "../../navigation-header/NavigationHeader.jsx";

export default function NavigationPage() {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.authData.user);
    const handleLogout = () => {
        removeAuthDataFromLocalStorage();
        dispatch(removeAuthData());
        navigate('/login');
    }

    useEffect(() => {
        const token = getAuthToken();
        const authUser = getAuthUserData();
        dispatch(storeAuthData({ authToken: token, user: authUser }));
        if (!token) {
            return;
        }

        const expTime = getExpirationTimeInSeconds();
        if (expTime < 0) {
            handleLogout();
        } else {
            setTimeout(() => {
                handleLogout();
            }, expTime * 1000);
        }
    }, []);

    return (
        <>
            <NavigationHeader
                onLogout={handleLogout}
            />
        </>
    )
}

export const restrictUnAthorizedAccess = () => {
    const token = getAuthToken();
    if (!token) {
        return redirect('/login');
    }
    return null;
}

