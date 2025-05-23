import React from 'react';
import InputWithHelp from '../common/InputWithHelp';
import FooterForm  from '../common/FooterForm';

const CondominioForm = ({
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleCrearCondominio
}) => {
    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <form>
                {/* Sección de Datos del Condominio */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                    <h4 className="text-blue-900 text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
                        Datos del Condominio
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="nombre"
                            label="Nombre"
                            tooltipMessage="Ingrese el nombre del condominio"
                            required={true}
                        />
                        
                        <InputWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="fechaRegistro"
                            label="Fecha de Registro"
                            tooltipMessage="Fecha de registro del condominio"
                            type="date"
                        />
                    </div>

                    <div className="mt-2">
                        <InputWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="direccion"
                            label="Dirección"
                            tooltipMessage="Ingrese la dirección completa del condominio"
                            required={true}
                        />
                    </div>
                </div>
            </form>

            {/* Footer con botones (componente reutilizable) */}
            <FooterForm
                onSubmit={handleCrearCondominio}
                isSubmitting={isSubmitting}
                buttonText="Crear Condominio"
            />
        </div>
    );
};

export default CondominioForm;