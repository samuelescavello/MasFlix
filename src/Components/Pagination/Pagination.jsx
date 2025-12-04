import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    // Calcola le pagine da mostrare
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    // Aggiungi sempre la prima pagina
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    // Aggiungi le pagine centrali
    rangeWithDots.push(...range);

    // Aggiungi sempre l'ultima pagina
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Precedente
      </button>

      <div className="pagination-numbers">
        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="pagination-dots">...</span>
            ) : (
              <button className={`pagination-number ${currentPage === page ? "active" : ""}`} onClick={() => onPageChange(page)}>
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        className={`pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Successiva →
      </button>
    </div>
  );
};

export default Pagination;
