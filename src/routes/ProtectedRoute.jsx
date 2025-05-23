// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';

const ProtectedRoute = ({ children }) => {
  // Función temporal para simular autenticación
  // Reemplaza esto con tu lógica real de autenticación cuando la implementes
  const isAuthenticated = false; // Por ahora, siempre redirige a login
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;