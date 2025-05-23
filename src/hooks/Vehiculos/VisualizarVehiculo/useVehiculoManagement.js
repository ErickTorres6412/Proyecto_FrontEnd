import { useEffect, useCallback } from 'react';
import useModal from '../../visualizarHooks/useModal';
import { useVehiculos } from './useVehiculos';
import useSearch from '../../visualizarHooks/useSearch';

export const useVehiculoManagement = () => {
  const { isOpen, toggle } = useModal();
  const {
    vehiculos,
    selectedVehiculo,
    loading,
    modalLoading,
    getAllVehiculos,
    fetchVehiculoDetails,
    handleVehiculoUpdate
  } = useVehiculos();

  const {
    searchTerm,
    handleSearchChange,
    filteredItems
  } = useSearch(vehiculos, ['placa', 'tipo', 'propiedadNumero']); // Campos de búsqueda específicos para vehículos

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllVehiculos();
      } catch (error) {
        console.error('Error fetching vehiculos:', error);
      }
    };

    fetchData();
  }, [getAllVehiculos]);

  const handleVerVehiculo = useCallback(
    async (vehiculo) => {
      toggle();
      await fetchVehiculoDetails(vehiculo.vehiculoID);
    },
    [toggle, fetchVehiculoDetails]
  );

  return {
    isOpen,
    toggle,
    vehiculos: filteredItems,
    selectedVehiculo,
    loading,
    modalLoading,
    searchTerm,
    handleSearchChange,
    handleVerVehiculo,
    handleVehiculoUpdate
  };
};