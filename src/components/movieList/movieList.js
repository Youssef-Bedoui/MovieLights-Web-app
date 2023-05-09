import React from "react";
import "./movieList.css";
import { useSelector } from "react-redux";
import {
  getAllMovies,
  getAllSearchedMovies,
} from "../../redux/features/movieSlice";
import MovieDetails from "../../screens/movieDetails.js/movieDetails";

export default function MovieList({ type, currPage }) {
  const movies = useSelector(getAllMovies);
  const SearchedMovies = useSelector(getAllSearchedMovies);
  const mappedMovies = SearchedMovies.length > 0 ? SearchedMovies : movies;
  console.log(mappedMovies, type, "movielist");

  return (
    <div className="wrapper">
      <div className="movie_list">
        <div className="movie-container">
          {mappedMovies &&
            mappedMovies.length &&
            mappedMovies.map((movie, index) => (
              <MovieDetails
                key={index}
                data={movie}
                type={SearchedMovies ? "movie" : type}
                currPage={currPage}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
