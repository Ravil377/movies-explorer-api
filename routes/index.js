const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth'); // Защитита роутов авторизацией: если клиент не прислал JWT, доступ к роутам ему должен быть закрыт
const NotFoundError = require('../errors/not-found-err');
const { login, createUser, logout } = require('../controllers/users');
const { validateUserBody, validateAuth } = require('../middlewares/validate-body');
const { PAGENOTFOUND_ERROR } = require('../utils/const');

// проверяет переданные в теле почту и пароль и возвращает JWT
router.post('/signin', validateUserBody, login);

// создаёт пользователя с переданными в теле email, password и name
router.post('/signup', validateAuth, createUser);

router.post('/signout', logout);

// Защитита роутов авторизацией
router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(PAGENOTFOUND_ERROR));
});

module.exports = router;
