import React from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { Building2, MapPin, Calendar, Home, Edit } from "lucide-react";
import useCondominioEdit from "../../hooks/Condominios/EditarCondominios/useCondominioEdit";
import ContentModal from "../common/ContentModal";
import InfoField from "../common/InfoField";

const CondominioModal = ({ isOpen, toggle, condominio, loading, onUpdate }) => {
  const {
    isEditing,
    isSubmitting,
    data,
    tempData,
    errors,
    startEditing,
    cancelEditing,
    handleChange,
    updateCondominio
  } = useCondominioEdit(condominio, onUpdate);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Botón de editar que se muestra cuando no estamos en modo edición
  const editButton = condominio && !isEditing ? (
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

    if (!condominio) {
      return (
        <div className="py-10 text-center">
          <p className="text-lg text-gray-500 font-medium">No se encontraron detalles del condominio.</p>
          <p className="text-gray-400 mt-2">Intente de nuevo o seleccione otro.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Nombre del condominio */}
        <InfoField
          icon={Home}
          label="Nombre del Condominio"
          value={data.nombre}
          editing={isEditing}
          inputProps={{
            name: "nombre",
            value: tempData.nombre,
            onChange: handleChange,
            placeholder: "Nombre del condominio",
            error: errors.nombre
          }}
        />

        {/* Ubicación */}
        <InfoField
          icon={MapPin}
          label="Ubicación"
          value={data.direccion}
          editing={isEditing}
          inputProps={{
            name: "direccion",
            value: tempData.direccion,
            onChange: handleChange,
            placeholder: "Dirección",
            error: errors.direccion
          }}
        />

        {/* Fecha de registro */}
        <InfoField
          icon={Calendar}
          label="Fecha de Registro"
          value={formatDate(data.fechaRegistro)}
          noEdit={true}
        />
      </div>
    );
  };

  return (
    <ContentModal
      isOpen={isOpen}
      toggle={toggle}
      title={isEditing ? "Editar Condominio" : "Detalles del Condominio"}
      icon={Building2}
      isEditing={isEditing}
      onCancel={cancelEditing}
      onSave={updateCondominio}
      isSubmitting={isSubmitting}
      size="md"
      extraButtons={editButton}
    >
      {renderContent()}
    </ContentModal>
  );
};

export default React.memo(CondominioModal);