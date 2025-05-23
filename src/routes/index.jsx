// src/routes/index.jsx
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

// Importa los componentes de páginas
import Dashboard from '../pages/Dashboard/Dashboard';
import VisualizarCondominios from '../pages/Configuracion/Condominios/VisualizarCondominios';
import CrearCondominio from '../pages/Configuracion/Condominios/CrearCondominio';
import CrearAreaComun from '../pages/Configuracion/AreaComun/CrearAreaComun';
import VisualizarAreaComun from '../pages/Configuracion/AreaComun/VisualizarAreaComun';
import CrearVehiculo from '../pages/Configuracion/Vehiculos/CrearVehiculo';
import VisualizarVehiculos from '../pages/Configuracion/Vehiculos/VisualizarVehiculos';
import Foro from '../pages/Foro/Foro';
import CrearTemaForo from '../pages/Foro/CrearTemaForo';
import Login from '../pages/Login/Login'; 
import DetalleTema from '../pages/Foro/DetalleTema';
import CrearSector from '../pages/Configuracion/Sector/CrearSector';
import VisualizarSector from '../pages/Configuracion/Sector/VisualizarSector'
import CrearPropiedad from '../pages/Configuracion/Propiedad/CrearPropiedad'; 
import VisualizarPropiedad from '../pages/Configuracion/Propiedad/VisualizarPropiedad';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Login separado, fuera del Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} /> {/* Redirecciona raíz a login */}

      {/* Todo lo demás, protegido con Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/visualizar-condominios" element={<VisualizarCondominios />} />
        <Route path="/crear-condominio" element={<CrearCondominio />} />
        <Route path="/areas/crear" element={<CrearAreaComun />} />
        <Route path="/areas/ver" element={<VisualizarAreaComun />} />
        <Route path="/sector/ver" element={<VisualizarSector />} />
        <Route path="/sector/crear" element={<CrearSector/>} />
        <Route path="/propiedad/ver" element={<VisualizarPropiedad />} />
        <Route path="/propiedad/crear" element={<CrearPropiedad/>} />
        <Route path="/vehiculos/crear" element={<CrearVehiculo />} />
        <Route path="/vehiculos/visualizar" element={<VisualizarVehiculos />} />
        <Route path="/foro" element={<Foro />} />
        <Route path="/foro/crear" element={<CrearTemaForo />} />
        <Route path="/foro/:foroID" element={<DetalleTema />} /> {/* Detalle del tema del foro */}
        {/* Aquí puedes agregar más rutas según sea necesario */}
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
