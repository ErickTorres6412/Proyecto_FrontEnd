// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';

// Componente de loading mientras se inicializa la autenticación
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Verificando autenticación...</span>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, isInitialized } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se inicializa la autenticación
  if (!isInitialized || loading) {
    return <LoadingSpinner />;
  }

  // Si no está autenticado, redirigir al login con la ubicación actual
  if (!isAuthenticated) {
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