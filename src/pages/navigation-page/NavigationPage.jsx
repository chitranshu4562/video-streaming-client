import {
    getAuthToken,
    getAuthUserData,
    getExpirationTimeInSeconds,
    removeAuthDataFromLocalStorage
} from "../../utils/authHelper.js";
import {Outlet, redirect, useNavigate} from "react-router-dom";
import {dispatch} from "../../store.js";
import {removeAuthData, storeAuthData} from "../../features/authDataSlice.js";
import {useEffect} from "react";
import NavigationHeader from "../../components/navigation-header/NavigationHeader.jsx";
import UploadVideo from "../../components/upload-video/UploadVideo.jsx";

export default function NavigationPage() {
    const navigate = useNavigate();
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
            <UploadVideo/>
            <div className={`container-fluid w-100`}>
                <Outlet/>
            </div>
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

