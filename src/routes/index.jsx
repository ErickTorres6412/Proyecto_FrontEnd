// src/routes/index.jsx
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

// Importa los componentes de páginas
import Dashboard from '../pages/Dashboard/Dashboard';
import Login from '../pages/Login/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Login separado, fuera del Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} /> {/* Redirecciona raíz a login */}

      {/* Todo lo demás, protegido con Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Más rutas a futuro aquí */}

      {/* Mantén la estructura para futuras rutas protegidas pero comentada */}
      {/* 
      <Route
        path="/protected"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      */}

    </>
  )
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
