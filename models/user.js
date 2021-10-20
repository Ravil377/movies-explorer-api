/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const BadRequest = require('../errors/bad-request-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => {
      if (!validator.isEmail(value, { require_protocol: true })) {
        throw new Error({ error: 'Неверный формат email адреса' });
      }
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

function toJSON() {
  const object = this.toObject();
  delete object.password;
  return object;
}

userSchema.methods.toJSON = toJSON;

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new BadRequest('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new BadRequest('Неправильные почта или пароль'));
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
