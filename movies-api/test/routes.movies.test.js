const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies');
const testServer = require('../utils/testServer');

describe('routes - movies', function () {
  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServiceMock,
  });

  const request = testServer(route);
  describe('GET /movies', function () {
    it('should respond with status 200', function (done) {
      request.get('/api/movies').expect(200, done);
    });

    it('should respond with the list of movies', function (done) {
      request.get('/api/movies').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock,
          message: 'movies listed',
        });

        done();
      });
    });
  });

  describe('GET /movies/:movieId', function () {
    const movieIdMock = 'd2a4a062d25641bbb1b29d91';

    it('should respond with status 200', function (done) {
      request.get(`/api/movies/${movieIdMock}`).expect(200, done);
    });
    it('should response requested movie', (done) => {
      request.get(`/api/movies/${movieIdMock}`).end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock[0],
          message: 'movie retrieved',
        });
        done();
      });
    });
  });

  describe('POST /movies', function () {
    it('should respond with status 201', function (done) {
      request.get(`/api/movies`).expect(200, done);
    });
    it('should response requested movie', (done) => {
      request
        .post(`/api/movies`)
        .send(moviesMock[0])
        .end((err, res) => {
          assert.deepStrictEqual(res.body, {
            data: moviesMock[0].id,
            message: 'movie created',
          });
          done();
        });
    });
  });
});
