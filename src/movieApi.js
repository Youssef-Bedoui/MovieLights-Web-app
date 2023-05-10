import axios from "axios";
import baseURL from "./config.json";

export default axios.create({
  baseURL,
});
