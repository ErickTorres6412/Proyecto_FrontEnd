import React from 'react';
import CustomTable from '../common/CustomTable';
import TablePagination from '../common/TablePagination';
import useTable from '../../hooks/visualizarHooks/useTable';
import ActionButton from '../common/ActionButton';
import { Eye, Map } from 'lucide-react';

const SectorTable = ({ sectores, loading, onRowAction }) => {
    const { currentPage, paginatedItems, handlePageChange, sortConfig, handleSort } = useTable(sectores, 10);

    const columns = [
        {
            key: 'nombre',
            label: 'Nombre',
            render: (row) => row.nombre
        },
        {
            key: 'condominio',
            label: 'Condominio',
            render: (row) => row.condominio?.nombre || 'Sin asignar'
        },
        {
            key: 'direccion',
            label: 'Dirección',
            render: (row) => row.condominio?.direccion || '—'
        },
        {
            key: 'id',
            label: 'ID',
            render: (row) => row.sectorID
        },
        {
            key: 'actions',
            label: 'Acciones',
            render: (row) => (
                <ActionButton
                    onClick={() => onRowAction(row)}
                    icon={<Eye size={14} />}
                    text="Ver Más"
                />
            )
        }
    ];

    return (
        <>
            <CustomTable
                columns={columns}
                data={paginatedItems}
                loading={loading}
                sortConfig={sortConfig}
                onSort={handleSort}
                emptyMessage="No hay sectores registrados"
                icon={<Map className="h-10 w-10 text-gray-300" />}
            />
            <TablePagination
                currentPage={currentPage}
                totalItems={sectores.length}
                itemsPerPage={10}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default SectorTable;