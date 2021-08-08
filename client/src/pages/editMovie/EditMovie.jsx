import { useState, useContext } from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { Link, useLocation, Switch, Redirect } from "react-router-dom";
import { updateMovie } from "../../context/movieContext/apiService";
import { MovieContext } from "../../context/movieContext/MovieContext";
import Loader from "../../components/loader/Loader";
import "./editMovie.css";

export default function EditMovie() {
  const { error, isError, isUpdated, isFetching, dispatch } =
    useContext(MovieContext);
  const location = useLocation();
  const movie = location.movie || {};
  const [newMovie, setNewMovie] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setNewMovie({ ...newMovie, [e.target.name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateMovie(movie._id, newMovie, dispatch);
  };

  return (
    <div className="movie">
      {isUpdated && (
        <Switch>
          <Redirect push to="/movies" />
        </Switch>
      )}
      <Snackbar open={isError} autoHideDuration={60}>
        <Alert severity="error">Failed: {error}</Alert>
      </Snackbar>
      <Loader load={isFetching}></Loader>
      <div className="movieTitleContainer">
        <h1 className="">Edit Movie</h1>
        <Link to="/newMovie">
          <button className="movieAddButton">Create</button>
        </Link>
      </div>
      <div className="movieContainer">
        <div className="movieShow">
          <div className="movieShowTop">
            <img src={movie.imgPath} alt="" className="movieShowImg" />
            <div className="movieShowTopTitle">
              <span className="movieShowMovieTitle">{movie.title}</span>
            </div>
          </div>
          <div className="movieShowBottom">
            <div className="movieShowInfo">
              <span className="movieInfoLabel">Genre:</span>
              <span className="movieShowInfoValue">{movie.genre}</span>
            </div>
            <div className="movieShowInfo">
              <span className="movieInfoLabel">Description:</span>
              <span className="movieShowInfoValue">{movie.desc}</span>
            </div>
            <div className="movieShowInfo">
              <span className="movieInfoLabel">Stars:</span>
              <span className="movieShowInfoValue">{movie.stars}</span>
            </div>
          </div>
          <div>
            <video className="video" autoPlay controls src={movie.videoPath} />
          </div>
        </div>
        <div className="movieUpdate">
          <span className="movieUpdateTitle">Edit</span>
          <form className="movieUpdateForm">
            <div className="movieUpdateLeft">
              <div className="movieUpdateItem">
                <label>Movie name</label>
                <input
                  type="text"
                  placeholder={movie.title}
                  className="movieUpdateInput"
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className="movieUpdateItem">
                <label>Genre</label>
                <input
                  type="text"
                  placeholder={movie.genre}
                  className="movieUpdateInput"
                  name="genre"
                  onChange={handleChange}
                />
              </div>
              <div className="movieUpdateItem">
                <label>Description</label>
                <input
                  type="text"
                  placeholder={movie.desc}
                  className="movieUpdateInput"
                  name="desc"
                  onChange={handleChange}
                />
              </div>
              <div className="movieUpdateItem">
                <label>Stars</label>
                <input
                  type="text"
                  placeholder={movie.stars}
                  className="movieUpdateInput"
                  name="stars"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="movieUpdateRight">
              <div className="movieUpdateUpload"></div>
              <button className="movieUpdateButton" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
