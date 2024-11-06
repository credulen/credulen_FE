import React from "react";

const Pagination = ({ pagination, onPageChange }) => {
  const { currentPage, totalPages } = pagination;

  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    const delta = 2; // Number of pages to show before and after current page

    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      pageNumbers.push(i);
    }

    // Add first page if not included
    if (pageNumbers[0] > 1) {
      if (pageNumbers[0] > 2) {
        pageNumbers.unshift("...");
      }
      pageNumbers.unshift(1);
    }

    // Add last page if not included
    if (pageNumbers[pageNumbers.length - 1] < totalPages) {
      if (pageNumbers[pageNumbers.length - 1] < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex justify-center items-center gap-1 mt-8"
      aria-label="Pagination"
    >
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        ←
      </button>

      {/* Page numbers */}
      <div className="flex gap-1">
        {getPageNumbers().map((pageNum, idx) =>
          pageNum === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-3 py-2">
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === pageNum
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              aria-current={currentPage === pageNum ? "page" : undefined}
            >
              {pageNum}
            </button>
          )
        )}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-md text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
};

export default Pagination;
