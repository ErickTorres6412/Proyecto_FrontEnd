import React from 'react';
import { usePropiedadManagement } from '../../../hooks/Propiedad/VisualizarPropiedad/usePropiedadManagement';
import { Header } from '../../../components/common/Header';
import { ListContainer } from '../../../components/common/ListContainer';
import PropiedadTable from '../../../components/Tables/PropiedadesTable';
import PropiedadModal from '../../../components/Modals/PropiedadModal';
import SearchAndFilterBar from '../../../components/common/SearchAndFilterBar';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const VisualizarPropiedad = () => {
  const {
    isOpen,
    toggle,
    propiedades,
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
  } = usePropiedadManagement();

  return (
    <div className="flex flex-col h-full">
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="p-4">
            <Header title="Visualizar Propiedades" />

            <SearchAndFilterBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              filterValue={selectedCondominioFilter}
              onFilterChange={handleFilterChange}
              filterOptions={getCondominioOptions()}
              filterLabel="Filtrar por condominio"
              searchPlaceholder="Buscar propiedades..."
            />

            <ListContainer>
              <PropiedadTable
                propiedades={propiedades}
                loading={loading}
                onRowAction={handleVerPropiedad}
              />
            </ListContainer>
          </div>

          {isOpen && (
            <PropiedadModal
              isOpen={isOpen}
              toggle={toggle}
              propiedad={selectedPropiedad}
              loading={modalLoading}
              onUpdate={handlePropiedadUpdate}
            />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(VisualizarPropiedad);
