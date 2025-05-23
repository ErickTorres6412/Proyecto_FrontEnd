// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    // Función para inicializar el estado de autenticación
    const initializeAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            const userInfo = localStorage.getItem('userInfo');
            
            if (token && userInfo) {
                // Verificar si el token sigue siendo válido
                const verificationResult = await authService.verifyToken();
                
                if (verificationResult.success) {
                    const parsedUserInfo = JSON.parse(userInfo);
                    setUser({
                        token,
                        ...parsedUserInfo
                    });
                } else {
                    // Token inválido, limpiar localStorage
                    localStorage.removeItem('token');
                    localStorage.removeItem('userInfo');
                    setUser(null);
                }
            }
        } catch (error) {
            console.error('Error al inicializar autenticación:', error);
            // En caso de error, limpiar datos
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            setUser(null);
        } finally {
            setLoading(false);
            setIsInitialized(true);
        }
    };

    // Inicializar al montar el componente
    useEffect(() => {
        initializeAuth();
    }, []);

    const login = async (credentials) => {
        try {
            setLoading(true);
            
            // Llamar al servicio de autenticación
            const result = await authService.login(credentials);
            
            if (result.success) {
                const userData = result.data;
                
                // Estructura esperada del response del API
                const userToStore = {
                    token: userData.token,
                    nombreCompleto: userData.nombreCompleto || userData.name,
                    username: userData.username,
                    email: userData.email,
                    idRol: userData.idRol || userData.roleId
                };
                
                // Actualizar estado
                setUser(userToStore);
                
                // Guardar en localStorage
                localStorage.setItem('token', userData.token);
                localStorage.setItem('userInfo', JSON.stringify({
                    nombreCompleto: userToStore.nombreCompleto,
                    username: userToStore.username,
                    email: userToStore.email,
                    idRol: userToStore.idRol
                }));
                
                return { success: true };
            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            console.error('Error en login:', error);
            return { 
                success: false, 
                error: 'Error de conexión. Por favor intente nuevamente.' 
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            // Llamar al endpoint de logout si existe
            await authService.logout();
        } catch (error) {
            console.error('Error en logout:', error);
        } finally {
            // Limpiar estado y localStorage independientemente del resultado
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
        }
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        isInitialized
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};