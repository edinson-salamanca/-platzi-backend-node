const sinon = require('sinon');

const { moviesMock, filteredMoviesMock, finOneMovieMock } = require('./movies');

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const getStub = sinon.stub();

const createStub = sinon.stub().resolves(moviesMock[0].id);

const updateStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  get(collection, id) {
    getStub.withArgs('movies', id).resolves(finOneMovieMock(id));
    return getStub(collection, id);
  }

  create(collection, data) {
    return createStub(collection, data);
  }

  update(collection, id, data) {
    return updateStub(collection, id, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  updateStub,
  MongoLibMock,
};
