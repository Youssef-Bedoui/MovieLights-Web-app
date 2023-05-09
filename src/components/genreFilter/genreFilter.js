import React, { useEffect, useState } from "react";
import "./genreFilter.css";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import movieApi from "../../shared/movieApi";
import { APIKey } from "../../shared/movieApiKey";
import { addMovies } from "../../redux/features/movieSlice";
import { useDispatch } from "react-redux";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.name,
});

export default function GenreFilter({
  type,
  currGenre,
  setCurrGenre,
  currPage,
}) {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [genreID, setGenreID] = useState("");

  useEffect(() => {
    const getGenres = async () => {
      const response = await movieApi.get(
        `/genre/${type}/list?api_key=${APIKey}`
      );
      const fetchedGenres = response.data.genres;
      console.log(fetchedGenres, "fetchdd");
      setGenres(fetchedGenres);
      setGenreID(fetchedGenres[0].id); // set the first genre ID as default
    };
    getGenres();
  }, [type]);

  const handleGenreChange = async (event, value) => {
    setCurrGenre(value);
    setGenreID(value.id);
    const movies = await getMoviesByGenre();
    console.log(movies);
  };

  const getMoviesByGenre = async () => {
    const apiUrl = `/discover/movie?api_key=${APIKey}&with_genres=${genreID}&page=${currPage}`;
    const response = await movieApi.get(apiUrl);
    const movies = response.data.results;
    dispatch(addMovies(movies));
    return movies;
  };

  return (
    <div className="genre-filter-wrapper">
      <Autocomplete
        id="genre-filter"
        options={genres}
        getOptionLabel={(option) => option.name}
        filterOptions={filterOptions}
        value={currGenre}
        sx={{ width: 300 }}
        onChange={handleGenreChange}
        renderInput={(params) => (
          <TextField {...params} label="Search by genres" variant="outlined" />
        )}
      />
    </div>
  );
}
