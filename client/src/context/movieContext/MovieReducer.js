const MovieReducer = (state, action) => {
  switch (action.type) {
    case "GET_MOVIES_START":
      return {
        movies: [],
        isFetching: true,
        isError: false,
        error: null,
      };
    case "GET_MOVIES_SUCCESS":
      return {
        movies: action.payload,
        isFetching: false,
        isError: false,
        error: null,
      };
    case "GET_MOVIES_FAILURE":
      return {
        movies: [],
        isFetching: false,
        isError: true,
        error: action.error,
      };
    case "CREATE_MOVIE_START":
      return {
        ...state,
        isFetching: true,
        isError: false,
        error: null,
      };
    case "CREATE_MOVIE_SUCCESS":
      return {
        movies: [...state.movies, action.payload],
        isFetching: false,
        isError: false,
        error: null,
      };
    case "CREATE_MOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        isError: true,
        error: action.error,
      };
    case "UPDATE_MOVIE_START":
      return {
        ...state,
        isFetching: true,
        isError: false,
        error: null,
      };
    case "UPDATE_MOVIE_SUCCESS":
      return {
        ...state,
        isUpdated: action.isUpdated,
        isFetching: false,
        isError: false,
        error: null,
      };
    case "UPDATE_MOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        isError: true,
        error: action.error,
      };
    case "DELETE_MOVIE_START":
      return {
        ...state,
        isFetching: true,
        isError: false,
        error: null,
      };
    case "DELETE_MOVIE_SUCCESS":
      return {
        movies: state.movies.filter((movie) => movie._id !== action.payload),
        isFetching: false,
        isError: false,
        error: null,
      };
    case "DELETE_MOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        isError: true,
        error: action.error,
      };
    default:
      return { ...state };
  }
};

export default MovieReducer;
