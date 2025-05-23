// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import Layout from '../components/Layout/Layout';

// Componente de loading mientras se inicializa la autenticación
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <span className="mt-3 block text-gray-600">Verificando autenticación...</span>
    </div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, isInitialized, user, checkAuthStatus } = useAuth();
  const location = useLocation();

  // Verificar estado de autenticación cuando se monta el componente
  useEffect(() => {
    if (isInitialized && user) {
      checkAuthStatus();
    }
  }, [isInitialized, user, checkAuthStatus]);

  // Mostrar loading mientras se inicializa la autenticación
  if (!isInitialized || loading) {
    return <LoadingSpinner />;
  }

  // Si no está autenticado, redirigir al login con la ubicación actual
  if (!isAuthenticated) {
    console.log('Usuario no autenticado, redirigiendo al login...');
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Verificación adicional del usuario
  if (!user || !user.token) {
    console.log('Datos de usuario incompletos, redirigiendo al login...');
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Si está autenticado, mostrar el contenido con el Layout
  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;