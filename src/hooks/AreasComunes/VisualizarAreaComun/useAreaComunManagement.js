import { useEffect, useCallback, useMemo } from 'react';
import useModal from '../../visualizarHooks/useModal';
import { useAreaComun } from './useAreaComun';
import useSearch from '../../visualizarHooks/useSearch';

export const useAreaComunManagement = () => {
  const { isOpen, toggle } = useModal();
  const {
    areasComunes,
    selectedAreaComun,
    loading,
    modalLoading,
    getAllAreasComunes,
    fetchAreaComunDetails,
    handleAreaComunUpdate
  } = useAreaComun();

  // Obtener nombres de condominios únicos como filtros
  const condominioValues = useMemo(() => {
    return [...new Set(areasComunes.map(area => area.condominio?.nombre || 'Sin nombre'))];
  }, [areasComunes]);

  const {
    searchTerm,
    selectedFilter: selectedCondominioFilter,
    handleSearchChange,
    handleFilterChange,
    filteredItems
  } = useSearch(areasComunes, {
    filterValues: condominioValues,
    valueExtractor: (area) => area.condominio?.nombre || ''
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
        await getAllAreasComunes();
      } catch (error) {
        console.error('Error fetching áreas comunes:', error);
      }
    };

    fetchData();
  }, [getAllAreasComunes]);

  const handleVerAreaComun = useCallback(
    async (area) => {
      toggle();
      await fetchAreaComunDetails(area.areaComunID);
    },
    [toggle, fetchAreaComunDetails]
  );

  return {
    isOpen,
    toggle,
    areasComunes: filteredItems,
    selectedAreaComun,
    loading,
    modalLoading,
    searchTerm,
    selectedCondominioFilter,
    handleSearchChange,
    handleFilterChange,
    handleVerAreaComun,
    handleAreaComunUpdate,
    getCondominioOptions
  };
};
