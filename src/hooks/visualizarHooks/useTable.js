"use client"
import { useState, useEffect } from "react"

const useTable = (data = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" })
  const [paginatedItems, setPaginatedItems] = useState([])

  useEffect(() => {
    // Reset to page 1 when data changes
    setCurrentPage(1)
  }, [data])

  useEffect(() => {
    // Sort and paginate data
    const sortedData = [...data]

    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedData = sortedData.slice(startIndex, endIndex)

    setPaginatedItems(paginatedData)
  }, [data, currentPage, sortConfig, itemsPerPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "ascending" ? "descending" : "ascending",
    }))
  }

  return {
    currentPage,
    paginatedItems,
    handlePageChange,
    sortConfig,
    handleSort,
  }
}

export default useTable
