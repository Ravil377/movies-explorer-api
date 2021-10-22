const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request-err');
const Forbidden = require('../errors/forbidden-err');

const {
  VALIDATION_ERROR,
  CAST_ERROR,
  INCORRECT_DATA_CREATING_MOVIE_MESSAGE,
  NOT_FOUND_MOVIE_MESSAGE,
  ERROR,
  FORBIDDEN_MESSAGE,
} = require('../utils/const');

module.exports.getMovies = (req, res, next) => Movie.find({})
  .then((movies) => res.send(movies))
  .catch(next);

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    name,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  return Movie.create({
    country,
    director,
    name,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((film) => res.send(film))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new BadRequest(INCORRECT_DATA_CREATING_MOVIE_MESSAGE));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => Movie.findById(req.params.movieId)
  .orFail(new NotFoundError('Фильм с указанным _id не найден.'))
  .then((film) => {
    if (JSON.stringify(req.user._id) === JSON.stringify(film.owner)) {
      return Movie.findByIdAndRemove(req.params.movieId)
        .then((deleteMovie) => res.send(deleteMovie))
        .catch(next);
    }
    return next(new Forbidden(FORBIDDEN_MESSAGE));
  })
  .catch((err) => {
    if (err.name === ERROR) {
      return next(new NotFoundError(NOT_FOUND_MOVIE_MESSAGE));
    }
    if (err.name === CAST_ERROR) {
      return next(new BadRequest(NOT_FOUND_MOVIE_MESSAGE));
    }
    return next(err);
  });
