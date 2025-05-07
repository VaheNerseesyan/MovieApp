// import { Navigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../app/store';
// import { hasTokens } from '../../utils/tokenManager';

// interface ProtectedRouteProps {
//     children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//     const location = useLocation();
//     const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn);
//     const hasValidTokens = hasTokens();

//     if (!isAuthenticated && !hasValidTokens) {
//         // Redirect to login page but save the attempted url
//         return <Navigate to="/" state={{ from: location }} replace />;
//     }

//     return <>{children}</>;
// };

// export default ProtectedRoute;