import React from "react";
import "./pagePagination.css";
import Pagination from "@mui/material/Pagination";

export default function PagePagination({ pageCount, currPage, setCurrPage }) {
  const handlePageChange = (event, value) => {
    setCurrPage(value);
    //scroll to top
    setCurrPage(value);
    //scroll to top
    const genreHeader = document.querySelector(".movie_list");
    genreHeader.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pagination-container">
      <Pagination
        count={pageCount}
        variant="outlined"
        shape="rounded"
        size="large"
        color="primary"
        page={currPage}
        onChange={handlePageChange}
      />
    </div>
  );
}
