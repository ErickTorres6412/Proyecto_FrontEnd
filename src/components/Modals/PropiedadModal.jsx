import React from "react";
import { Building2, Calendar, Edit, FileText, ClipboardList, Hash } from "lucide-react";
import LoadingSpinner from "../common/LoadingSpinner";
import ContentModal from "../common/ContentModal";
import InfoField from "../common/InfoField";
import usePropiedadEdit from "../../hooks/Propiedad/EditarPropiedad/usePropiedadEdit";

const PropiedadModal = ({ isOpen, toggle, propiedad, loading, onUpdate }) => {
  const {
    isEditing,
    isSubmitting,
    data,
    tempData,
    errors,
    startEditing,
    cancelEditing,
    handleChange,
    updatePropiedad
  } = usePropiedadEdit(propiedad, onUpdate);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const editButton = propiedad && !isEditing ? (
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

    if (!propiedad) {
      return (
        <div className="py-10 text-center">
          <p className="text-lg text-gray-500 font-medium">No se encontraron detalles de la propiedad.</p>
          <p className="text-gray-400 mt-2">Intente de nuevo o seleccione otra.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <InfoField
          icon={Hash}
          label="Número"
          value={data.numero}
          editing={isEditing}
          inputProps={{
            name: "numero",
            value: tempData.numero,
            onChange: handleChange,
            placeholder: "Número de la propiedad",
            error: errors.numero
          }}
        />

        <InfoField
          icon={FileText}
          label="Tipo"
          value={data.tipo}
          editing={isEditing}
          inputProps={{
            name: "tipo",
            value: tempData.tipo,
            onChange: handleChange,
            placeholder: "Apartamento, Casa, etc.",
            error: errors.tipo
          }}
        />

        <InfoField
          icon={ClipboardList}
          label="Características"
          value={data.caracteristicas || "—"}
          editing={isEditing}
          inputProps={{
            name: "caracteristicas",
            value: tempData.caracteristicas,
            onChange: handleChange,
            placeholder: "Detalles adicionales",
            error: errors.caracteristicas,
            isTextarea: true
          }}
        />

        <InfoField
          icon={Calendar}
          label="Fecha de Registro"
          value={formatDate(data.fechaRegistro)}
          noEdit={true}
        />

        {propiedad.sector && (
          <InfoField
            icon={Building2}
            label="Sector"
            value={propiedad.sector.nombre}
            noEdit={true}
          />
        )}
      </div>
    );
  };

  return (
    <ContentModal
      isOpen={isOpen}
      toggle={toggle}
      title={isEditing ? "Editar Propiedad" : "Detalles de la Propiedad"}
      icon={Building2}
      isEditing={isEditing}
      onCancel={cancelEditing}
      onSave={updatePropiedad}
      isSubmitting={isSubmitting}
      size="md"
      extraButtons={editButton}
    >
      {renderContent()}
    </ContentModal>
  );
};

export default React.memo(PropiedadModal);
