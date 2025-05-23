import React from 'react';
import LoadingSpinner from '../../../components/common/LoadingSpinner'; // Asume que existe este componente
import AreaComunForm from '../../../components/Forms/AreaComunForm';
import useAreaComunForm from '../../../hooks/AreasComunes/CrearAreaComun/useAreaComunForm'; // Asume que existe este hook
import { Header } from '../../../components/common/Header';

const CrearAreaComun = () => {
    const formLogic = useAreaComunForm();

    return (
        <div className="container mx-auto mt-8 px-4">
            {formLogic.loading ? (
                <LoadingSpinner />
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Header title="Crear Nueva Area Comun" />

                    <div className="p-6">
                        {/* Formulario de Area Comun*/}
                        <AreaComunForm {...formLogic} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrearAreaComun;