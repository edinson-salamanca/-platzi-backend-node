const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  MongoLibMock,
  getAllStub,
  createStub,
  updateStub,
} = require('../utils/mocks/mongoLib');

const { moviesMock } = require('../utils/mocks/movies');

describe('services - movies', function () {
  const MoviesServices = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock,
  });

  const moviesService = new MoviesServices();

  describe('when getMovies method is called', async function () {
    it('should call the getall MongoLib method', async function () {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async function () {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepStrictEqual(result, expected);
    });

    describe('when createMovie method is called', async function () {
      it('should call create MongoLib method', async () => {
        await moviesService.createMovie({});
        assert.strictEqual(createStub.called, true);
      });

      it('shuld return an id of movie created', async () => {
        const resultId = await moviesService.createMovie({});
        const expected = moviesMock[0].id;
        assert.deepStrictEqual(resultId, expected);
      });
    });
    describe('when updateMovie method is called', async function () {
      it('should call update MongoLib method', async function () {
        moviesService.updateMovie({});
        assert.strictEqual(updateStub.called, true);
      });

      it('should return an id to updated moive', async function () {
        const mocksMovieId = '5fb1d49f97fe700343c9da89';
        const result = await moviesService.updateMovie({
          movieId: mocksMovieId,
          movie: {},
        });
        const expected = moviesMock[0].id;
        assert.deepStrictEqual(result, expected);
      });
    });
  });
});
