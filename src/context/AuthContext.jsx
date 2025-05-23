import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        const userInfo = localStorage.getItem('userInfo');
        if (token && userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            return {
                token,
                ...parsedUserInfo
            };
        }
        return null;
    });

    const login = (userData) => {
        const userToStore = {
            token: userData.token,
            nombreCompleto: userData.nombreCompleto,
            username: userData.username,
            email: userData.email,
            idRol: userData.idRol
        };
        
        setUser(userToStore);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userInfo', JSON.stringify({
            nombreCompleto: userData.nombreCompleto,
            username: userData.username,
            email: userData.email,
            idRol: userData.idRol
        }));
        
        // Para debugging
        console.log('userData recibido:', userData);
        console.log('userToStore:', userToStore);
        console.log('localStorage userInfo:', localStorage.getItem('userInfo'));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
    };

    // Para debugging
    console.log('Current user state:', user);

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);