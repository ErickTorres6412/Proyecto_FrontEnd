import React from 'react';
import { Eye } from 'lucide-react';

const ActionButton = ({ 
  onClick, 
  icon = <Eye size={14} />, 
  text = "Ver más", 
  backgroundColor = "var(--color-primary)",
  textColor = "var(--color-text-light)",
  minWidth = "100px" // Ancho mínimo para evitar que el texto se rompa
}) => {
  return (
    <button
      onClick={onClick}
      className="py-1.5 px-4 rounded text-sm flex items-center justify-center transition-all duration-200 hover:shadow-md whitespace-nowrap"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        minWidth: minWidth
      }}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {text}
    </button>
  );
};

export default ActionButton;