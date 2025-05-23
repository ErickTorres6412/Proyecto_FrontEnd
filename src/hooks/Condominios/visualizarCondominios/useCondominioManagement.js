import { useEffect, useCallback } from 'react';
import useModal from '../../visualizarHooks/useModal';
import { useCondominios } from './useCondominios';
import useSearch from '../../visualizarHooks/useSearch';

export const useCondominioManagement = () => {
  const { isOpen, toggle } = useModal();
  const {
    condominios,
    selectedCondominio,
    loading,
    modalLoading,
    getAllCondominios,
    fetchCondominioDetails,
    handleCondominioUpdate
  } = useCondominios();

  const {
    searchTerm,
    handleSearchChange,
    filteredItems
  } = useSearch(condominios);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllCondominios();
      } catch (error) {
        console.error('Error fetching condominios:', error);
      }
    };

    fetchData();
  }, [getAllCondominios]);

  const handleVerCondominio = useCallback(
    async (condominio) => {
      toggle();
      await fetchCondominioDetails(condominio.condominioID);
    },
    [toggle, fetchCondominioDetails]
  );

  return {
    isOpen,
    toggle,
    condominios: filteredItems,
    selectedCondominio,
    loading,
    modalLoading,
    searchTerm,
    handleSearchChange,
    handleVerCondominio,
    handleCondominioUpdate
  };
};