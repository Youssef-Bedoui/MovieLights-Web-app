import React from "react";
import "./headerTrendCard.css";
import { movieImagePath } from "../../movieImagePath";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeaderTrendCard({ movie, type }) {
  const navigate = useNavigate();

  const navigateToMovie = async (id) => {
    navigate(`/about_movie/${id}/${type}`);
  };
  // console.log(movie, "movie");
  return (
    <div
      className="trend-card"
      onClick={() => {
        navigateToMovie(movie.id);
      }}
    >
      <motion.div
        initial={{ y: -700 }}
        animate={{ y: 0}}
        transition={{delay:.5,duration:.5}}
        className="trend-container"
      >
        <div className="trend-top">
          <img src={movieImagePath + movie.poster_path} alt={movie.title} />
        </div>
        <div className="trend-bottom">
          <h2 className="title">
            {movie.title && movie.title}
            {movie.name && movie.name}
          </h2>
        </div>
      </motion.div>
    </div>
  );
}
