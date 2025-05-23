import React from 'react';
import SendButton from './SendButton';

/**
 * Componente de footer para formularios con botón de envío
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onSubmit - Función a ejecutar al hacer clic en el botón
 * @param {boolean} props.isSubmitting - Estado de envío del formulario
 * @param {string} props.buttonText - Texto a mostrar en el botón (opcional, por defecto "Enviar")
 * @param {string} props.align - Alineación del botón (opcional: "start", "center", "end", por defecto "end")
 * @param {Object} props.style - Estilos adicionales para el footer (opcional)
 * @param {React.ReactNode} props.children - Contenido adicional para el footer (opcional)
 */

const FooterForm = ({
    onSubmit,
    isSubmitting,
    buttonText = "Enviar",
    align = "end",
    style = {},
    children
}) => {
    // Determinar la alineación del contenido
    const getAlignmentClass = () => {
        switch (align) {
            case "start": return "justify-start";
            case "center": return "justify-center";
            case "end": return "justify-end";
            default: return "justify-end";
        }
    };

    return (
        <div 
            className={`flex ${getAlignmentClass()} items-center p-4 bg-white border-t border-gray-200 rounded-b-lg`}
            style={style}
        >
            {/* Si hay children, se renderizan primero */}
            {children}
            
            {/* Botón de enviar */}
            <SendButton 
                onClick={onSubmit}
                isLoading={isSubmitting}
                className="ml-2"
            >
                {buttonText}
            </SendButton>
        </div>
    );
};

export default FooterForm;