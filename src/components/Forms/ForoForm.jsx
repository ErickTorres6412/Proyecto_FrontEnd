import React from 'react';
import InputWithHelp from '../common/InputWithHelp';
import FooterForm from '../common/FooterForm';

const ForoForm = ({
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleCrearTema
}) => {
    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <form>
                {/* Sección de Datos del Tema */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                    <h4 className="text-blue-900 text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
                        Crear Nuevo Tema de Discusión
                    </h4>

                    <div className="mb-4">
                        <InputWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="titulo"
                            label="Título"
                            tooltipMessage="Escribe un título descriptivo para tu tema"
                            required={true}
                        />
                    </div>

                    <div className="mb-2">
                        <InputWithHelp
                            object={formData}
                            errors={errors}
                            handleChange={handleInputChange}
                            name="contenido"
                            label="Contenido"
                            tooltipMessage="Detalla tu pregunta o tema de discusión"
                            type="textarea"
                            rows={6}
                            required={true}
                        />
                    </div>
                </div>
            </form>

            {/* Footer con botones */}
            <FooterForm
                onSubmit={handleCrearTema}
                isSubmitting={isSubmitting}
                buttonText="Publicar Tema"
            />
        </div>
    );
};

export default ForoForm;