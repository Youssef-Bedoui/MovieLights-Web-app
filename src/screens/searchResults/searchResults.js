import React from "react";
import "./searchResults.css";
import MovieList from "../../components/movieList/movieList";
import Footer from "../footer/footer";

export default function SearchResults() {

  return (
    <>
      <div className="genre_header">
        <h2 className="genre_Title">
          Movies 
        </h2>
      </div>

      <MovieList type={"movie"} />
      <Footer />
    </>
  );
}
