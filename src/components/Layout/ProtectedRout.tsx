import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { RootState } from "../../app/store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const location = useLocation();

    if (!isLoggedIn && !['/', '/register'].includes(location.pathname))  {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};