import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { Dispatch, useEffect } from 'react';
import { updateToken } from '../../store/actions/actionCreators';
import AuthenticationService from '../../services/http/AuthenticationService';

export default function ProtectedRoute(props: { children: JSX.Element }) {

    let token: string | null | undefined = useSelector(
        (state: any) => state.tokenReducer.token
    )
    const location = useLocation();
    const tokenLocalStorage = localStorage.getItem("token");
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        if (tokenLocalStorage && !token) {
            //set token to axios common header
            //AuthenticationService.setAuthToken(tokenLocalStorage);
            dispatch(updateToken(tokenLocalStorage));
        }
    }, [token])

    if (!tokenLocalStorage) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return props.children;
};