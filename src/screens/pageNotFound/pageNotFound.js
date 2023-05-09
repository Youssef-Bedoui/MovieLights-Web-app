import React from "react";
import "./pageNotFound.css";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="notFound_container">
      <h1>Oups,... 404 Page Not Found :( </h1>
      <button className="redirect_Btn" onClick={() => navigate("/")}>
        GO TO MOVIELIGHTS
      </button>
    </div>
  );
}
