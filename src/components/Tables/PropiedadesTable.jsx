import React from 'react';
import CustomTable from '../common/CustomTable';
import TablePagination from '../common/TablePagination';
import useTable from '../../hooks/visualizarHooks/useTable';
import ActionButton from '../common/ActionButton';
import { Eye, Home } from 'lucide-react';

const PropiedadTable = ({ propiedades, loading, onRowAction }) => {
    const { currentPage, paginatedItems, handlePageChange, sortConfig, handleSort } = useTable(propiedades, 10);

    const columns = [
        {
            key: 'numero',
            label: 'Número',
            render: (row) => row.numero
        },
        {
            key: 'tipo',
            label: 'Tipo',
            render: (row) => row.tipo
        },
        {
            key: 'caracteristicas',
            label: 'Características',
            render: (row) => row.caracteristicas || '—'
        },
        {
            key: 'fechaRegistro',
            label: 'Fecha de Registro',
            render: (row) => new Date(row.fechaRegistro).toLocaleDateString()
        },
        {
            key: 'sector',
            label: 'Sector',
            render: (row) => row.sector?.nombre || 'Sin asignar'
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
                emptyMessage="No hay propiedades registradas"
                icon={<Home className="h-10 w-10 text-gray-300" />}
            />
            <TablePagination
                currentPage={currentPage}
                totalItems={propiedades.length}
                itemsPerPage={10}
                onPageChange={handlePageChange}
            />
        </>
    );
};

export default PropiedadTable;
