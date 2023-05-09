import React, { useEffect, useState } from "react";
import "./moviesScreen.css";
import { useDispatch } from "react-redux";
import movieApi from "../../shared/movieApi";
import { APIKey } from "../../shared/movieApiKey";
import { addMovies } from "../../redux/features/movieSlice";
import HeaderPoster from "../../components/headerPoster/headerPoster";
import MovieList from "../../components/movieList/movieList";
import PagePagination from "../../components/pagePagination/pagePagination";
import GenreFilter from "../../components/genreFilter/genreFilter";
import { useLocation } from "react-router-dom";
import SimpleBackdrop from "../../components/backdropSpinner/backdrop";
import Footer from "../footer/footer";

export default function TvShowsScreen() {
  const dispatch = useDispatch();
  const [currPage, setCurrPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);
  const [currGenre, setCurrGenre] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    document.body.classList.add("no-scroll");
    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.remove("no-scroll");
    }, 1000);

    return () => {
      clearTimeout(timeout);
      document.body.classList.remove("no-scroll");
    };
  }, [location]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await movieApi.get(
        `/discover/movie?api_key=${APIKey}&with_genres=${currGenre}&page=${currPage}`
      );
      // console.log(response);
      const movies = response.data.results;
      setPageCount(Math.floor(response.data.total_pages));
      dispatch(addMovies(movies));
    };

    getMovies();
  }, [currGenre, currPage, dispatch]);

  return (
    <>
      {isLoading ? (
        <SimpleBackdrop />
      ) : (
        <>
          <HeaderPoster type={"movie"} />

          <div className="genre_header">
            <h2 className="genre_Title">
              Movies {currGenre && `| ${currGenre.name}`}
            </h2>
            <GenreFilter
              type={"movie"}
              currGenre={currGenre}
              setCurrGenre={setCurrGenre}
            />
          </div>

          <MovieList type={"movie"} currPage={currPage} />
          <PagePagination
            currPage={currPage}
            pageCount={pageCount}
            setCurrPage={setCurrPage}
          />
          <Footer />
        </>
      )}
    </>
  );
}
