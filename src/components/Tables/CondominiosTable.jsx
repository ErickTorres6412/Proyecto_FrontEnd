import React from 'react';
import CustomTable from '../common/CustomTable';
import TablePagination from '../common/TablePagination';
import useTable from '../../hooks/visualizarHooks/useTable';
import ActionButton from '../common/ActionButton';
import { Eye} from "lucide-react"

const CondominiosTable = ({ condominios, loading, onRowAction }) => {
  const { currentPage, paginatedItems, handlePageChange, sortConfig, handleSort } = useTable(condominios, 10);

  const columns = [
    {
      key: 'nombre',
      label: 'Nombre',
      render: (row) => row.nombre
    },
    {
      key: 'direccion',
      label: 'Dirección',
      render: (row) => row.direccion || 'No definida'
    },
    {
      key: 'fechaRegistro',
      label: 'Fecha Registro',
      render: (row) => row.fechaRegistro
        ? new Date(row.fechaRegistro).toLocaleDateString()
        : 'Sin fecha'
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
        totalItems={condominios.length}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default CondominiosTable;