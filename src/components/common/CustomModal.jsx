import React from 'react';
import { X } from 'lucide-react';
import '../../styles/theme.css'; // Importamos las variables CSS

const CustomModal = ({ isOpen, toggle, title, children, footerButtons, size = 'md' }) => {
  if (!isOpen) return null;

  // Mapeo de tamaños de modal
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };
  
  const modalSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className={`bg-white rounded-lg shadow-xl w-full ${modalSize} animate-fadeIn overflow-hidden`}>
        {/* Franja decorativa superior */}
        <div className="h-1 bg-gradient-to-r from-primary-light to-primary"></div>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-text-dark">{title}</h3>
          <button
            onClick={toggle}
            className="text-text-muted hover:text-text-dark focus:outline-none transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Body */}
        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-accent-2 scrollbar-track-transparent">
          {children}
        </div>
        
        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-200 bg-gray-50">
          {footerButtons.map((button, index) => {
            // Mapeo de colores de botones a nuestra paleta
            const buttonStyles = {
              primary: "bg-primary hover:bg-primary-light text-text-light",
              secondary: "bg-button-secondary hover:bg-accent-1 text-text-light",
              success: "bg-state-success hover:bg-state-success/90 text-text-light", 
              danger: "bg-button-cancel hover:bg-state-error text-text-light",
              warning: "bg-state-warning hover:bg-state-warning/90 text-text-dark",
              info: "bg-state-info hover:bg-state-info/90 text-text-light",
              light: "bg-accent-2 hover:bg-accent-2/80 text-text-dark",
              dark: "bg-text-dark hover:bg-text-dark/90 text-text-light",
              // Botón personalizado para mantener consistencia con el diseño
              custom: "bg-gradient-to-r from-primary-light to-primary hover:from-primary hover:to-primary-dark text-text-light"
            };
            
            const buttonStyle = buttonStyles[button.color] || buttonStyles.custom;
            
            return (
              <button
                key={index}
                onClick={button.onClick}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm ${buttonStyle}`}
              >
                {button.text}
              </button>
            );
          })}
        </div>
        
        {/* Franja decorativa inferior */}
        <div className="h-1 bg-gradient-to-r from-accent-2 to-accent-1/30"></div>
      </div>
    </div>
  );
};

export default CustomModal;