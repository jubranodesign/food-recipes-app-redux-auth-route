import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation();
    const token: string | null | undefined = useSelector(
        (state: any) => state.tokenReducer.token
    )

    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};