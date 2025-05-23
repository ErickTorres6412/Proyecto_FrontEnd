import React, { useState } from 'react';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Datos de usuario de ejemplo
  const user = {
    name: 'Josue Montero',
    role: 'Administrador',
    email: 'admin@condominio.com',
    avatar: null // En caso de que quieras implementar avatares después
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 py-1 px-2 rounded-lg text-white hover:bg-emerald-700/50 transition-colors"
        aria-label="Menú de usuario"
      >
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-700/50 text-white">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-full w-full rounded-full object-cover" 
            />
          ) : (
            <User size={16} />
          )}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium truncate max-w-[100px]">{user.name}</p>
          <p className="text-xs opacity-90 truncate max-w-[100px]">{user.role}</p>
        </div>
        <ChevronDown size={14} className="hidden md:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-700">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          
          <div className="py-1">
            <a 
              href="/profile" 
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <User size={16} />
              <span>Mi perfil</span>
            </a>
            <a 
              href="/settings" 
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Settings size={16} />
              <span>Configuración</span>
            </a>
          </div>
          
          <div className="py-1 border-t border-gray-100">
            <a 
              href="/logout" 
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
            >
              <LogOut size={16} />
              <span>Cerrar sesión</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;