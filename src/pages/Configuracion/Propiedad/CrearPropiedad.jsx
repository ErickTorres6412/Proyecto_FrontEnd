import React from 'react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import PropiedadForm from '../../../components/Forms/PropiedadForm';
import usePropiedadForm from '../../../hooks/Propiedad/CrearPropiedad/usePropiedadForm';
import { Header } from '../../../components/common/Header';

const CrearPropiedad = () => {
  const formLogic = usePropiedadForm();

  return (
    <div className="container mx-auto mt-8 px-4">
      {formLogic.loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Header title="Crear Nueva Propiedad" />

          <div className="p-6">
            {/* Formulario de Propiedad */}
            <PropiedadForm {...formLogic} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CrearPropiedad;
