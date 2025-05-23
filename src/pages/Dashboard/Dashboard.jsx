import React from 'react';
import {
    Home,
    Users,
    DollarSign,
    AlertTriangle,
    Calendar,
    Clipboard,
    ArrowUpRight,
    ArrowDownRight,
    ChevronRight,
    Mail,
    Check
} from 'lucide-react';

const Dashboard = () => {
    // Datos de ejemplo para el dashboard
    const stats = [
        { title: 'Total Unidades', value: '120', icon: Home, change: 0, color: 'bg-blue-500' },
        { title: 'Propietarios', value: '98', icon: Users, change: 2, color: 'bg-emerald-500' },
        { title: 'Pagos del Mes', value: '$15,280', icon: DollarSign, change: 5.3, color: 'bg-amber-500' },
        { title: 'Incidencias Activas', value: '7', icon: AlertTriangle, change: -2, color: 'bg-rose-500' }
    ];

    const upcomingEvents = [
        { title: 'Reunión de propietarios', date: '20 Mar, 2025', time: '18:00', location: 'Salón Comunal' },
        { title: 'Mantenimiento de piscina', date: '22 Mar, 2025', time: '09:00', location: 'Área de piscina' },
        { title: 'Junta directiva', date: '25 Mar, 2025', time: '19:30', location: 'Oficina Administrativa' }
    ];

    const recentPayments = [
        { unit: 'A-101', owner: 'Carlos Méndez', amount: '$215', date: '15 Mar, 2025', status: 'Completado' },
        { unit: 'B-205', owner: 'Laura Torres', amount: '$215', date: '14 Mar, 2025', status: 'Completado' },
        { unit: 'C-310', owner: 'Miguel Ángel', amount: '$215', date: '13 Mar, 2025', status: 'Completado' },
        { unit: 'A-302', owner: 'Ana Rodríguez', amount: '$215', date: '12 Mar, 2025', status: 'Completado' }
    ];

    const pendingTasks = [
        { title: 'Revisar presupuesto trimestral', priority: 'Alta', dueDate: '18 Mar' },
        { title: 'Finalizar contrato de jardinería', priority: 'Media', dueDate: '22 Mar' },
        { title: 'Actualizar registro de residentes', priority: 'Baja', dueDate: '30 Mar' }
    ];

    const announcements = [
        { title: 'Nuevo sistema de seguridad instalado', date: '10 Mar, 2025', content: 'Se ha completado la instalación del nuevo sistema de cámaras en todas las áreas comunes.' },
        { title: 'Mantenimiento programado de elevadores', date: '05 Mar, 2025', content: 'El mantenimiento de elevadores se realizará el próximo fin de semana.' }
    ];

    return (
        <div className="w-full">
            {/* Encabezado */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Panel de Control</h1>
                <p className="text-gray-600">Bienvenido al sistema de administración del condominio</p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                            </div>
                            <div className={`${stat.color} text-white p-3 rounded-lg`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-xs">
                            {stat.change > 0 ? (
                                <span className="text-emerald-600 flex items-center">
                                    <ArrowUpRight size={14} className="mr-1" />
                                    {stat.change}% desde el mes pasado
                                </span>
                            ) : stat.change < 0 ? (
                                <span className="text-rose-600 flex items-center">
                                    <ArrowDownRight size={14} className="mr-1" />
                                    {Math.abs(stat.change)}% desde el mes pasado
                                </span>
                            ) : (
                                <span className="text-gray-500">Sin cambios desde el mes pasado</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Contenido principal - Grid de 2 columnas en desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Columna izquierda */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Próximos eventos */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                            <div className="flex items-center">
                                <Calendar size={18} className="text-emerald-600 mr-2" />
                                <h2 className="font-semibold text-gray-800">Próximos Eventos</h2>
                            </div>
                            <a href="/events" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center">
                                Ver todos <ChevronRight size={16} />
                            </a>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {upcomingEvents.map((event, index) => (
                                <div key={index} className="p-4 hover:bg-gray-50">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-gray-800">{event.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{event.location}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-medium text-gray-700">{event.date}</span>
                                            <p className="text-sm text-gray-500">{event.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagos recientes */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                            <div className="flex items-center">
                                <DollarSign size={18} className="text-emerald-600 mr-2" />
                                <h2 className="font-semibold text-gray-800">Pagos Recientes</h2>
                            </div>
                            <a href="/payments" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center">
                                Ver todos <ChevronRight size={16} />
                            </a>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propietario</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentPayments.map((payment, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm font-medium text-gray-800">{payment.unit}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{payment.owner}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{payment.amount}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600">{payment.date}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
                                                    {payment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="space-y-6">
                    {/* Tareas pendientes */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                            <div className="flex items-center">
                                <Clipboard size={18} className="text-emerald-600 mr-2" />
                                <h2 className="font-semibold text-gray-800">Tareas Pendientes</h2>
                            </div>
                            <a href="/tasks" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center">
                                Ver todas <ChevronRight size={16} />
                            </a>
                        </div>
                        <div className="p-4">
                            {pendingTasks.map((task, index) => (
                                <div key={index} className="mb-3 last:mb-0 flex items-center">
                                    <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4 mr-3" />
                                    <div className="flex-1">
                                        <p className="text-gray-700 font-medium">{task.title}</p>
                                        <div className="flex justify-between items-center mt-1 text-xs">
                                            <span className={`px-2 py-1 rounded-full font-medium
                        ${task.priority === 'Alta' ? 'bg-rose-100 text-rose-800' :
                                                    task.priority === 'Media' ? 'bg-amber-100 text-amber-800' :
                                                        'bg-blue-100 text-blue-800'}`}>
                                                {task.priority}
                                            </span>
                                            <span className="text-gray-500">Vence: {task.dueDate}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Anuncios */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                            <div className="flex items-center">
                                <Mail size={18} className="text-emerald-600 mr-2" />
                                <h2 className="font-semibold text-gray-800">Anuncios Recientes</h2>
                            </div>
                            <a href="/announcements" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center">
                                Ver todos <ChevronRight size={16} />
                            </a>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {announcements.map((announcement, index) => (
                                <div key={index} className="p-4 hover:bg-gray-50">
                                    <h3 className="font-medium text-gray-800">{announcement.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{announcement.date}</p>
                                    <p className="text-sm text-gray-600 mt-2">{announcement.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Estado de mantenimiento */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                        <div className="p-5 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-800">Estado del Condominio</h2>
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Seguridad</span>
                                <div className="flex items-center text-emerald-600">
                                    <Check size={16} className="mr-1" />
                                    <span className="text-sm">Operativo</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Piscina</span>
                                <div className="flex items-center text-emerald-600">
                                    <Check size={16} className="mr-1" />
                                    <span className="text-sm">Operativo</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Elevadores</span>
                                <div className="flex items-center text-emerald-600">
                                    <Check size={16} className="mr-1" />
                                    <span className="text-sm">Operativos</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Gimnasio</span>
                                <div className="flex items-center text-amber-600">
                                    <AlertTriangle size={16} className="mr-1" />
                                    <span className="text-sm">Mantenimiento</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Widget de clima */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm text-white">
                        <div className="p-5">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium">Clima actual</h3>
                                    <p className="text-xs text-blue-100">Ciudad de México</p>
                                </div>
                                <div className="text-3xl font-bold">24°C</div>
                            </div>
                            <div className="mt-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <div className="ml-3">
                                    <p className="font-medium">Parcialmente soleado</p>
                                    <p className="text-xs text-blue-100">Humedad: 45% | Viento: 5 km/h</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-500 text-sm">
                <p>© 2025 Sistema de Administración de Condominio</p>
            </div>
        </div>
    );
};

export default Dashboard;