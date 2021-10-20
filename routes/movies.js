const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateUrl } = require('../utils/utils');

const {
  createMovie,
  deleteMovie,
  getMovies,
} = require('../controllers/movies');

// возвращает все сохранённые пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(validateUrl).required(),
    trailer: Joi.string().custom(validateUrl).required(),
    thumbnail: Joi.string().custom(validateUrl).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.string().required(),
  }),
}), createMovie);

// удаляет сохранённый фильм по id
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
