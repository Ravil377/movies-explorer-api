const router = require('express').Router();
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validate-body'); // celebrate

const {
  createMovie,
  deleteMovie,
  getMovies,
} = require('../controllers/movies');

// возвращает все сохранённые пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле
router.post('/', validateCreateMovie, createMovie);

// удаляет сохранённый фильм по id
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
