import React from 'react';
import CustomTable from '../common/CustomTable';
import TablePagination from '../common/TablePagination';
import useTable from '../../hooks/visualizarHooks/useTable';
import ActionButton from '../common/ActionButton';
import { Eye } from 'lucide-react';

const AreaComunTable = ({ areasComunes, loading, onRowAction }) => {
    const { currentPage, paginatedItems, handlePageChange, sortConfig, handleSort } = useTable(areasComunes, 10);

    const columns = [
        {
            key: 'nombre',
            label: 'Nombre',
            render: (row) => row.nombre
        },
        {
            key: 'capacidad',
            label: 'Capacidad',
            render: (row) => row.capacidad ?? 'No definida'
        },
        {
            key: 'reglas',
            label: 'Reglas',
            render: (row) => row.reglas || '—'
        },
        {
            key: 'condominio',
            label: 'Condominio',
            render: (row) => row.condominio?.nombre || 'Sin asignar'
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
            />
            <TablePagination
                currentPage={currentPage}
                totalItems={areasComunes.length}
                itemsPerPage={10}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default AreaComunTable;
