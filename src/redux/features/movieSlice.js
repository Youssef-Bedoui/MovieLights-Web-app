import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  movieInfo: [],
  searchMovie: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovies: (state, action) => {
      state.movies = action.payload;
    },
    addMovieInfo: (state, action) => {
      state.movieInfo = action.payload;
    },
    addSearchedMovies: (state, action) => {
      state.searchMovie = action.payload;
    },
  },
});

export const { addMovies, addMovieInfo, addSearchedMovies } =
  movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllSearchedMovies = (state) => state.movies.searchMovie;
export const getMovieInfo = (state) => state.movies.movieInfo;

export default movieSlice.reducer;
