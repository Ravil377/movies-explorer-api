/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUser,
  getUsersMe,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUsersMe);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
}), updateUser);

module.exports = router;
