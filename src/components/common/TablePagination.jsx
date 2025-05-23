"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const TablePagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const [showInput, setShowInput] = useState(false)
  const [inputPage, setInputPage] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showInput])

  const handleInputChange = (e) => {
    setInputPage(e.target.value)
  }

  const handleInputSubmit = (e) => {
    e.preventDefault()
    const pageNumber = Number.parseInt(inputPage, 10)
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber)
    }
    setShowInput(false)
    setInputPage("")
  }

  const handleBlur = () => {
    setShowInput(false)
  }

  // Estilos comunes para los botones de paginación
  const baseButtonClass = "flex items-center justify-center w-9 h-9 text-sm border transition-all duration-200"

  return (
    <div className="py-4 px-6 bg-white border-t" style={{ borderColor: "var(--color-sidebar-bg)" }}>
      <nav className="flex justify-center">
        <ul className="flex items-center space-x-1">
          {/* Botón Previous */}
          <li className="animate-fadeIn" style={{ animationDelay: "0ms" }}>
            <button
              className={`${baseButtonClass} rounded-l-md`}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                backgroundColor: currentPage === 1 ? "#f1f5f9" : "white",
                borderColor: "var(--color-sidebar-bg)",
                color: currentPage === 1 ? "var(--color-text-muted)" : "var(--color-text-dark)",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              <ChevronLeft size={16} />
            </button>
          </li>

          {/* Primeras páginas */}
          {[1, 2, 3].map(
            (page, index) =>
              page <= totalPages && (
                <li key={page} className="animate-fadeIn" style={{ animationDelay: `${50 * (index + 1)}ms` }}>
                  <button
                    className={`${baseButtonClass}`}
                    onClick={() => onPageChange(page)}
                    style={{
                      background: currentPage === page ? "var(--gradient-primary)" : "white",
                      borderColor: currentPage === page ? "var(--color-primary)" : "var(--color-sidebar-bg)",
                      color: currentPage === page ? "var(--color-text-light)" : "var(--color-text-dark)",
                    }}
                  >
                    {page}
                  </button>
                </li>
              ),
          )}

          {/* Puntos suspensivos con input */}
          {totalPages > 4 && (
            <li className="animate-fadeIn" style={{ animationDelay: "200ms" }}>
              {showInput ? (
                <form onSubmit={handleInputSubmit} className="w-14">
                  <input
                    type="number"
                    className="w-full h-9 text-sm text-center border rounded focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      borderColor: "var(--color-primary-light)",
                      color: "var(--color-text-dark)",
                      boxShadow: "0 0 0 2px rgba(79, 130, 177, 0.2)",
                    }}
                    value={inputPage}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    ref={inputRef}
                    min="1"
                    max={totalPages}
                  />
                </form>
              ) : (
                <button
                  className={`${baseButtonClass}`}
                  onClick={() => setShowInput(true)}
                  style={{
                    backgroundColor: "white",
                    borderColor: "var(--color-sidebar-bg)",
                    color: "var(--color-text-dark)",
                  }}
                >
                  ...
                </button>
              )}
            </li>
          )}

          {/* Última página */}
          {totalPages > 3 && (
            <li className="animate-fadeIn" style={{ animationDelay: "250ms" }}>
              <button
                className={`${baseButtonClass}`}
                onClick={() => onPageChange(totalPages)}
                style={{
                  background: currentPage === totalPages ? "var(--gradient-primary)" : "white",
                  borderColor: currentPage === totalPages ? "var(--color-primary)" : "var(--color-sidebar-bg)",
                  color: currentPage === totalPages ? "var(--color-text-light)" : "var(--color-text-dark)",
                }}
              >
                {totalPages}
              </button>
            </li>
          )}

          {/* Botón Next */}
          <li className="animate-fadeIn" style={{ animationDelay: "300ms" }}>
            <button
              className={`${baseButtonClass} rounded-r-md`}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                backgroundColor: currentPage === totalPages ? "#f1f5f9" : "white",
                borderColor: "var(--color-sidebar-bg)",
                color: currentPage === totalPages ? "var(--color-text-muted)" : "var(--color-text-dark)",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              }}
            >
              <ChevronRight size={16} />
            </button>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  )
}

export default TablePagination
