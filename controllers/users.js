const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request-err');
const InternalServerError = require('../errors/internal-server-err');
const UserIsRegistered = require('../errors/user-is-registered-err');
const AuthError = require('../errors/auth-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  VALIDATION_ERROR,
  CAST_ERROR,
  NOT_FOUND_USER_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  INVALID_DATA_CREATING_USER_MESSAGE,
  INCORRECT_DATA_UPDATING_PROFILE_MESSAGE,
  SALT_ROUNDS,
  UNAUTHORISED_ERROR_MESSAGE,
  CONFLICT_ERROR,
} = require('../utils/const');

module.exports.getUsersMe = (req, res, next) => User.findById(req.user._id)
  .orFail(new NotFoundError(NOT_FOUND_USER_MESSAGE))
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === CAST_ERROR) {
      return next(new NotFoundError(NOT_FOUND_USER_MESSAGE));
    }
    return next(err);
  });

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, SALT_ROUNDS, (error, hash) => {
    if (error) {
      return next(new InternalServerError(DEFAULT_ERROR_MESSAGE));
    }
    return User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          return next(new UserIsRegistered('Такой пользователь уже зарегистрирован'));
        }
        if (err.name === VALIDATION_ERROR) {
          return next(new BadRequest(INVALID_DATA_CREATING_USER_MESSAGE));
        }
        return next(err);
      });
  });
};

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret', { expiresIn: '7d' });
      res
        .status(200)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ email: user.email, message: 'Пользователь залогинен' });
    })
    .catch(() => next(new AuthError(UNAUTHORISED_ERROR_MESSAGE)));
};

module.exports.logout = (req, res) => {
  res
    .status(200)
    .cookie('jwt', 'token', {
      maxAge: -1,
      httpOnly: true,
    })
    .send({ message: 'Пользователь разлогинен' });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        return next(new BadRequest(INCORRECT_DATA_UPDATING_PROFILE_MESSAGE));
      }
      if (err.name === CAST_ERROR) {
        return next(new NotFoundError(NOT_FOUND_USER_MESSAGE));
      }
      if (err.code === 11000) {
        return next(new UserIsRegistered(CONFLICT_ERROR));
      }
      return next(err);
    });
};
