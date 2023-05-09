import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/searchBar";

export default function Navbar() {

  return (
    <div className="navbar flex">
      <Link to="/">
        <div className="logo">MovieLights</div>
      </Link>
      <div className="links">
        <Link to="/">
          <div className="">DISCOVER</div>
        </Link>
        <Link to="/movies">
          <div className="">MOVIES</div>
        </Link>
        <Link to="/tvShows">
          <div className="">TV SHOWS</div>
        </Link>
      </div>
        <div className="searchBar">
          <SearchBar />
        </div>
    </div>
  );
}
