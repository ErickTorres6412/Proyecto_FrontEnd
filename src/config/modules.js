import { Package, Lock, Car, Clipboard, FileText, BarChart } from 'lucide-react';

const modules = [
  {
    title: 'Configuracion',
    icon: Package,
    subItems: [
      { label: 'Visualizar Condominios', link: '/visualizar-condominios' },
      { label: 'Crear Condominio', link: '/crear-condominio' },
      { label: 'Crear Vehiculo', link: '/vehiculos/crear' },
      { label: 'Visualizar Vehiculos', link: '/vehiculos/visualizar' },
      { label: 'Visualizar Sectores', link: '/sector/ver' },
      { label: 'Crear Sector', link: '/sector/crear' }
     

    ]
  },
  {
    title: 'Gestión de Pagos',
    icon: Package,
    subItems: [
      { label: 'Pagar Cuotas', link: '/pagos/cuotas' },
      { label: 'Historial de Pagos', link: '/pagos/historial' },
      { label: 'Facturas', link: '/pagos/facturas' }
    ]
  },
  {
    title: 'Áreas Comunes',
    icon: Lock,
    subItems: [
      { label: 'Crear Áreas', link: '/areas/crear' },
      { label: 'Visualizar Áreas', link: '/areas/ver' },
      { label: 'Reservar Áreas', link: '/areas/reservar' },
      { label: 'Calendario de Reservas', link: '/areas/calendario' },
      { label: 'Historial de Reservas', link: '/areas/historial' },
      { label: 'Visualizar Propiedades', link: '/propiedad/ver' },
      { label: 'Crear Propiedad', link: '/propiedad/crear' }
    ]
  },
  {
    title: 'Incidencias y Solicitudes',
    icon: Clipboard,
    subItems: [
      { label: 'Crear Incidencia', link: '/incidencias/crear' },
      { label: 'Ver Incidencias', link: '/incidencias/ver' },
      { label: 'Historial de Incidencias', link: '/incidencias/historial' }
    ]
  },
  {
    title: 'Sistema de Seguridad',
    icon: Lock,
    subItems: [
      { label: 'Control de Accesos', link: '/seguridad/accesos' },
      { label: 'Códigos QR', link: '/seguridad/codigos-qr' },
      { label: 'Reconocimiento Facial', link: '/seguridad/reconocimiento' },
      { label: 'Botón de Pánico', link: '/seguridad/panico' }
    ]
  },
  {
    title: 'Registro de Vehículos',
    icon: Car,
    subItems: [
      { label: 'Registro de Vehículos', link: '/vehiculos/registro' },
      { label: 'Historial de Vehículos', link: '/vehiculos/historial' },
      { label: 'Paquetería', link: '/paqueteria' },
      { label: 'Notificaciones de Paquetería', link: '/paqueteria/notificaciones' }
    ]
  },
  {
    title: 'Votaciones y Encuestas',
    icon: BarChart,
    subItems: [
      { label: 'Votaciones', link: '/votaciones' },
      { label: 'Encuestas', link: '/encuestas' }
    ]
  },
  {
    title: 'Dashboard Financiero',
    icon: FileText,
    subItems: [
      { label: 'Ingresos y Gastos', link: '/finanzas/ingresos-gastos' },
      { label: 'Reportes Financieros', link: '/finanzas/reportes' }
    ]
  },
  {
    title: 'Quejas y Sugerencias',
    icon: Clipboard,
    subItems: [
      { label: 'Registrar Queja', link: '/quejas/registrar' },
      { label: 'Ver Quejas', link: '/quejas/ver' },
      { label: 'Seguimiento de Quejas', link: '/quejas/seguimiento' }
    ]
  },
  {
    title: 'Foro de Discusión',
    icon: Clipboard,
    subItems: [
      { label: 'Foro', link: '/foro/' },
        { label: 'Crear Propiedad', link: '/propiedad/crear' }
    ]
  }
];

export default modules;
