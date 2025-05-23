import React from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import { Car, Calendar, Home, Edit, Tag, Key } from "lucide-react";
import useVehiculoEdit from "../../hooks/Vehiculos/EditarVehiculo/useVehiculoEdit";
import ContentModal from "../common/ContentModal";
import InfoField from "../common/InfoField";

const VehiculoModal = ({ isOpen, toggle, vehiculo, loading, onUpdate }) => {
  const {
    isEditing,
    isSubmitting,
    data,
    tempData,
    errors,
    startEditing,
    cancelEditing,
    handleChange,
    updateVehiculo
  } = useVehiculoEdit(vehiculo, onUpdate);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Opciones para el tipo de vehículo
  const tiposVehiculo = [
    { value: 'automovil', label: 'Automóvil' },
    { value: 'motocicleta', label: 'Motocicleta' },
    { value: 'camioneta', label: 'Camioneta' },
    { value: 'otro', label: 'Otro' }
  ];

  // Botón de editar que se muestra cuando no estamos en modo edición
  const editButton = vehiculo && !isEditing ? (
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

    if (!vehiculo) {
      return (
        <div className="py-10 text-center">
          <p className="text-lg text-gray-500 font-medium">No se encontraron detalles del vehículo.</p>
          <p className="text-gray-400 mt-2">Intente de nuevo o seleccione otro.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Propiedad */}
        <InfoField
          icon={Home}
          label="Numero de Propiedad"
          value={vehiculo.propiedad.numero || "No definida"}
          noEdit={true}
        />

        {/* Placa del vehículo */}
        <InfoField
          icon={Tag}
          label="Placa"
          value={data.placa}
          editing={isEditing}
          inputProps={{
            name: "placa",
            value: tempData.placa,
            onChange: handleChange,
            placeholder: "Placa del vehículo",
            error: errors.placa
          }}
        />

        {/* Tipo de vehículo */}
        <InfoField
          icon={Car}
          label="Tipo de Vehículo"
          value={data.tipo}
          editing={isEditing}
          selectProps={{
            name: "tipo",
            value: tempData.tipo,
            onChange: handleChange,
            options: tiposVehiculo,
            placeholder: "Seleccione un tipo",
            error: errors.tipo
          }}
        />

        {/* Código de acceso */}
        <InfoField
          icon={Key}
          label="Código de Acceso"
          value={data.codigoAcceso}
          editing={isEditing}
          inputProps={{
            name: "codigoAcceso",
            value: tempData.codigoAcceso,
            onChange: handleChange,
            placeholder: "Código de acceso",
            error: errors.codigoAcceso
          }}
        />

        {/* Fecha de registro */}
        <InfoField
          icon={Calendar}
          label="Fecha de Registro"
          value={formatDate(data.fechaRegistro)}
          noEdit={true}
        />

        {/* Fecha de expiración */}
        <InfoField
          icon={Calendar}
          label="Fecha de Expiración"
          value={formatDate(data.fechaExpiracion)}
          editing={isEditing}
          inputProps={{
            name: "fechaExpiracion",
            value: tempData.fechaExpiracion ? tempData.fechaExpiracion.split('T')[0] : '',
            onChange: handleChange,
            type: "date",
            error: errors.fechaExpiracion
          }}
        />
      </div>
    );
  };

  return (
    <ContentModal
      isOpen={isOpen}
      toggle={toggle}
      title={isEditing ? "Editar Vehículo" : "Detalles del Vehículo"}
      icon={Car}
      isEditing={isEditing}
      onCancel={cancelEditing}
      onSave={updateVehiculo}
      isSubmitting={isSubmitting}
      size="md"
      extraButtons={editButton}
    >
      {renderContent()}
    </ContentModal>
  );
};

export default React.memo(VehiculoModal);