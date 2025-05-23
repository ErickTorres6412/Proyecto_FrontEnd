import React from 'react';
import LoadingSpinner from '../../../components/common/LoadingSpinner'; // Asume que existe este componente
import CondominioForm from '../../../components/Forms/CondominioForm';
import useCondominioForm from '../../../hooks/Condominios/CrearCondominio/useCondominioForm'; // Asume que existe este hook
import { Header } from '../../../components/common/Header';

const CrearCondominio = () => {
    const formLogic = useCondominioForm();

    return (
        <div className="container mx-auto mt-8 px-4">
            {formLogic.loading ? (
                <LoadingSpinner />
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Header title="Crear Nuevo Condominio" />

                    <div className="p-6">
                        {/* Formulario de Condominio */}
                        <CondominioForm {...formLogic} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrearCondominio;