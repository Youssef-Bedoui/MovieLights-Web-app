import React, { useEffect, useState } from "react";
import "./home.css";
import movieApi from "../../movieApi";
import  config from "./../../config.json";
import MovieList from "../../components/movieList/movieList";
import { useDispatch } from "react-redux";
import { addMovies } from "../../redux/features/movieSlice";
import HeaderPoster from "../../components/headerPoster/headerPoster";
import PagePagination from "../../components/pagePagination/pagePagination";
import { useLocation } from "react-router-dom";
import SimpleBackdrop from "../../components/backdropSpinner/backdrop";
import Footer from "../footer/footer";

export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);
    const location = useLocation();

    console.log(config.APIKey)

    useEffect(() => {
      setIsLoading(true);
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }, [location]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await movieApi.get(`/movie/top_rated?api_key=${config.APIKey}&page=${currPage}`);
      // console.log(response, "home data");
      const movies = response.data.results;
      setPageCount(Math.floor(response.data.total_pages));
      dispatch(addMovies(movies));
    };
    getMovies();
  }, [dispatch, currPage]);

  return (
    <>
     {isLoading ? (<SimpleBackdrop/>) : (
      <>
        <HeaderPoster type={"home_discover"} />
        <h2 className="genre_Title_home">Movies</h2>
        <MovieList type={"movie"} />
        <PagePagination
          currPage={currPage}
          pageCount={pageCount}
          setCurrPage={setCurrPage}
        />
        <Footer/>
      </>
      )}
    </>
  );
}
