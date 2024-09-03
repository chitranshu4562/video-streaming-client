import {createBrowserRouter} from "react-router-dom";
import NavigationPage, {restrictUnAthorizedAccess} from "./pages/navigation-page/NavigationPage.jsx";
import LoginPage, {redirectAuthorizedUser} from "./pages/login-page/LoginPage.jsx";
import SignUpPage from "./pages/sign-up-page/SignUpPage.jsx";

const router = createBrowserRouter([
    {path: '/', element: <NavigationPage/>, loader: restrictUnAthorizedAccess},
    {path: '/login', element: <LoginPage/>, loader: redirectAuthorizedUser},
    {path: '/sign-up', element: <SignUpPage/>, loader: redirectAuthorizedUser}

]);

export default router;
