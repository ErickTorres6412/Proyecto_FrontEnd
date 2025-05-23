import React, { useEffect } from "react";
import { X } from "lucide-react";

const ContentModal = ({
  isOpen,
  toggle,
  title,
  icon: Icon,
  children,
  isEditing,
  onCancel,
  onSave,
  showFooter = true,
  isSubmitting = false,
  size = "md", // "sm", "md", "lg", "xl"
  extraButtons = null // Nuevo prop para botones adicionales
}) => {
  // Control de scroll del cuerpo cuando se abre/cierra el modal
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "sm:max-w-md",
    md: "sm:max-w-xl",
    lg: "sm:max-w-2xl",
    xl: "sm:max-w-4xl"
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0" onClick={isEditing ? null : toggle} aria-hidden="true" />
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${sizeClasses[size]} sm:w-full border border-gray-200`}
          style={{ animation: "modal-slide-in 0.3s ease-out" }}
        >
          {/* Header */}
          <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {Icon && (
                <div className="bg-white p-2 rounded-lg shadow">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
              )}
              <h3 className="text-lg font-medium text-white">{title}</h3>
            </div>
            <button
              onClick={isEditing ? onCancel : toggle}
              className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="bg-white px-6 py-5 max-h-[calc(80vh-8rem)] overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          {showFooter && (
            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={onSave}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-white text-gray-700 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  {/* Botones adicionales */}
                  {extraButtons}
                  
                  <button
                    onClick={toggle}
                    className="px-4 py-2 bg-white text-gray-700 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Cerrar
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes modal-slide-in {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ContentModal;