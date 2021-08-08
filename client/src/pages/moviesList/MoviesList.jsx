import "./moviesList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiService";
import Loader from "../../components/loader/Loader";

export default function MoviesList() {
  const { movies, isFetching, dispatch } = useContext(MovieContext);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  useEffect(() => {
    getMovies(dispatch);
  }, []);

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="movieListImgContainer">
            <img
              className="movieListImg"
              src={
                params.row.imgPath ||
                "https://img.republicworld.com/republic-prod/stories/promolarge/xhdpi/1kutzil5lj0nvfsf_1596544016.jpeg"
              }
              alt=""
            />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "trailerPath",
      headerName: "Trailer Path",
      width: 150,
      renderCell: (params) => {
        return (
          <a href={params.row.trailerPath} rel="noreferrer" target="_blank">
            {params.row.trailerPath}
          </a>
        );
      },
    },
    {
      field: "videoPath",
      headerName: "Video Path",
      width: 150,
      renderCell: (params) => {
        return (
          <a href={params.row.videoPath} rel="noreferrer" target="_blank">
            {params.row.videoPath}
          </a>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 160 },
    { field: "desc", headerName: "Description", width: 160 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Loader load={isFetching}></Loader>
            <Link
              to={{ pathname: "/movies/" + params.row._id, movie: params.row }}
            >
              <button className="movieListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="movieListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="movieList">
      <div className="movieNewButtonContainer">
        <h1 className="movieTitle">Movie List</h1>
        <Link to="/newMovie">
          <button className="movieAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
