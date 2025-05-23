import React from 'react';
import LoadingSpinner from '../../../components/common/LoadingSpinner'; // Asume que existe este componente
import SectorForm from '../../../components/Forms/SectorForm';
import useSectorForm from '../../../hooks/Sector/CrearSector/useSectorForm';
import { Header } from '../../../components/common/Header';

const CrearSector = () => {
    const formLogic = useSectorForm();

    return (
        <div className="container mx-auto mt-8 px-4">
            {formLogic.isSubmitting ? (
                <LoadingSpinner />
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Header title="Crear Nuevo Sector" />

                    <div className="p-6">
                        {/* Formulario de Sector */}
                        <SectorForm {...formLogic} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrearSector;