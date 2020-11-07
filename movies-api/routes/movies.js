const express = require('express');
const MoviesService = require('../services/movies');

const moviesApi = (app) => {
  const router = express.Router();
  const moviesService = new MoviesService();

  const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema,
  } = require('../utils/schemas/movies');

  const validationHandler = require('../utils/middleware/validationHandler');

  app.use('/api/movies', router);

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;

    try {
      const movies = await moviesService.getMovies({ tags });

      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;

      try {
        const movies = await moviesService.getMovie({ movieId });

        res.status(200).json({
          data: movies,
          message: 'movie retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post('/', validationHandler(createMovieSchema), async function (
    req,
    res,
    next
  ) {
    const { body: movie } = req;
    try {
      const createdMovieId = await moviesService.createMovie({ movie });

      res.status(201).json({
        data: createdMovieId,
        message: 'movie created',
      });
    } catch (err) {
      next(err);
    }
  });

  // update
  router.put(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async function (req, res, next) {
      const { movieId } = req.params;
      const { body: movie } = req;

      try {
        const updateMovieId = await moviesService.update({ movieId, movie });

        res.status(200).json({
          data: updateMovieId,
          message: 'movie updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.patch('/:movieId', async function (req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;

    try {
      const updateMovieId = await moviesService.updatePatch({ movieId, movie });

      res.status(200).json({
        data: updateMovieId,
        message: 'resource updated',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;

      try {
        const deleteMovieId = await moviesService.deleteMovie({ movieId });

        res.status(200).json({
          data: deleteMovieId,
          message: 'movie deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.patch;
};

module.exports = moviesApi;
