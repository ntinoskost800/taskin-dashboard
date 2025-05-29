import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (newPage: number) => void
}

const CustomPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-8 flex justify-center space-x-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`rounded bg-gray-200 px-4 py-2 ${
          currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'
        }`}>
        Previous
      </button>
      <p className="px-4 py-2 text-center">
        Page {currentPage} of {totalPages}
      </p>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`rounded bg-gray-200 px-4 py-2 ${
          currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'
        }`}>
        Next
      </button>
    </div>
  )
}
export default CustomPagination
