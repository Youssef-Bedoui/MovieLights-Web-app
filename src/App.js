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
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movies" element={<MoviesScreen />} />
          <Route exact path="/tvShows" element={<TvShowsScreen />} />
          <Route path="/about_movie/:movieID/:type" element={<MovieInfo />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="**" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
