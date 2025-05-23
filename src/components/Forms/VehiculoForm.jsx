import React from 'react';
import InputWithHelp from '../common/InputWithHelp';
import FooterForm from '../common/FooterForm';
import SelectWithHelp from '../common/SelectWithHelp';

const VehiculoForm = ({
    formData,
    errors,
    propiedades, // Asumimos que tendremos un array de propiedades para seleccionar
    isSubmitting,
    handleInputChange,
    handleCrearVehiculo
}) => {
    const tiposVehiculo = [
        { id: 'automovil', nombre: 'Automóvil' },
        { id: 'motocicleta', nombre: 'Motocicleta' },
        { id: 'camioneta', nombre: 'Camioneta' },
        { id: 'otro', nombre: 'Otro' }
    ];

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <form>
                {/* Sección de Datos del Vehículo */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                    <h4 className="text-blue-900 text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
                        Datos del Vehículo
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="propiedadID"
                            label="Propiedad"
                            tooltipMessage="Seleccione la propiedad a la cual pertenece el vehículo"
                            options={propiedades || []}
                            valueKey="propiedadID"
                            labelKey="numero"
                            placeholder="Seleccione una propiedad"
                            required={true}
                        />

                        <SelectWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="propiedadNumero"
                            label="Número de Propiedad"
                            tooltipMessage="Número identificador de la propiedad"
                            options={propiedades || []}
                            valueKey="propiedadID"
                            labelKey="numero"
                            placeholder="Seleccione una propiedad"
                            required={true}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <InputWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="placa"
                            label="Placa"
                            tooltipMessage="Ingrese la placa del vehículo"
                            required={true}
                        />

                        <SelectWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="tipo"
                            label="Tipo de Vehículo"
                            tooltipMessage="Seleccione el tipo de vehículo"
                            options={tiposVehiculo}
                            valueKey="id"
                            labelKey="nombre"
                            placeholder="Seleccione un tipo"
                            required={true}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <InputWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="codigoAcceso"
                            label="Código de Acceso"
                            tooltipMessage="Ingrese el código de acceso para el vehículo"
                            required={true}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <InputWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="fechaRegistro"
                            label="Fecha de Registro"
                            tooltipMessage="Fecha en que se registra el vehículo"
                            type="date"
                            required={true}
                        />

                        <InputWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="fechaExpiracion"
                            label="Fecha de Expiración"
                            tooltipMessage="Fecha en que expira el registro del vehículo"
                            type="date"
                            required={true}
                        />
                    </div>
                </div>
            </form>

            {/* Footer con botones */}
            <FooterForm
                onSubmit={handleCrearVehiculo}
                isSubmitting={isSubmitting}
                buttonText="Registrar Vehículo"
            />
        </div>
    );
};

export default VehiculoForm;