import React, { useState } from "react";
import "./searchResults.css";
import MovieList from "../../components/movieList/movieList";
import PagePagination from "../../components/pagePagination/pagePagination";
import Footer from "../footer/footer";

export default function SearchResults() {
  const [currPage, setCurrPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);
  const [currGenre, setCurrGenre] = useState(null);

  return (
    <>
      <div className="genre_header">
        <h2 className="genre_Title">
          Movies {currGenre && `| ${currGenre.name}`}
        </h2>
      </div>

      <MovieList type={"movie"} currPage={currPage} />
      <PagePagination
        currPage={currPage}
        pageCount={pageCount}
        setCurrPage={setCurrPage}
      />
      <Footer />
    </>
  );
}
