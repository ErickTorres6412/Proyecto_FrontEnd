import React from 'react';
import LoadingSpinner from '../../../components/common/LoadingSpinner'; // Asume que existe este componente
import VehiculoForm from '../../../components/Forms/VehiculoForm';
import useVehiculoForm from '../../../hooks/Vehiculos/CrearVehiculo/useVehiculoForm'; // El hook que acabamos de crear
import { Header } from '../../../components/common/Header';

const CrearVehiculo = () => {
    const formLogic = useVehiculoForm();

    return (
        <div className="container mx-auto mt-8 px-4">
            {formLogic.isSubmitting ? (
                <LoadingSpinner />
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Header title="Registrar Nuevo Vehículo" />

                    <div className="p-6">
                        {/* Formulario de Vehículo */}
                        <VehiculoForm {...formLogic} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrearVehiculo;