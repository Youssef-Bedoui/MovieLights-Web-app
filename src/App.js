import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screens/home/home";
import Navbar from "./components/navbar/navbar";
import PageNotFound from "./screens/pageNotFound/pageNotFound";
import MoviesScreen from "./screens/home/moviesScreen";
import TvShowsScreen from "./screens/home/tvShowsScreen";
import MovieInfo from "./screens/movieInfos/movieInfo";
import SearchResults from "./screens/searchResults/searchResults";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes basename="/MovieLights-Web-app">
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MoviesScreen />} />
          <Route path="/tvShows" element={<TvShowsScreen />} />
          <Route path="/about_movie/:movieID/:type" element={<MovieInfo />} />
          <Route path="/search" element={<SearchResults />} />
          <Route element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
