import { useContext, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Publish } from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";
import { Redirect, Switch } from "react-router-dom";
import "./newMovie.css";
import storage from "../../firebase";
import { createMovie } from "../../context/movieContext/apiService";
import { MovieContext } from "../../context/movieContext/MovieContext";
import Loader from "../../components/loader/Loader";

export default function NewMovie() {
  const [movie, setMovie] = useState(null);
  const [imgPath, setImg] = useState(null);
  const [trailerPath, setTrailer] = useState(null);
  const [videoPath, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState(0);
  const [created, setCreated] = useState(false);

  const { error, isError, isFetching, dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (isError) => {
          console.log(isError);
          setUploading(false);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
            setUploading(false);
          });
        }
      );
    });
  };

  const handleVideoFileUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    upload([{ file: videoPath, label: "videoPath" }]);
  };

  const handleTrailerFileUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    upload([{ file: trailerPath, label: "trailerPath" }]);
  };

  const handlePosterFileUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    upload([{ file: imgPath, label: "imgPath" }]);
  };
  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    upload([
      { file: imgPath, label: "imgPath" },
      { file: trailerPath, label: "trailerPath" },
      { file: videoPath, label: "videoPath" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
    setCreated(true);
  };

  return (
    <div className="newMovie">
      {created && (
        <Switch>
          <Redirect push to="/movies" />
        </Switch>
      )}
      <div className="notification">
        <Snackbar open={isError} autoHideDuration={60}>
          <Alert severity="error">Failed: {error}. Please try again</Alert>
        </Snackbar>
      </div>
      <h1 className="addMovieTitle">New Movie</h1>
      <Loader load={isFetching || uploading}></Loader>
      <form className="">
        <div className="addMovieLeft">
          <div className="addMovieItemRowContainer">
            <div className="addMovieItem">
              <label>Title</label>
              <input
                type="text"
                placeholder="Avatar"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="addMovieItem">
              <label>Image path</label>
              <div className="uploadContainer">
                <input
                  type="file"
                  name="imgPath"
                  onChange={(e) => {
                    setFiles(files + 1);
                    setImg(e.target.files[0]);
                  }}
                />
                <button
                  onClick={handlePosterFileUpload}
                  disabled={imgPath == null}
                  className="uploadFile"
                >
                  <Publish />
                </button>
              </div>
            </div>
          </div>
          <div className="addMovieItemRowContainer">
            <div className="addMovieItem">
              <label>Description</label>
              <input
                type="text"
                placeholder="description"
                name="desc"
                onChange={handleChange}
              />
            </div>
            <div className="addMovieItem">
              <label>Genre</label>
              <input
                type="text"
                placeholder="Genre"
                name="genre"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="addMovieItemRowContainer">
            <div className="addMovieItem">
              <label>Is Series?</label>
              <select name="isSeries" id="isSeries" onChange={handleChange}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div className="addMovieItem">
              <label>Video Path</label>
              <div className="uploadContainer">
                <input
                  type="file"
                  name="videoPath"
                  onChange={(e) => {
                    setFiles(files + 1);
                    setVideo(e.target.files[0]);
                  }}
                />
                <button
                  onClick={handleVideoFileUpload}
                  disabled={videoPath == null}
                  className="uploadFile"
                >
                  <Publish />
                </button>
              </div>
            </div>
          </div>
          <div className="addMovieItemRowContainer">
            <div className="addMovieItem">
              <label>Trailer Path</label>
              <div className="uploadContainer">
                <input
                  type="file"
                  name="trailerPath"
                  onChange={(e) => {
                    setFiles(files + 1);
                    setTrailer(e.target.files[0]);
                  }}
                />
                <button
                  onClick={handleTrailerFileUpload}
                  disabled={trailerPath == null}
                  className="uploadFile"
                >
                  <Publish />
                </button>
              </div>
            </div>
            <div className="addMovieItem"></div>
          </div>
        </div>

        <div className="addMovieButtonContainer">
          <div className="addMovieButtonPosition">
            <div className="buttonAction">
              <button
                className="addMovieButton"
                disabled={uploaded < 3}
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
