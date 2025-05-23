import React from 'react';

export const ListContainer = ({ 
  children,
  border = true,
  className = '',
  rounded = true 
}) => (
  <div 
    className={`bg-white ${border ? 'border border-gray-200' : ''} ${rounded ? 'rounded-lg' : ''} shadow-sm overflow-hidden ${className}`}
  >
    <div className="relative">
      {/* Franja decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
      
      {/* Contenido */}
      <div className="overflow-x-auto w-full">
        {children}
      </div>
      
      {/* Franja decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-100 to-teal-100"></div>
    </div>
  </div>
);

export default ListContainer;