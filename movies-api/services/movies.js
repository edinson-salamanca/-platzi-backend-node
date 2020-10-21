const { moviesMock } = require('../utils/mocks/movies');

class MoviesService {
  async getMovies() {
    const movies = await Promise.resolve(moviesMock);
    return movies || [];
  }

  async getMovie() {
    const movie = Promise.resolve(moviesMock[0]);
    return movie || {};
  }

  async createMovie() {
    const createMovieId = await Promise.resolve(moviesMock[0].id);
    return createMovieId;
  }

  async update() {
    const updatedMovieId = Promise.resolve(moviesMock[0].id);
    return updatedMovieId;
  }
  async updatePatch() {
    const updatePatchMovieId = Promise.resolve(moviesMock[0].id);
    return updatePatchMovieId;
  }
  async deleteMovie() {
    const deletedMovieId = Promise.resolve(moviesMock[0].id);
    return deletedMovieId;
  }
}

module.exports = MoviesService;
