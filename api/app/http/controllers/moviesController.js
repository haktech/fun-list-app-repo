const Router = require("koa-router");
const isEmpty = require("lodash/isEmpty");
const movieService = require("../../core/services/movieService");

class MovieController extends Router {
  constructor() {
    super();

    super.get("/api/movies", this.getMovies);
    super.get("/api/movies/:id", this.getMovieById);
    super.post("/api/movies", this.createMovie);
    super.delete("/api/movies/:id", this.deleteMovie);
    super.put("/api/movies/:id", this.updateMovie);
  }
  async createMovie(parentContext) {
    if (isEmpty(parentContext.request.body)) {
      parentContext.throw(400, "body payload is required");
    }

    if (isEmpty(parentContext.request.body.title)) {
      parentContext.throw(400, "title is required");
    }

    try {
      parentContext.response.body = await movieService.createMovie(
        parentContext.request.body
      );
    } catch (err) {
      parentContext.status = err.status || 500;
      parentContext.body = err.message;
      parentContext.app.emit("error", err, parentContext);
    }
  }

  async getMovies(parentContext) {
    try {
      parentContext.response.body = await movieService.getMovies(
        parentContext.query
      );
    } catch (err) {
      parentContext.status = err.status || 500;
      parentContext.body = err.message;
      parentContext.app.emit("error", err, parentContext);
    }
  }

  async deleteMovie(parentContext) {
    if (!parentContext.params || !parentContext.params.id) {
      parentContext.throw(400, "movie id is required");
    }

    try {
      await movieService.deleteMovie(parentContext.params.id);
      parentContext.response.body = "movie deleted!";
    } catch (err) {
      parentContext.status = err.status || 500;
      parentContext.body = err.message;
      parentContext.app.emit("error", err, parentContext);
    }
  }

  async getMovieById(parentContext) {
    if (!parentContext.params || !parentContext.params.id) {
      parentContext.throw(400, "movie id is required");
    }

    try {
      parentContext.response.body = await movieService.getMovieById(
        parentContext.params.id
      );
    } catch (err) {
      parentContext.status = err.status || 500;
      parentContext.body = err.message;
      parentContext.app.emit("error", err, parentContext);
    }
  }

  async updateMovie(parentContext) {
    if (!parentContext.params || !parentContext.params.id) {
      parentContext.throw(400, "movie id is required");
    }

    if (!parentContext.request.body) {
      parentContext.throw(400, "request payload is required");
    }

    try {
      parentContext.response.body = await movieService.updateMovie(
        parentContext.params.id,
        parentContext.request.body
      );
    } catch (err) {
      parentContext.status = err.status || 500;
      parentContext.body = err.message;
      parentContext.app.emit("error", err, parentContext);
    }
  }
}

// expose as singleton
module.exports = new MovieController();
