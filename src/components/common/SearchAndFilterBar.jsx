import React from 'react';
import { Search, Filter } from 'lucide-react';

const SearchAndFilterBar = ({
  searchTerm,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions = [],
  searchPlaceholder = 'Buscar...',
  showFilter = true
}) => {
  // Determinar si mostramos el filtro basado en la prop showFilter y si hay opciones
  const displayFilter = showFilter && filterOptions && filterOptions.length > 0;

  return (
    <div className="bg-white shadow-md p-4 mb-4">
      <div
        className="flex flex-col md:flex-row gap-4 p-5 border-b rounded-md shadow-sm w-full transition-all duration-300"
        style={{
          background: "var(--color-sidebar-bg)",
          borderColor: "var(--color-primary-light)",
        }}
      >
        {/* Esta div tomará el ancho completo si no hay filtro */}
        <div className={`${displayFilter ? 'md:w-2/3' : 'w-full'} animate-fadeIn`}>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search
                size={18}
                style={{ color: "var(--color-primary)" }}
              />
            </div>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-white border-2 rounded-lg focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
              style={{
                borderColor: "var(--color-primary-light)",
                color: "var(--color-text-dark)",
              }}
            />
          </div>
        </div>

        {/* El filtro solo se muestra si displayFilter es true */}
        {displayFilter && (
          <div className="md:w-1/3 animate-fadeIn">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Filter
                  size={16}
                  style={{ color: "var(--color-primary)" }}
                />
              </div>
              <select
                value={filterValue}
                onChange={(e) => onFilterChange(e.target.value)}
                className="w-full h-11 pl-10 pr-10 bg-white border-2 rounded-lg focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer font-medium appearance-none"
                style={{
                  borderColor: "var(--color-primary-light)",
                  color: "var(--color-text-dark)",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234F82B1' strokeWidth='2'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundPosition: "right 0.75rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1em 1em",
                  paddingRight: "2.5rem",
                }}
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
      `}</style>
      </div>
    </div>
  );
};

export default SearchAndFilterBar;