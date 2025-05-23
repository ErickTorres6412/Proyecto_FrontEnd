import React from 'react';
import { useVehiculoManagement } from '../../../hooks/Vehiculos/VisualizarVehiculo/useVehiculoManagement';
import { Header } from '../../../components/common/Header';
import { ListContainer } from '../../../components/common/ListContainer';
import VehiculosTable from '../../../components/Tables/VehiculosTable';
import VehiculoModal from '../../../components/Modals/VehiculoModal';
import SearchAndFilterBar from '../../../components/common/SearchAndFilterBar';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const VisualizarVehiculos = () => {
    const {
        isOpen,
        toggle,
        vehiculos,
        selectedVehiculo,
        loading,
        modalLoading,
        searchTerm,
        handleSearchChange,
        handleVerVehiculo,
        handleVehiculoUpdate
    } = useVehiculoManagement();

    return (
        <div className="flex flex-col h-full">
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    <div className="p-4">
                        <Header title="Gestión de Vehículos" subtitle="Administra la información de los vehículos registrados" />

                        <SearchAndFilterBar
                            searchTerm={searchTerm}
                            onSearchChange={handleSearchChange}
                            showFilter={false}
                            searchPlaceholder="Buscar por placa, tipo o propiedad..."
                        />

                        <ListContainer>
                            <VehiculosTable
                                vehiculos={vehiculos}
                                loading={loading}
                                onRowAction={handleVerVehiculo}
                            />
                        </ListContainer>
                    </div>

                    {isOpen && (
                        <VehiculoModal
                            isOpen={isOpen}
                            toggle={toggle}
                            vehiculo={selectedVehiculo}
                            loading={modalLoading}
                            onUpdate={handleVehiculoUpdate}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default React.memo(VisualizarVehiculos);