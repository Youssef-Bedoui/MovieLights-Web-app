import React, { useEffect, useRef, useState } from "react";
import "./headerPoster.css";
import  movieImagePath  from "../../config.json";
import movieApi from "../../movieApi";
import APIKey  from "../../config.json";
import HeaderTrendCard from "../headerTrendCard/headerTrendCard";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import { useNavigate } from "react-router-dom";

export default function HeaderPoster({ type }) {
  const navigate = useNavigate();

  const [randomMovie, setRandomMovie] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const movieListRef = useRef(null);

  const navigateToMovie = async (id, home_discoverType) => {
    navigate(
      `/about_movie/${id}/${home_discoverType ? home_discoverType : type}`
    );
  };

  useEffect(() => {
    // For home poster
    const getMovie = async () => {
      const response = await movieApi.get(`/discover/movie/?api_key=${APIKey}`);
      const movies = response.data.results;
      // console.log(movies, "movies");
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setRandomMovie(randomMovie);
      setTrendingMovies(movies);
    };

    const getTrend = async () => {
      const response = await movieApi.get(
        `/trending/${type}/day?api_key=${APIKey}`
      );
      const movies = response.data.results;
      // console.log(movies, "trends");
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setRandomMovie(randomMovie);
      setTrendingMovies(movies);
    };

    if (type === "movie" || type === "tv") {
      getTrend();
    } else if (type === "home_discover") {
      getMovie();
    }
  }, [setRandomMovie, setTrendingMovies, type]);
  
//handle the scroll
  const handleArrowClick = (direction) => {
    const movieList = movieListRef.current;
    const scrollDistance = 400;
    if (direction === "right") {
      movieList.scrollTo({
        left: movieList.scrollLeft + scrollDistance,
        behavior: "smooth",
      });
    } else if (direction === "left") {
      movieList.scrollTo({
        left: movieList.scrollLeft - scrollDistance,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="header-wrapper">
      <img
        className="wrapper-shadow"
        src={movieImagePath + randomMovie.poster_path}
        alt={
          type === "movie" || type === "home_discover"
            ? randomMovie.title
            : randomMovie.name
        }
      />

      {/*for movies*/}
      {type === "movie" && (
        <>
          <h2 style={{ padding: "20px", color: "var(--font-secondary" }}>
            TRENDING NOW:
          </h2>
          <div className="trend-header">
            <ArrowBackIosSharpIcon
              className="arrow left"
              onClick={() => handleArrowClick("left")}
            />
            <div className="movie-list" ref={movieListRef}>
              {trendingMovies &&
                trendingMovies.length &&
                trendingMovies.map((movie) => (
                  <HeaderTrendCard movie={movie} type={type} />
                ))}
            </div>
            <ArrowForwardIosSharpIcon
              className="arrow right"
              onClick={() => handleArrowClick("right")}
            />
          </div>
        </>
      )}

      {/*for tv shows*/}

      {type === "tv" && (
        <>
          <h2 style={{ padding: "20px", color: "var(--font-secondary" }}>
            TRENDING NOW:
          </h2>
          <div className="trend-header">
            <ArrowBackIosSharpIcon
              className="arrow left"
              onClick={() => handleArrowClick("left")}
            />
            <div className="movie-list" ref={movieListRef}>
              {trendingMovies &&
                trendingMovies.length &&
                trendingMovies.map((movie) => (
                  <HeaderTrendCard movie={movie} type={type} />
                ))}
            </div>
            <ArrowForwardIosSharpIcon
              className="arrow right"
              onClick={() => handleArrowClick("right")}
            />
          </div>
        </>
      )}

      {/*for home only */}

      {type === "home_discover" && (
        <div className="header-container">
          {type === "home_discover" && (
            <div className="header-left">
              <h2>Discover movies and series with MovieLights</h2>
              <h2>
                Get key details, ratings, trailers, and more - all in one
                place !
              </h2>
            </div>
          )}

          {type === "home_discover" && (
            <div className="header-right">
              <img
                src={movieImagePath + randomMovie.poster_path}
                alt={randomMovie.name}
                onClick={() => navigateToMovie(randomMovie.id, "movie")}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
