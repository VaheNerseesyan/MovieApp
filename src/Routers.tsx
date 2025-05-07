import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LogInPage from "./components/LogInPage/LogInPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import HomePage from "./components/Home/HomePage";
import Favorites from "./components/Favorites/Favorites";
import Account from "./components/Account/Account";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import FilmGrid from "./components/FilmGrid/FilmGrid";
import PageNotFound from "./components/PageNotFound/PageNotFound";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LogInPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/",
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        children: [
            {
                path: "/",
                element: <Navigate to="/page/1" replace />
            },
            {
                path: "/favorites",
                element: <Favorites />,
            },
            {
                path: "/account",
                element: <Account />,
            },
            {
                path: "/movie/:id",
                element: <FilmGrid/>,
            },
            {
                path: "page/:pageid",
                element: <HomePage />,
            },
            {
                path: "search/:title",
                element: <HomePage />,
            },
            {
                path: "*",
                element: <PageNotFound />
            }
        ]
    }
]);

export default router;