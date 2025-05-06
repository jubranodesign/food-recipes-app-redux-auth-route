import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import AppContext from '../contexts/AppContext';
import { initAuth } from '../utils/auth';
import { getToken } from '../utils/tokenStorage';

export function useAuthInit() {
    const dispatch = useDispatch();
    const services = useContext(AppContext);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = getToken()

        if (token) {
            initAuth(token, dispatch, services)
        }

        setReady(true)
    }, []);

    return ready;
}
