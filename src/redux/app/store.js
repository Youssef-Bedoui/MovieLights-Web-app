import { configureStore } from "@reduxjs/toolkit";
import moviesReducers from "../features/movieSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducers,
  },
});
