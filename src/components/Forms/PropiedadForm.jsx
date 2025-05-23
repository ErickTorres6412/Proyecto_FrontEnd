import React from 'react';
import InputWithHelp from '../common/InputWithHelp';
import FooterForm from '../common/FooterForm';
import SelectWithHelp from '../common/SelectWithHelp';

const PropiedadForm = ({
  formData,
  errors,
  sectores = [],
  isSubmitting,
  handleInputChange,
  handleCrearPropiedad
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <form>
        {/* Sección de Datos de la Propiedad */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <h4 className="text-blue-900 text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
            Datos de la Propiedad
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputWithHelp
              object={formData}
              errors={errors}
              handleChange={handleInputChange}
              name="numero"
              label="Número"
              tooltipMessage="Número o código identificador de la propiedad"
              required={true}
            />

            <InputWithHelp
              object={formData}
              errors={errors}
              handleChange={handleInputChange}
              name="tipo"
              label="Tipo"
              tooltipMessage="Tipo de propiedad (ej. Casa, Apartamento)"
              required={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <SelectWithHelp
              object={formData}
              errors={errors}
              handleChange={handleInputChange}
              name="sectorID"
              label="Sector"
              tooltipMessage="Selecciona el sector al que pertenece la propiedad"
              options={sectores}
              valueKey="sectorID"
              labelKey="nombre"
              placeholder="Selecciona un sector"
              required={true}
            />

            <InputWithHelp
              object={formData}
              errors={errors}
              handleChange={handleInputChange}
              name="fechaRegistro"
              label="Fecha de Registro"
              tooltipMessage="Fecha de registro o creación de la propiedad"
              type="date"
              required={true}
            />
          </div>

          <div className="mt-6">
            <InputWithHelp
              object={formData}
              errors={errors}
              handleChange={handleInputChange}
              name="caracteristicas"
              label="Características"
              tooltipMessage="Opcional: características o comentarios adicionales"
              isTextArea={true}
            />
          </div>
        </div>
      </form>

      {/* Footer con botones */}
      <FooterForm
        onSubmit={handleCrearPropiedad}
        isSubmitting={isSubmitting}
        buttonText="Crear Propiedad"
      />
    </div>
  );
};

export default PropiedadForm;
