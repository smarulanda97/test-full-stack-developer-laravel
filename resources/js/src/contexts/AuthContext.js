import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import * as authApi from '../services/auth';
import { removePersistedAccessToken, removePersistedUser } from "../utils/persistance";
import { getPersistedAccessToken, getPersistedUser, persistAccessToken, persistUser } from "../utils/persistance";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

    const [user, setUser] = useState(() => getPersistedUser());
    const [accessToken, setAccessToken] = useState(() => getPersistedAccessToken());

    useEffect(() => {
        if (user && accessToken) {
            setUserIsLoggedIn(true);
        } else {
            setUserIsLoggedIn(false);
        }
    }, [user, accessToken])

    useEffect(() => {
        if (error)
            setError(null);
    }, [location.pathname])

    const handleLogin = async (e, credentials = {}) => {
        e.preventDefault();

        setLoading(true);
        try {
            const { data: { user, access_token } } = await authApi.loginService(credentials);
            setUser(persistUser(user));
            setAccessToken(persistAccessToken(access_token));

            setUserIsLoggedIn(true);
            navigate('/', { replace: true });
        } catch {
            setError('Username or password are invalid');
        }
        setLoading(false);
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await authApi.logoutService(accessToken);
            setUser(removePersistedUser());
            setAccessToken(removePersistedAccessToken());

            navigate('/user/login', { replace: true });
        } catch (err) {
            console.log(err)
        }
        setLoading(false);
    }

    const value = useMemo(() => ({
        user,
        accessToken,
        loading,
        error,
        userIsLoggedIn,
        handleLogin,
        handleLogout,
    }), [user, accessToken, userIsLoggedIn, loading, error])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
