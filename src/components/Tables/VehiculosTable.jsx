import React from 'react';
import CustomTable from '../common/CustomTable';
import TablePagination from '../common/TablePagination';
import useTable from '../../hooks/visualizarHooks/useTable';
import ActionButton from '../common/ActionButton';
import { Eye } from "lucide-react";

const VehiculosTable = ({ vehiculos, loading, onRowAction }) => {
  const { currentPage, paginatedItems, handlePageChange, sortConfig, handleSort } = useTable(vehiculos, 10);

  const columns = [
    {
      key: 'propiedadNumero',
      label: 'Numero Propiedad',
      render: (row) => row.propiedad.numero || 'No definida'
    },
    {
      key: 'placa',
      label: 'Placa',
      render: (row) => row.placa || 'No definida'
    },
    {
      key: 'tipo',
      label: 'Tipo',
      render: (row) => row.tipo || 'No definido'
    },
    {
      key: 'fechaRegistro',
      label: 'Fecha Registro',
      render: (row) => row.fechaRegistro
        ? new Date(row.fechaRegistro).toLocaleDateString()
        : 'Sin fecha'
    },
    {
      key: 'fechaExpiracion',
      label: 'Fecha Expiración',
      render: (row) => row.fechaExpiracion
        ? new Date(row.fechaExpiracion).toLocaleDateString()
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
        totalItems={vehiculos.length}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default VehiculosTable;