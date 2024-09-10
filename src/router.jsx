import {createBrowserRouter, Navigate} from "react-router-dom";
import NavigationPage, {restrictUnAthorizedAccess} from "./pages/navigation-page/NavigationPage.jsx";
import LoginPage, {redirectAuthorizedUser} from "./pages/login-page/LoginPage.jsx";
import SignUpPage from "./pages/sign-up-page/SignUpPage.jsx";
import FeedPage from "./pages/navigation-page/feed-page/FeedPage.jsx";

const router = createBrowserRouter([
    {path: '/', element: <NavigationPage/>, children: [
            {index: true, element: <Navigate to={'/feed'}/>},
            {path: 'feed', element: <FeedPage/>}
        ], loader: restrictUnAthorizedAccess},
    {path: '/login', element: <LoginPage/>, loader: redirectAuthorizedUser},
    {path: '/sign-up', element: <SignUpPage/>, loader: redirectAuthorizedUser}

]);

export default router;
