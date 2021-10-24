const { NODE_ENV, BD_NAME_ON_SERVER } = process.env;

module.exports.mongoDbName = NODE_ENV === 'production' ? BD_NAME_ON_SERVER : 'bitfilmsdb';
module.exports.settingMongoose = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports.SALT_ROUNDS = 10;
module.exports.UNAUTHORISED = 401;
module.exports.DOUBLE_ADMIN = 409;
module.exports.BAD_REQUEST_ERROR_CODE = 400;
module.exports.NOT_FOUND_ERROR_CODE = 404;
module.exports.FORBIDDEN_ERROR_CODE = 403;
module.exports.INTERNAL_SERVER_ERROR_CODE = 500;
module.exports.VALIDATION_ERROR = 'ValidationError';
module.exports.CAST_ERROR = 'CastError';
module.exports.TYPE_ERROR = 'TypeError';
module.exports.ERROR = 'Error';
module.exports.NOT_FOUND_USER_MESSAGE = 'Пользователь по указанному _id не найден.';
module.exports.NOT_FOUND_LOGIN_MESSAGE = 'Не указан email или пароль';
module.exports.DOUBLE_ERROR_MESSAGE = 'Такой пользователь не зарегистрирован';
module.exports.FORBIDDEN_MESSAGE = 'Вы не можете удалить чужую запись';
module.exports.DEFAULT_ERROR_MESSAGE = 'На сервере произошла ошибка';
module.exports.UNAUTHORISED_ERROR_MESSAGE = 'Передан неверный логин или пароль';
module.exports.UNAUTHORISED_MESSAGE = 'Необходима авторизация';
module.exports.INVALID_DATA_CREATING_USER_MESSAGE = 'Переданы некорректные данные при записи пользователя.';
module.exports.INCORRECT_DATA_UPDATING_PROFILE_MESSAGE = 'Переданы некорректные данные при обновлении профиля пользователя.';
module.exports.INCORRECT_DATA_CREATING_MOVIE_MESSAGE = 'Переданы некорректные данные при записи фильма.';
module.exports.NOT_FOUND_MOVIE_MESSAGE = 'Фильм с указанным _id не найден.';
module.exports.CONFLICT_ERROR = 'Email уже используется другим пользователем';
module.exports.CRASHED_ERROR = 'Сервер сейчас упадёт';
module.exports.PAGENOTFOUND_ERROR = 'Страница не найдена';
