const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger'); // логирование
const { settingMongoose } = require('./utils/const');
const { limiter } = require('./middlewares/rate-limit');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const { CRASHED_ERROR } = require('./utils/const');
const { mongoDbName } = require('./utils/const');

mongoose.connect(mongoDbName, settingMongoose);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    'https://ravil-movies-api.nomoredomains.monster',
    'https://ravil-movies-frontend.nomoredomains.monster',
    'https://localhost:3002',
    'https://localhost:3001',
    'https://localhost:3000',
  ],
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(CRASHED_ERROR);
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Запустился!');
});
