import React, { useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { Building2, Calendar, FileText, Users, ClipboardList, BookOpen, Edit } from "lucide-react";
import useAreaComunEdit from "../../hooks/AreasComunes/EditarAreasComunes/useAreaComunEdit";
import ContentModal from "../common/ContentModal";
import InfoField from "../common/InfoField";

const AreaComunModal = ({ isOpen, toggle, areaComun, loading, onUpdate }) => {
  const {
    isEditing,
    isSubmitting,
    data,
    tempData,
    errors,
    startEditing,
    cancelEditing,
    handleChange,
    updateAreaComun
  } = useAreaComunEdit(areaComun, onUpdate);
  
  const [showReservas, setShowReservas] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Botón de editar que se muestra cuando no estamos en modo edición
  const editButton = areaComun && !isEditing ? (
    <button
      onClick={startEditing}
      className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors mr-2"
    >
      <Edit className="h-4 w-4 mr-1.5" />
      Editar
    </button>
  ) : null;

  const renderContent = () => {
    if (loading || isSubmitting) {
      return (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      );
    }

    if (!areaComun) {
      return (
        <div className="py-10 text-center">
          <p className="text-lg text-gray-500 font-medium">No se encontraron detalles del área común.</p>
          <p className="text-gray-400 mt-2">Intente de nuevo o seleccione otra.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Nombre */}
        <InfoField
          icon={FileText}
          label="Nombre del Área"
          value={data.nombre}
          editing={isEditing}
          inputProps={{
            name: "nombre",
            value: tempData.nombre,
            onChange: handleChange,
            placeholder: "Nombre del área",
            error: errors.nombre
          }}
        />

        {/* Capacidad */}
        <InfoField
          icon={Users}
          label="Capacidad"
          value={`${data.capacidad} personas`}
          editing={isEditing}
          inputProps={{
            name: "capacidad",
            value: tempData.capacidad,
            onChange: handleChange,
            placeholder: "Capacidad en personas",
            error: errors.capacidad,
            type: "number"
          }}
        />

        {/* Reglas */}
        <InfoField
          icon={ClipboardList}
          label="Reglas"
          value={data.reglas}
          editing={isEditing}
          inputProps={{
            name: "reglas",
            value: tempData.reglas,
            onChange: handleChange,
            placeholder: "Reglas del área",
            error: errors.reglas,
            isTextarea: true
          }}
        />

        {/* Información del condominio */}
        {areaComun.condominio && (
          <InfoField
            icon={Building2}
            label="Condominio"
            value={`${areaComun.condominio.nombre} - ${areaComun.condominio.direccion}`}
            noEdit={true}
          />
        )}

        {/* Fecha de registro */}
        <InfoField
          icon={Calendar}
          label="Fecha de Registro"
          value={formatDate(areaComun.fechaRegistro)}
          noEdit={true}
        />

        {/* Reservas asociadas */}
        {data.reservas && data.reservas.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <div className="p-2 bg-amber-50 rounded-md">
                  <BookOpen className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium text-gray-500">
                    Reservas ({data.reservas.length})
                  </div>
                  <button 
                    onClick={() => setShowReservas(!showReservas)}
                    className="text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    {showReservas ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                
                {showReservas && (
                  <div className="mt-3 space-y-3 max-h-64 overflow-y-auto pr-2">
                    {data.reservas.map((reserva) => (
                      <div key={reserva.reservaID} className="p-3 bg-gray-50 rounded-md border border-gray-100">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-800">{reserva.nombreResidente}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            reserva.estado === "Confirmada" ? "bg-green-100 text-green-800" :
                            reserva.estado === "Pendiente" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }`}>
                            {reserva.estado}
                          </span>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                          <p><span className="font-medium">Código:</span> {reserva.codigoReserva}</p>
                          <p className="mt-0.5"><span className="font-medium">Inicio:</span> {formatDateTime(reserva.fechaInicio)}</p>
                          <p><span className="font-medium">Fin:</span> {formatDateTime(reserva.fechaFin)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <ContentModal
      isOpen={isOpen}
      toggle={toggle}
      title={isEditing ? "Editar Área Común" : "Detalles del Área Común"}
      icon={Building2}
      isEditing={isEditing}
      onCancel={cancelEditing}
      onSave={updateAreaComun}
      isSubmitting={isSubmitting}
      size="md"
      extraButtons={editButton}  // Aquí agregamos el botón de editar
    >
      {renderContent()}
    </ContentModal>
  );
};

export default React.memo(AreaComunModal);