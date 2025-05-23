import { useState, useCallback, useMemo } from 'react';

export const useSearch = (
  items,
  options = {
    filterValues: null,     // Array de valores para filtrar
    valueExtractor: null    // Función para extraer el valor a filtrar
  }
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const handleFilterChange = useCallback((value) => {
    setSelectedFilter(value);
  }, []);

  const filteredItems = useMemo(() => {
    if (!items) return [];
    
    return items.filter((item) => {
      // Búsqueda en todos los campos
      const matchesSearch = searchTerm === '' || 
        Object.entries(item).some(([_, value]) =>
          value && 
          typeof value === 'string' && 
          value.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Filtro usando el array de valores
      const matchesFilter = selectedFilter === '' || (() => {
        if (!options.filterValues) return true;
        
        const itemValue = options.valueExtractor ? 
          options.valueExtractor(item) : 
          options.filterValues.find(filterValue => 
            Object.entries(item).some(([_, value]) => value === filterValue)
          );

        return itemValue === selectedFilter;
      })();

      return matchesSearch && matchesFilter;
    });
  }, [items, searchTerm, selectedFilter, options]);

  return {
    searchTerm,
    selectedFilter,
    handleSearchChange,
    handleFilterChange,
    filteredItems
  };
};

export default useSearch;