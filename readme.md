API api.shamolove.xyz

Бэкенд часть сайта shamilove.zyz. Написана на фреймворке Express.js
- Созданы схемы и модели ресурсов API
- Созданы роуты и контроллеры:
  # возвращает информацию о пользователе (email и имя)
  GET /users/me
  # обновляет информацию о пользователе (email и имя)
  PATCH /users/me
  # возвращает все сохранённые пользователем фильмы
  GET /movies
  # создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId 
  POST /movies
  # удаляет сохранённый фильм по id
  DELETE /movies/movieId 
  # создаёт пользователя с переданными в теле email, password и name
  POST /signup
  # проверяет переданные в теле почту и пароль и возвращает JWT
  POST /signin 
- Роуты защищены авторизацией
- Реализовано логирование
  # информация о всех запросах к API request.log
  # информация об ошибках error.log
- Реализована централизованная обработка ошибок
- Все запросы приходящие на сервер валидируются 
- Для авторизации используется cookie
- cors защита
- RateLimiter
