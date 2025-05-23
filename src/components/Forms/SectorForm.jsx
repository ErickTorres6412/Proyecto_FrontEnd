import React from 'react';
import InputWithHelp from '../common/InputWithHelp';
import FooterForm from '../common/FooterForm';
import SelectWithHelp from '../common/SelectWithHelp';

const SectorForm = ({
    formData,
    errors,
    condominios = [],
    isSubmitting,
    handleInputChange,
    handleCrearSector
}) => {
    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <form>
                {/* Sección de Datos del Sector */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                    <h4 className="text-blue-900 text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
                        Datos del Sector
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="nombre"
                            label="Nombre"
                            tooltipMessage="Ingrese el nombre del sector"
                            required={true}
                        />

                        <SelectWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="condominioID"
                            label="Condominio"
                            tooltipMessage="Selecciona el condominio correspondiente"
                            options={condominios}
                            valueKey="condominioID"
                            labelKey="nombre"
                            placeholder="Selecciona un condominio"
                            required={true}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <InputWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="fechaRegistro"
                            label="Fecha de Registro"
                            tooltipMessage="Fecha de creación o registro del sector"
                            type="date"
                            required={true}
                        />
                    </div>
                </div>
            </form>

            {/* Footer con botones */}
            <FooterForm
                onSubmit={handleCrearSector}
                isSubmitting={isSubmitting}
                buttonText="Crear Sector"
            />
        </div>
    );
};

export default SectorForm;
