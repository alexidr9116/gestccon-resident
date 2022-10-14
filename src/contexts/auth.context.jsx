import PropTypes from 'prop-types';
import { FC, createContext, useEffect, useReducer, useState, PropsWithChildren } from 'react';
// utils
import axios from '../app/util/axios';
import { isValidToken, setSession } from '../app/util/jwt';

// ----------------------------------------------------------------------

const defaultState = {
    isAuthenticated: false,
    user: null,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    initialize: () => Promise.resolve(),
}

const AuthContext = createContext(defaultState);


const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(defaultState.isAuthenticated);
    const [user, setUser] = useState(defaultState.user);
    const login = async (email, password) => {
        const response = await axios.post('/resident/auth/login-with-resident', {
            email,
            password,
        });
        const { token, user } = response.data.data;

        setSession(token);
        setIsAuthenticated(true)
        setUser(user)

    }
    const logout = () => {
        setSession('');
        setIsAuthenticated(false)
        setUser(null)
    }
    const initialize = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken && isValidToken(accessToken)) {
                setSession(accessToken);

                const response = await axios.get('/resident/auth/my-account');
                const { user } = response.data.data;
                setIsAuthenticated(true)
                setUser(user)

            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        } catch (err) {
            console.error(err);
            setIsAuthenticated(false)
            setUser(null)
        }
    }
    useEffect(() => {
        initialize();
    }, []);
    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
                initialize,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
