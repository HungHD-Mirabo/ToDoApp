import React from "react";
import "./Pagination.css";
import { ThemeContext } from "../../ThemeContext";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export default class Pagination extends React.Component<PaginationProps> {
  render() {
    const { currentPage, itemsPerPage, totalPages, handlePageChange } =
      this.props;
    return (
      <ThemeContext.Consumer>
        {(context) => (
          <div className={`pagination ${context?.darkMode ? "dark-mode" : ""}`}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
