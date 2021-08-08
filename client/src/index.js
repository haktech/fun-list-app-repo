import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MovieContextProvider } from "./context/movieContext/MovieContext";
// import dotenv from "dotenv";
// dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <MovieContextProvider>
      <App />
    </MovieContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
