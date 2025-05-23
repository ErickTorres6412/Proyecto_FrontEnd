import React from 'react';
import { useCondominioManagement } from '../../../hooks/Condominios/visualizarCondominios/useCondominioManagement';
import { Header } from '../../../components/common/Header';
import { ListContainer } from '../../../components/common/ListContainer';
import CondominiosTable from '../../../components/Tables/CondominiosTable';
import CondominioModal from '../../../components/Modals/CondominioModal';
import SearchAndFilterBar from '../../../components/common/SearchAndFilterBar';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const VisualizarCondominios = () => {
    const {
        isOpen,
        toggle,
        condominios,
        selectedCondominio,
        loading,
        modalLoading,
        searchTerm,
        handleSearchChange,
        handleVerCondominio,
        handleCondominioUpdate
    } = useCondominioManagement();

    return (
        <div className="flex flex-col h-full">
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    <div className="p-4">
                        <Header title="Gestión de Condominios" subtitle="Administra la información de los condominios" />

                        <SearchAndFilterBar
                            searchTerm={searchTerm}
                            onSearchChange={handleSearchChange}
                            showFilter={false}
                            searchPlaceholder="Buscar condominios..."
                        />

                        <ListContainer>
                            <CondominiosTable
                                condominios={condominios}
                                loading={loading}
                                onRowAction={handleVerCondominio}
                            />
                        </ListContainer>
                    </div>

                    {isOpen && (
                        <CondominioModal
                            isOpen={isOpen}
                            toggle={toggle}
                            condominio={selectedCondominio}
                            loading={modalLoading}
                            onUpdate={handleCondominioUpdate}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default React.memo(VisualizarCondominios);