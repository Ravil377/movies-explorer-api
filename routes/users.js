const router = require('express').Router();
const { updateUserSetting } = require('../middlewares/validate-body'); // celebrate

const {
  updateUser,
  getUsersMe,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUsersMe);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', updateUserSetting, updateUser);

module.exports = router;
