import React from 'react';
import '../../styles/theme.css'; // Importamos las variables CSS

/**
 * Botón con estado de carga para formularios
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onClick - Función a ejecutar al hacer clic
 * @param {boolean} props.isLoading - Estado de carga
 * @param {string} props.className - Clases adicionales (opcional)
 * @param {React.ReactNode} props.children - Contenido del botón
 */

const SendButton = ({
    onClick,
    isLoading = false,
    className = "",
    children,
    ...rest
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={isLoading}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm 
                text-text-light bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-accent-1 transition-colors
                disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
            {...rest}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-text-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default SendButton;