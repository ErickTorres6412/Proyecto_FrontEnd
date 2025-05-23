import React from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ForoForm from '../../components/Forms/ForoForm';
import useForoForm from '../../hooks/Foro/useForoForm';
import { Header } from '../../components/common/Header';

const CrearTemaForo = () => {
    const formLogic = useForoForm();

    return (
        <div className="container mx-auto mt-8 px-4">
            {formLogic.isSubmitting ? (
                <LoadingSpinner />
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Header title="Crear Nuevo Tema" />

                    <div className="p-6">
                        <ForoForm {...formLogic} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrearTemaForo;