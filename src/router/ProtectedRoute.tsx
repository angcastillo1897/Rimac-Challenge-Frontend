
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
    element: JSX.Element;
    isAuthenticated: boolean;
}
const ProtectedRoute = ({ element, isAuthenticated }: ProtectedRouteProps) => {
    return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;