import { createBrowserRouter, NavLink } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LogInPage from "./components/LogInPage/LogInPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import HomePage from "./components/Home/HomePage";
import Favorites from "./components/Favorites/Favorites";
import Account from "./components/Account/Account";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LogInPage />,
    },
    {
        path: "/registerPage",
        element: <RegisterPage />,
    },
    {
        path: "/",
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        children: [
            {
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "/favorites",
                element: <Favorites />,
            },
            {
                path: "/account",
                element: <Account />,
            }
        ]
    },
    {
        path: "*",
        element: <NavLink to="/"><LogInPage/></NavLink>
    }
]);

export default router;