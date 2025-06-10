import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '../../store/types/rootState';

export default function ProtectedRoute() {
    const location = useLocation();
    const token: string | null | undefined = useSelector(
        (state: RootState) => state.tokenReducer.token
    )

    if (!token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};