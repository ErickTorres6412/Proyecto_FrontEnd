import React from 'react';
import { useSectorManagement } from '../../../hooks/Sector/VisualizarSector/useSectorManagement';
import { Header } from '../../../components/common/Header';
import { ListContainer } from '../../../components/common/ListContainer';
import SectoresTable from '../../../components/Tables/SectorTable';
import SectorModal from '../../../components/Modals/SectorModal';
import SearchAndFilterBar from '../../../components/common/SearchAndFilterBar';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const VisualizarSectores = () => {
  const {
    isOpen,
    toggle,
    sectores,
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
  } = useSectorManagement();

  return (
    <div className="flex flex-col h-full">
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="p-4">
            <Header title="Visualizar Sectores" />

            <SearchAndFilterBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              filterValue={selectedCondominioFilter}
              onFilterChange={handleFilterChange}
              filterOptions={getCondominioOptions()}
              filterLabel="Filtrar por condominio"
              searchPlaceholder="Buscar sectores..."
            />

            <ListContainer>
              <SectoresTable
                sectores={sectores}
                loading={loading}
                onRowAction={handleVerSector}
              />
            </ListContainer>
          </div>

          {isOpen && (
            <SectorModal
              isOpen={isOpen}
              toggle={toggle}
              sector={selectedSector}
              loading={modalLoading}
              onUpdate={handleSectorUpdate}
            />
          )}
        </>
      )}
    </div>
  );
};

export default React.memo(VisualizarSectores);