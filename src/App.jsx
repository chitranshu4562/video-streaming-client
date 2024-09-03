import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    return (
        <>
            <ToastContainer autoClose={2000}/>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
