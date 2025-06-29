import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LogInPage from "./components/LogInPage/LogInPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import HomePage from "./components/Home/HomePage";
import Favorites from "./components/Favorites/Favorites";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import FilmGrid from "./components/FilmGrid/FilmGrid";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import SearchedMovies from "./components/SearchedMovies/SearchedMovies";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LogInPage />,
        errorElement: <ErrorBoundary />
    },
    {
        path: "/register",
        element: <RegisterPage />,
        errorElement: <ErrorBoundary />
    },
    {
        path: "/",
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        errorElement: <ErrorBoundary />,
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
                path: "/movie/:id",
                element: <FilmGrid/>,
            },
            {
                path: "page/:pageid",
                element: <HomePage />,
            },
            {
                path: "search/:title/page/:pageid",
                element: <SearchedMovies />,
            },
            {
                path: "*",
                element: <PageNotFound />
            }
        ]
    }
]);

export default router;