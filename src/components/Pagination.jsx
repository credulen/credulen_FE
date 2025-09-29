import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-1 mt-4">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`min-w-[40px] h-[40px] rounded-md text-sm font-medium flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
          currentPage === 1
            ? "bg-neutral-100 text-neutral-300 cursor-not-allowed"
            : "bg-white border border-primary-300 text-primary-900 hover:bg-primary-50"
        }`}
        aria-label="Previous page">
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`min-w-[40px] h-[40px] mx-0.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
            currentPage === number
              ? "bg-primary-900 text-white hover:bg-primary-800 shadow-md font-semibold border border-transparent"
              : "bg-white border border-primary-300 text-primary-700 hover:bg-primary-50 hover:text-primary-900 hover:border-primary-400"
          }`}
          aria-current={currentPage === number ? "page" : undefined}>
          {number}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`min-w-[40px] h-[40px] rounded-md text-sm font-medium flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 ${
          currentPage === totalPages
            ? "bg-neutral-100 text-neutral-300 cursor-not-allowed"
            : "bg-white border border-primary-300 text-primary-700 hover:bg-primary-50"
        }`}
        aria-label="Next page">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
