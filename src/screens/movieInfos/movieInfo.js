import React, { useEffect, useState } from "react";
import "./movieInfo.css";
import movieApi from "../../shared/movieApi";
import { APIKey } from "../../shared/movieApiKey";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMovieInfo, getMovieInfo } from "../../redux/features/movieSlice";
import { movieImagePath } from "../../shared/movieImagePath";
import RateStars from "../../components/rateStarts/rateStars";
import HdIcon from "@mui/icons-material/Hd";
import Footer from "../footer/footer";
import { motion } from "framer-motion";

export default function MovieInfo() {
  const dispatch = useDispatch();
  const { movieID, type } = useParams();
  const movieInfo = useSelector(getMovieInfo);
  const [rate, setRate] = useState(null);
  const [genres, setGenres] = useState([]);
  const [movieCountry, setMovieCountry] = useState(null);
  const [movieProduction, setMovieProduction] = useState(null);
  const [movieBudget, setMovieBudget] = useState("No info");
  const [movieRevenue, setMovieRevenue] = useState("No info");
  const [trailerURL, setTrailerURL] = useState("");
  const [movieUrl, setMovieUrl] = useState("");
  const [trailers, setTrailers] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    window.scrollTo("top", 0);

    const getMovieInfo = async () => {
      const response = await movieApi.get(
        `/${type}/${movieID}?api_key=${APIKey}`
      );
      const fetchedMovie = response.data;
      setRate(fetchedMovie.vote_average);
      setGenres(fetchedMovie.genres.map((genre) => genre.name).join(", "));
      setMovieCountry(fetchedMovie.production_companies[0].origin_country);
      setMovieProduction(fetchedMovie.production_companies[0].name);
      setMovieBudget(fetchedMovie.budget);
      setMovieRevenue(fetchedMovie.revenue);
      dispatch(addMovieInfo(fetchedMovie));

      //get trailer url
      const trailerResponse = await movieApi.get(
        `/movie/${movieID}/videos?api_key=${APIKey}`
      );
      const trailers = trailerResponse.data.results;

      // Find the trailer with the name "Official Trailer"
      const originalTrailer = trailers.find(
        (trailer) => trailer.name === "Official Trailer"
      );

      // If the original trailer exists, use its key, otherwise use the key of the first trailer in the array
      const trailerKey = originalTrailer
        ? originalTrailer.key
        : trailers[0]?.key;

      const trailerURL = `https://www.youtube.com/embed/${trailerKey}`;
      setTrailerURL(trailerURL);

      setTrailers(trailers);

      //get actors info
      const actorInfo = await movieApi.get(
        `/${type}/${movieID}/credits?api_key=${APIKey}&language=en-US`
      );
      const fetchedActors = actorInfo.data.cast;
      // console.log(fetchedActors, "actors");
      setActors(fetchedActors);
    };

    getMovieInfo();
  }, [dispatch, movieID, setRate, rate, type]);

  return (
    <div className="movie">
      <div className="movie_info flex">
        {movieInfo?.poster_path && (
          <img
            className="backdrop_image"
            src={`${movieImagePath}/${movieInfo.backdrop_path}`}
            alt={movieInfo.title}
          />
        )}
        <motion.div
          animate={{ x: 0 }}
          initial={{ x: -500 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="left-info"
        >
          <div className="player_container flex">
            <iframe
              width="560"
              height="315"
              src={trailerURL}
              title="Original_Trailer"
              allowFullScreen
            ></iframe>
            <div className="other_trailers flex">
              {trailers.map((trailer) => (
                <div className="trailer_img">
                  <img
                    src={`https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`}
                    alt="Trailer"
                    onClick={() =>
                      setTrailerURL(
                        `https://www.youtube.com/embed/${trailer.key}`
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ x: 0 }}
          initial={{ x: 500 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="right-info"
        >
          <div className="info-container">
            <div className="title-header flex">
              <h2>{type === "tv" ? movieInfo.name : movieInfo.title}</h2>
              {rate && <RateStars rate={rate} />}
            </div>
            <p className="genres">{genres}</p>
            <div className="top-info">
              <br />
              <div className="dateTime flex">
                <p>
                  Release date:{" "}
                  {type === "tv"
                    ? movieInfo.first_air_date
                    : movieInfo.release_date}
                </p>
                <span className="runtime flex">
                  {type === "tv" ? (
                    <>{movieInfo.number_of_episodes} episode</>
                  ) : (
                    <>
                      <HdIcon />
                      {movieInfo.runtime} min
                    </>
                  )}
                </span>
              </div>
            </div>
            <div className="movie-overview">
              <h5
                style={{
                  "margin-bottom": "10px",
                  color: "lightgray",
                  "text-decoration": "underline",
                }}
              >
                Overview :
              </h5>
              <p>{movieInfo.overview}</p>
            </div>
            <div className="production">
              <h5>Production:</h5>
              <p>Country : {movieCountry}</p>
              <p>Production company : {movieProduction}</p>
              <p>Movie Budget : {movieBudget} $</p>
              <p>Movie revenue : {movieRevenue} $</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/*actors info*/}

      <div className="actors-section">
        <h2>Actors</h2>
        <motion.div className="actors-container flex">
          {actors.map((actor) => (
            <div className="actor-card">
              {actor.profile_path ? (
                <img
                  src={`${movieImagePath}${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <div className="logo">MovieLights</div>
              )}
              <div className="actor-names">
                <h5>{actor.name}</h5>
                <h5>{actor.character}</h5>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
