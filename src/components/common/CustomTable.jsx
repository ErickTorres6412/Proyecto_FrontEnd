import React from 'react';
import { ArrowUpDown, Info, Search, Filter, ChevronDown, Eye } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const CustomTable = ({
  columns,
  data,
  loading,
  sortConfig,
  onSort,
  onRowAction,
  responsive = true,
  actionButtonText = 'Ver Más',
  emptyMessage = 'No hay datos disponibles',
  renderAction,
  title,
  subtitle,
  showFilters = false,
  onSearch,
  pagination = null,
}) => {
  // Referencia para el contenedor de la tabla
  const tableRef = React.useRef(null);
  const [hoveredRow, setHoveredRow] = React.useState(null);

  // Efecto de desplazamiento suave para la tabla
  React.useEffect(() => {
    if (tableRef.current) {
      const handleScroll = () => {
        const tableContainer = tableRef.current;
        if (tableContainer.scrollLeft > 0) {
          tableContainer.classList.add('has-scrolled-left');
        } else {
          tableContainer.classList.remove('has-scrolled-left');
        }

        if (tableContainer.scrollLeft + tableContainer.clientWidth < tableContainer.scrollWidth - 1) {
          tableContainer.classList.add('has-scrolled-right');
        } else {
          tableContainer.classList.remove('has-scrolled-right');
        }
      };
      
      const tableContainer = tableRef.current;
      tableContainer.addEventListener('scroll', handleScroll);
      // Dispara el evento inicialmente para configurar correctamente las clases
      handleScroll();
      
      return () => {
        tableContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [data]);
  
  const renderHeader = () => (
    <thead className="bg-white text-sm border-b" style={{ borderColor: "var(--color-sidebar-bg)" }}>
      <tr>
        {columns.map((column) => (
          <th 
            key={column.key} 
            onClick={() => onSort && onSort(column.key)}
            className={`px-4 py-3 font-medium text-left cursor-pointer transition-colors ${column.width ? column.width : ''}`}
            style={{ color: "var(--color-text-dark)" }}
          >
            <div className="flex items-center gap-1 group">
              {column.label}
              {sortConfig?.key === column.key ? (
                <ArrowUpDown 
                  size={14} 
                  className="transform transition-transform duration-200 ml-1"
                  style={{
                    color: "var(--color-primary)",
                    transform: sortConfig.direction === "descending" ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              ) : (
                <ArrowUpDown 
                  size={14} 
                  className="opacity-0 group-hover:opacity-70 transition-opacity duration-200 ml-1"
                  style={{ color: "var(--color-text-muted)" }}
                />
              )}
            </div>
          </th>
        ))}
        {(onRowAction || renderAction) && (
          <th 
            className="px-4 py-3 font-medium border-b text-center whitespace-nowrap w-24"
            style={{ color: "var(--color-text-dark)", borderColor: "var(--color-sidebar-bg)" }}
          >
            Acciones
          </th>
        )}
      </tr>
    </thead>
  );

  const renderRows = () => (
    <tbody className="text-sm">
      {loading ? (
        <tr>
          <td 
            colSpan={columns.length + (onRowAction || renderAction ? 1 : 0)} 
            className="text-center py-16"
          >
            <div className="flex flex-col items-center justify-center">
              <LoadingSpinner />
              <p className="mt-4 font-medium" style={{ color: "var(--color-text-muted)" }}>
                Cargando datos...
              </p>
            </div>
          </td>
        </tr>
      ) : data.length > 0 ? (
        data.map((row, index) => (
          <tr
            key={row.id || index}
            className="group transition-colors duration-150 animate-fadeIn"
            style={{
              animationDelay: `${index * 50}ms`,
              backgroundColor: hoveredRow === (row.id || index) ? "var(--color-sidebar-bg)" : "white",
            }}
            onMouseEnter={() => setHoveredRow(row.id || index)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {columns.map((column) => (
              <td 
                key={column.key} 
                className="px-4 py-3 border-b transition-colors"
                style={{
                  borderColor: "var(--color-sidebar-bg)",
                  color: "var(--color-text-dark)",
                }}
              >
                {column.render ? column.render(row) : row[column.key]}
              </td>
            ))}
            {(onRowAction || renderAction) && (
              <td 
                className="px-4 py-3 border-b text-center transition-colors"
                style={{ borderColor: "var(--color-sidebar-bg)" }}
              >
                {renderAction ? (
                  renderAction(row)
                ) : (
                  <button
                    onClick={() => onRowAction(row)}
                    className="text-sm rounded flex items-center justify-center space-x-1 px-3 py-1.5 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:shadow-md"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-text-light)",
                    }}
                  >
                    <Eye size={14} className="mr-1" />
                    <span>{actionButtonText}</span>
                  </button>
                )}
              </td>
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td 
            colSpan={columns.length + (onRowAction || renderAction ? 1 : 0)} 
            className="text-center py-16 border-b"
            style={{ borderColor: "var(--color-sidebar-bg)" }}
          >
            <div className="flex flex-col items-center justify-center">
              <div 
                className="w-16 h-16 flex items-center justify-center rounded-full mb-3"
                style={{ backgroundColor: "var(--color-sidebar-bg)" }}
              >
                <Info size={24} style={{ color: "var(--color-primary)" }} />
              </div>
              <p className="font-medium" style={{ color: "var(--color-primary)" }}>
                {emptyMessage}
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
                Intente con diferentes criterios de búsqueda
              </p>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );

  const renderTableHeader = () => {
    if (!title && !showFilters) return null;
    
    return (
      <div 
        className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b animate-fadeIn"
        style={{ borderColor: "var(--color-sidebar-bg)" }}
      >
        {title && (
          <div className="mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-dark)" }}>
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {showFilters && (
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                size={15}
                style={{ color: "var(--color-primary)" }}
              />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 rounded-lg transition-all duration-200 border focus:ring-2 focus:border-transparent"
                style={{
                  borderColor: "var(--color-sidebar-bg)",
                  backgroundColor: "white",
                  color: "var(--color-text-dark)",
                  boxShadow: "var(--shadow-sm)",
                }}
                onChange={(e) => onSearch && onSearch(e.target.value)}
              />
            </div>
            <button 
              className="rounded-lg px-3 py-2 flex items-center space-x-1 transition-colors text-sm border hover:shadow-md"
              style={{
                backgroundColor: "white",
                borderColor: "var(--color-sidebar-bg)",
                color: "var(--color-text-dark)",
              }}
            >
              <Filter size={15} style={{ color: "var(--color-primary)" }} />
              <span className="ml-1">Filtros</span>
              <ChevronDown size={15} style={{ color: "var(--color-text-muted)" }} className="ml-1" />
            </button>
          </div>
        )}
      </div>
    );
  };
  
  const renderPagination = () => {
    if (!pagination) return null;
    
    const { currentPage, totalPages, onPageChange } = pagination;
    
    return (
      <div 
        className="px-6 py-3 border-t flex items-center justify-between animate-fadeIn"
        style={{
          borderColor: "var(--color-sidebar-bg)",
          animationDelay: "300ms",
        }}
      >
        <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Mostrando página {currentPage} de {totalPages}
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-3 py-1.5 rounded-md border transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              borderColor: "var(--color-sidebar-bg)",
              backgroundColor: "white",
              color: "var(--color-text-dark)",
            }}
          >
            Anterior
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            // Lógica para mostrar las páginas adecuadas alrededor de la página actual
            let page;
            if (totalPages <= 5) {
              page = i + 1;
            } else if (currentPage <= 3) {
              page = i + 1;
            } else if (currentPage >= totalPages - 2) {
              page = totalPages - 4 + i;
            } else {
              page = currentPage - 2 + i;
            }
            
            const isActive = page === currentPage;
            
            return (
              <button
                key={i}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 ${
                  isActive ? "shadow-sm" : "hover:bg-gray-50"
                }`}
                style={{
                  background: isActive ? "var(--gradient-primary)" : "white",
                  color: isActive ? "var(--color-text-light)" : "var(--color-text-dark)",
                  borderColor: "var(--color-sidebar-bg)",
                  border: isActive ? "none" : "1px solid var(--color-sidebar-bg)",
                }}
              >
                {page}
              </button>
            );
          })}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-3 py-1.5 rounded-md border transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              borderColor: "var(--color-sidebar-bg)",
              backgroundColor: "white",
              color: "var(--color-text-dark)",
            }}
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  };

  const table = (
    <table className="w-full border-collapse">
      {renderHeader()}
      {renderRows()}
    </table>
  );

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md border animate-fadeIn"
      style={{ borderColor: "var(--color-sidebar-bg)" }}
    >
      {renderTableHeader()}
      
      {responsive ? (
        <div 
          ref={tableRef}
          className="relative w-full overflow-x-auto"
          style={{
            backgroundImage: 'linear-gradient(to right, white, white), linear-gradient(to right, white, white), linear-gradient(to right, rgba(219, 234, 239, 0.3), rgba(255, 255, 255, 0)), linear-gradient(to left, rgba(219, 234, 239, 0.3), rgba(255, 255, 255, 0))',
            backgroundPosition: 'left center, right center, left center, right center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '20px 100%, 20px 100%, 15px 100%, 15px 100%',
            backgroundAttachment: 'local, local, scroll, scroll',
            padding: '0px 25px',
          }}
        >
          {table}
        </div>
      ) : (
        table
      )}
      
      {renderPagination()}
      
      <style jsx>{`
        .has-scrolled-left {
          box-shadow: inset 10px 0 8px -8px rgba(79, 130, 177, 0.15);
        }
        .has-scrolled-right {
          box-shadow: inset -10px 0 8px -8px rgba(79, 130, 177, 0.15);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default CustomTable;