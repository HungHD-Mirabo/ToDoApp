import React from "react";
import "./Pagination.css";

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
      <ul className="pagination">
        <li className={currentPage === 1 ? "disabled" : ""}>
          <span onClick={() => handlePageChange(currentPage - 1)}>« Trước</span>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            <span>{index + 1}</span>
          </li>
        ))}
        <li className={currentPage === totalPages ? "disabled" : ""}>
          <span onClick={() => handlePageChange(currentPage + 1)}>Sau »</span>
        </li>
      </ul>
    );
  }
}
