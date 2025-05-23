import React from 'react';
import { useAreaComunManagement } from '../../../hooks/AreasComunes/VisualizarAreaComun/useAreaComunManagement';
import { Header } from '../../../components/common/Header';
import { ListContainer } from '../../../components/common/ListContainer';
import AreasComunesTable from '../../../components/Tables/AreaComunTable';
import AreaComunModal from '../../../components/Modals/AreaComunModal';
import SearchAndFilterBar from '../../../components/common/SearchAndFilterBar';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const VisualizarAreasComunes = () => {
  const {
    isOpen,
    toggle,
    areasComunes,
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
  } = useAreaComunManagement();

  return (
    <div className="flex flex-col h-full">
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="p-4">
            <Header title="Visualizar Áreas Comunes" />

            <SearchAndFilterBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              filterValue={selectedCondominioFilter}
              onFilterChange={handleFilterChange}
              filterOptions={getCondominioOptions()}
              filterLabel="Filtrar por condominio"
              searchPlaceholder="Buscar áreas comunes..."
            />

            <ListContainer>
              <AreasComunesTable
                areasComunes={areasComunes}
                loading={loading}
                onRowAction={handleVerAreaComun}
              />
            </ListContainer>
          </div>

          {isOpen && (
            <AreaComunModal
              isOpen={isOpen}
              toggle={toggle}
              areaComun={selectedAreaComun}
              loading={modalLoading}
              onUpdate={handleAreaComunUpdate}
            />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(VisualizarAreasComunes);
