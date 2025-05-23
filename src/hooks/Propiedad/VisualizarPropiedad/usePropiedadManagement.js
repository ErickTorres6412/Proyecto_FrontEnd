import { useEffect, useCallback, useMemo } from 'react';
import useModal from '../../visualizarHooks/useModal';
import { usePropiedades } from './usePropiedad';
import useSearch from '../../visualizarHooks/useSearch';

export const usePropiedadManagement = () => {
  const { isOpen, toggle } = useModal();

  const {
    propiedades,
    selectedPropiedad,
    loading,
    modalLoading,
    getAllPropiedades,
    fetchPropiedadDetails,
    handlePropiedadUpdate
  } = usePropiedades();

  const condominioValues = useMemo(() => {
    return [...new Set(propiedades.map(p => p.condominio?.nombre || 'Sin nombre'))];
  }, [propiedades]);

  const {
    searchTerm,
    selectedFilter: selectedCondominioFilter,
    handleSearchChange,
    handleFilterChange,
    filteredItems
  } = useSearch(propiedades, {
    filterValues: condominioValues,
    valueExtractor: propiedad => propiedad.condominio?.nombre || ''
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
        await getAllPropiedades();
      } catch (error) {
        console.error('Error fetching propiedades:', error);
      }
    };

    fetchData();
  }, [getAllPropiedades]);

  const handleVerPropiedad = useCallback(
    async (propiedad) => {
      toggle();
      await fetchPropiedadDetails(propiedad.propiedadID);
    },
    [toggle, fetchPropiedadDetails]
  );

  return {
    isOpen,
    toggle,
    propiedades: filteredItems,
    selectedPropiedad,
    loading,
    modalLoading,
    searchTerm,
    selectedCondominioFilter,
    handleSearchChange,
    handleFilterChange,
    handleVerPropiedad,
    handlePropiedadUpdate,
    getCondominioOptions
  };
};
