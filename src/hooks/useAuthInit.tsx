import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import AppContext from '../contexts/AppContext';
import { initAuth } from '../utils/auth';

export function useAuthInit() {
    const dispatch = useDispatch();
    const services = useContext(AppContext);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            initAuth(token, services, dispatch)
        }

        setReady(true)
    }, []);

    return ready;
}
