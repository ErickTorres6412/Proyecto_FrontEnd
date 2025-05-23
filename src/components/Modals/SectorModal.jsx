import React from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { Building2, Calendar, FileText, Map, Edit } from "lucide-react";
import useSectorEdit from "../../hooks/Sector/EditarSector/useSectorEdit";
import ContentModal from "../common/ContentModal";
import InfoField from "../common/InfoField";

const SectorModal = ({ isOpen, toggle, sector, loading, onUpdate }) => {
  const {
    isEditing,
    isSubmitting,
    data,
    tempData,
    errors,
    startEditing,
    cancelEditing,
    handleChange,
    updateSector
  } = useSectorEdit(sector, onUpdate);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Botón de editar que se muestra cuando no estamos en modo edición
  const editButton = sector && !isEditing ? (
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

    if (!sector) {
      return (
        <div className="py-10 text-center">
          <p className="text-lg text-gray-500 font-medium">No se encontraron detalles del sector.</p>
          <p className="text-gray-400 mt-2">Intente de nuevo o seleccione otro.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Nombre */}
        <InfoField
          icon={FileText}
          label="Nombre del Sector"
          value={data.nombre}
          editing={isEditing}
          inputProps={{
            name: "nombre",
            value: tempData.nombre,
            onChange: handleChange,
            placeholder: "Nombre del sector",
            error: errors.nombre
          }}
        />

        {/* Información del condominio */}
        {sector.condominio && (
          <InfoField
            icon={Building2}
            label="Condominio"
            value={`${sector.condominio.nombre} - ${sector.condominio.direccion}`}
            noEdit={true}
          />
        )}

        {/* Fecha de registro del condominio */}
        {sector.condominio && (
          <InfoField
            icon={Calendar}
            label="Fecha de Registro del Condominio"
            value={formatDate(sector.condominio.fechaRegistro)}
            noEdit={true}
          />
        )}

        {/* ID del Sector - Normalmente oculto pero útil para depuración */}
        <InfoField
          icon={Map}
          label="ID del Sector"
          value={sector.sectorID.toString()}
          noEdit={true}
        />
      </div>
    );
  };

  return (
    <ContentModal
      isOpen={isOpen}
      toggle={toggle}
      title={isEditing ? "Editar Sector" : "Detalles del Sector"}
      icon={Map}
      isEditing={isEditing}
      onCancel={cancelEditing}
      onSave={updateSector}
      isSubmitting={isSubmitting}
      size="md"
      extraButtons={editButton}
    >
      {renderContent()}
    </ContentModal>
  );
};

export default React.memo(SectorModal);