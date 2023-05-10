import React from "react";
import "./movieDetails.css";
import movieImagePath from "../../config.json";
import { useNavigate } from "react-router-dom";

export default function MovieDetails({ data, type }) {
  const Type = type ? type : "movie";
  const navigate = useNavigate();

  const navigateToMovie = async (id) => {
    navigate(`/about_movie/${id}/${Type}`);
  };

  return (
    <div
      className="movie-card"
      onClick={() => {
        console.log(data.id, "id");
        navigateToMovie(data.id);
      }}
    >
      <img
        className="image_shadow"
        src={movieImagePath + data.poster_path}
        alt={data.title}
      />
      <div className="card-body">
        <div className="card-top">
          <img
            className="image_poster"
            src={movieImagePath + data.poster_path}
            alt={type === "movie" || "undefined" ? data.title : data.name}
          />
        </div>
        <div className="card-bottom">
          <div className="card-details">
            <h3 className="title">
              {type === "movie" || "undefined" ? data.title : data.name}
            </h3>
            <p>
              {type === "movie" || "undefined"
                ? data.release_date
                : data.first_air_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
