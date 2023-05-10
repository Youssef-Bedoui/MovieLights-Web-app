import * as React from "react";
import "./searchbar.css";
import useAutocomplete from "@mui/base/useAutocomplete";
import { styled } from "@mui/system";
import  APIKey  from "../../config.json";
import { useDispatch } from "react-redux";
import { addSearchedMovies } from "../../redux/features/movieSlice";
import { useNavigate } from "react-router-dom";

const Input = styled("input")(({ theme }) => ({
  width: 300,
  height: 40,
  paddingLeft: 10,
  paddingRight: 10,
  borderRadius: 5,
  border: 0,
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  color: theme.palette.mode === "light" ? "#000" : "#fff",
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#000",
  overflow: "auto",
  maxHeight: 200,
  border: "1px solid rgba(0,0,0,.25)",
  "& li.Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));

export default function SearchBar() {
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [dataSearched, setDataSearched] = React.useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchMovies = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${query}`
      );
      const data = await response.json();
      setDataSearched(data.results);
      // console.log(data, "hereeeeee");
      setOptions(
        data.results.map((movie) => ({
          title: movie.title,
          year: new Date(movie.release_date).getFullYear(),
          id: movie.id,
        }))
      );
    } catch (error) {
      // console.error(error);
    } finally {
      //focus on finally (new)
      setLoading(false);
    }
  };

  const handleSearch = () => {
    dispatch(addSearchedMovies(dataSearched));
    navigate(`/search`);
  };

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options,
    loading,
    getOptionLabel: (option) => option.title,
    onInputChange: (event, value) => {
      searchMovies(value);
    },
  });

  return (
    <div>
      <div {...getRootProps()}>
        <Input {...getInputProps()} placeholder="Search..." />
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li
              {...getOptionProps({ option, index })}
              onClick={() => {
                handleSearch(option.title);
              }}
              onKeyDown={(event) => {
                if (event.keyCode === 13) {
                  handleSearch(option.title);
                }
              }}
            >
              {option.title} ({option.year})
            </li>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}
