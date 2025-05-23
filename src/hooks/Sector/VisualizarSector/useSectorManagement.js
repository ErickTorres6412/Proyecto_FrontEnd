import { useEffect, useCallback, useMemo } from 'react';
import useModal from '../../visualizarHooks/useModal';
import { useSectores } from './useSectores';
import useSearch from '../../visualizarHooks/useSearch';

export const useSectorManagement = () => {
  const { isOpen, toggle } = useModal();

  const {
    sectores,
    selectedSector,
    loading,
    modalLoading,
    getAllSectores,
    fetchSectorDetails,
    handleSectorUpdate
  } = useSectores();

  // Obtener nombres únicos de condominios para filtro
  const condominioValues = useMemo(() => {
    return [...new Set(sectores.map(sec => sec.condominio?.nombre || 'Sin nombre'))];
  }, [sectores]);

  

  const {
    searchTerm,
    selectedFilter: selectedCondominioFilter,
    handleSearchChange,
    handleFilterChange,
    filteredItems
  } = useSearch(sectores, {
    filterValues: condominioValues,
    valueExtractor: sector => sector.condominio?.nombre || ''
  });

 const getCondominioOptions = useCallback(
    () => [
      { value: '', label: 'Todos los condominios' },
      ...condominioValues.map(nombre => ({ value: nombre, label: nombre }))
    ],
    [condominioValues]
  );


  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllSectores();
      } catch (error) {
        console.error('Error fetching sectores:', error);
      }
    };

    fetchData();
  }, [getAllSectores]);

  const handleVerSector = useCallback(
    async (sector) => {
      toggle();
      await fetchSectorDetails(sector.sectorID);
    },
    [toggle, fetchSectorDetails]
  );

  return {
    isOpen,
    toggle,
    sectores: filteredItems,
    selectedSector,
    loading,
    modalLoading,
    searchTerm,
    selectedCondominioFilter,
    handleSearchChange,
    handleFilterChange,
    handleVerSector,
    handleSectorUpdate,
    getCondominioOptions
  };
};
