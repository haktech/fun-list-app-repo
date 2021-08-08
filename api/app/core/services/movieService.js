const Movie = require("../mongodb/models/Movie");
const filterBuilder = require("../utils/filterBuilder");

class MovieService {
  async createMovie(payload) {
    const newMovie = new Movie({
      title: payload.title,
      desc: payload.desc,
      imgPath: payload.imgPath,
      imgTitle: payload.imgTitle,
      trailerPath: payload.trailerPath,
      videoPath: payload.videoPath,
      stars: payload.stars,
      rating: payload.rating,
      genre: payload.genre,
      isSeries: payload.isSeries,
      actors: payload.actors,
    });

    return await newMovie.save();
  }

  async deleteMovie(movieId) {
    await Movie.findByIdAndDelete(movieId);
  }

  async getMovies(searchCriteria) {
    const filters = filterBuilder.getFilter(searchCriteria);

    return await Movie.find(filters.get("query"))
      .skip(filters.get("skip"))
      .limit(filters.get("pageSize"))
      .sort(filters.get("sort"));
  }

  async updateMovie(movieId, payload) {
    return await Movie.findByIdAndUpdate(
      movieId,
      { $set: payload },
      { new: true }
    );
  }
}

module.exports = new MovieService();
