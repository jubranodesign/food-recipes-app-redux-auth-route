import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
    const location = useLocation();
    const token: string | null | undefined = useSelector(
        (state: any) => state.tokenReducer.token
    )

    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};