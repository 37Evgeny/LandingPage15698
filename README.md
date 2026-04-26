🎨 Drawing Contest — Галерея карточек
Веб-приложение для управления карточками с изображениями. Регистрация, авторизация, CRUD операции, поиск и сортировка. Тёмная тема, адаптивный дизайн, анимации.
ReactViteMUINode.jsExpressMongoDBJWT
📋 Содержание
Возможности
Стек технологий
Структура проекта
Установка и запуск
API Reference
Архитектура
Тёмная тема
Права доступа
Переменные окружения
Зависимости
Реализованный функционал
Планы развития
Возможные проблемы
Автор
✨ Возможности
🔐 Авторизация
Функция	Статус
Регистрация по email и паролю	✅
Вход с выдачей JWT токена	✅
Проверка токена при загрузке страницы	✅
Хранение токена в localStorage	✅
Выход из аккаунта	✅
Имя пользователя в шапке сайта	✅
Роли пользователей user и admin	✅
Валидация форм авторизации	✅
Дефолтная учётная запись администратора	✅
🃏 Карточки
Функция	Статус
Отображение карточек в адаптивной сетке	✅
Добавление новой карточки	✅
Редактирование своей карточки	✅
Удаление с диалогом подтверждения	✅
Привязка карточки к автору owner	✅
Кнопки редактирования только для авторизованных	✅
Placeholder если картинка не загрузилась	✅
🔍 Поиск и сортировка
Функция	Статус
Поиск по названию и описанию	✅
Кнопка очистки поиска	✅
Счётчик найденных результатов	✅
Сортировка по дате новые и старые	✅
Сортировка по названию А-Я и Я-А	✅
Empty State при пустом результате поиска	✅
🎨 UX и UI
Функция	Статус
Skeleton загрузка вместо спиннера	✅
Превью картинки при вводе URL в форму	✅
Валидация URL изображения	✅
Snackbar уведомления об операциях	✅
Empty State когда карточек нет	✅
Анимации появления карточек	✅
Hover эффект на карточках	✅
Тёмная тема через CSS переменные	✅
Адаптивный дизайн mobile tablet desktop	✅
🚀 Стек технологий
Frontend
Технология	Версия	Описание
React	18	UI библиотека
Vite	7	Сборщик проекта
MUI Material	v7	UI компоненты
MUI Icons	v7	Иконки
Emotion	11	CSS-in-JS стили
Backend
Технология	Версия	Описание
Node.js	18+	Среда выполнения
Express	4	Веб-фреймворк
MongoDB	8	База данных
Mongoose	8	ODM для MongoDB
bcryptjs	2	Хеширование паролей
jsonwebtoken	9	JWT токены
dotenv	16	Переменные окружения
cors	2	CORS заголовки
nodemon	3	Автоперезапуск сервера
📁 Структура проекта
DrawingContestFive/
│
├── five15698/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── api/
│       │   ├── cards-api.js
│       │   └── auth-api.js
│       ├── hooks/
│       │   ├── useCards.js
│       │   ├── useAuth.js
│       │   ├── useSnackbar.js
│       │   ├── useSearch.js
│       │   └── use-image-url.js
│       ├── components/
│       │   ├── App/
│       │   │   └── app.jsx
│       │   ├── AuthDialog/
│       │   │   └── auth-dialog.jsx
│       │   ├── AddCardDialog/
│       │   │   └── add-card-dialog.jsx
│       │   ├── Card/
│       │   │   └── card.jsx
│       │   ├── CardList/
│       │   │   └── card-list.jsx
│       │   ├── ConfirmDialog/
│       │   │   └── confirm-dialog.jsx
│       │   ├── EmptyState/
│       │   │   └── empty-state.jsx
│       │   ├── SearchBar/
│       │   │   └── search-bar.jsx
│       │   ├── SortBar/
│       │   │   └── sort-bar.jsx
│       │   ├── SkeletonCard/
│       │   │   ├── skeleton-card.jsx
│       │   │   └── skeleton-list.jsx
│       │   ├── Snackbar/
│       │   │   └── snackbar.jsx
│       │   ├── Header/
│       │   │   └── header.jsx
│       │   ├── Footer/
│       │   │   └── footer.jsx
│       │   └── Spinner/
│       │       └── spinner.jsx
│       ├── index.css
│       └── main.jsx
│
└── server/
    ├── controllers/
    │   ├── auth.js
    │   ├── cards.js
    │   └── admin.js
    ├── middlewares/
    │   ├── auth.js
    │   └── admin.js
    ├── models/
    │   ├── user.js
    │   └── card.js
    ├── routes/
    │   ├── auth.js
    │   ├── cards.js
    │   └── admin.js
    ├── .env
    ├── .env.example
    ├── index.js
    └── package.json
⚙️ Установка и запуск
Требования
Node.js  >= 18
MongoDB  >= 6
npm      >= 9
Шаг 1 — Клонируй репозиторий
bash
Копировать код
git clone https://github.com/37Evgeny/LandingPage15698.git
cd DrawingContestFive
Шаг 2 — Запусти Backend
bash
Копировать код
cd server
npm install
cp .env.example .env
nano .env
npm run dev
После успешного запуска:
🚀 Сервер работает на http://localhost:4000
✅ БД подключена!
✅ Админ создан: [jg:email_230] / admin123
Шаг 3 — Запусти Frontend
bash
Копировать код
cd five15698
npm install
npm run dev
Открой браузер: http://localhost:5173
🔌 API Reference
Base URL
http://localhost:4000/api
Сводная таблица эндпоинтов
Метод	Endpoint	Доступ	Описание
POST	/api/signup	Публичный	Регистрация
POST	/api/signin	Публичный	Вход
GET	/api/users/me	Токен	Текущий пользователь
GET	/api/cards	Публичный	Все карточки
POST	/api/cards	Токен	Создать карточку
PATCH	/api/cards/:id	Владелец или Админ	Обновить карточку
DELETE	/api/cards/:id	Владелец или Админ	Удалить карточку
GET	/api/admin/users	Только Админ	Список пользователей
DELETE	/api/admin/users/:id	Только Админ	Удалить пользователя
PATCH	/api/admin/users/:id/role	Только Админ	Изменить роль
Статусы ответов
Статус	Описание
200	Успешный запрос
201	Ресурс создан
400	Ошибка валидации данных
401	Не авторизован или невалидный токен
403	Нет прав доступа
404	Ресурс не найден
409	Конфликт — email уже занят
500	Внутренняя ошибка сервера
POST /api/signup
json
Копировать код
{
  "name": "Evgeny",
  "email": "[jg:email_231]",
  "password": "123456"
}
json
Копировать код
{
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Evgeny",
    "email": "[jg:email_232]",
    "role": "user"
  }
}
POST /api/signin
json
Копировать код
{
  "email": "[jg:email_233]",
  "password": "123456"
}
json
Копировать код
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Evgeny",
    "email": "[jg:email_234]",
    "role": "user"
  }
}
GET /api/users/me
Authorization: Bearer ВАШ_ТОКЕН
json
Копировать код
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Evgeny",
  "email": "[jg:email_235]",
  "role": "user"
}
GET /api/cards
json
Копировать код
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Название карточки",
    "pictures": "https://example.com/image.jpg",
    "description": "Описание карточки",
    "owner": {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "name": "Evgeny",
      "email": "[jg:email_236]",
      "role": "user"
    },
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
POST /api/cards
Authorization: Bearer ВАШ_ТОКЕН
json
Копировать код
{
  "name": "Название карточки",
  "pictures": "https://example.com/image.jpg",
  "description": "Описание карточки"
}
json
Копировать код
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Название карточки",
  "pictures": "https://example.com/image.jpg",
  "description": "Описание карточки",
  "owner": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "name": "Evgeny",
    "email": "[jg:email_237]",
    "role": "user"
  },
  "createdAt": "2025-01-01T00:00:00.000Z"
}
PATCH /api/cards/:id
Authorization: Bearer ВАШ_ТОКЕН
json
Копировать код
{
  "name": "Новое название",
  "pictures": "https://example.com/new-image.jpg",
  "description": "Новое описание"
}
json
Копировать код
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Новое название",
  "pictures": "https://example.com/new-image.jpg",
  "description": "Новое описание",
  "owner": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
    "name": "Evgeny",
    "email": "[jg:email_238]",
    "role": "user"
  }
}
DELETE /api/cards/:id
Authorization: Bearer ВАШ_ТОКЕН
json
Копировать код
{
  "message": "Карточка удалена",
  "id": "64f1a2b3c4d5e6f7a8b9c0d1"
}
GET /api/admin/users
Authorization: Bearer ТОКЕН_АДМИНА
json
Копировать код
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Evgeny",
    "email": "[jg:email_239]",
    "role": "user",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
DELETE /api/admin/users/:id
Authorization: Bearer ТОКЕН_АДМИНА
json
Копировать код
{
  "message": "Пользователь и его карточки удалены",
  "id": "64f1a2b3c4d5e6f7a8b9c0d1"
}
PATCH /api/admin/users/:id/role
Authorization: Bearer ТОКЕН_АДМИНА
json
Копировать код
{
  "role": "admin"
}
json
Копировать код
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Evgeny",
  "email": "[jg:email_240]",
  "role": "admin"
}
🧩 Архитектура
Поток данных
FRONTEND
─────────────────────────────────────────────
auth-api.js            cards-api.js
signup/signin/getMe    CRUD + JWT заголовок
      ↑                      ↑
useAuth.js            useCards.js
токен/пользователь    карточки/операции
      ↑                      ↑
      └─────────  App ────────┘
                    ↑
             useSnackbar.js
                    ↑
              useSearch.js
                    ↑
                CardList
               ↑        ↑
            Card     EmptyState

BACKEND
─────────────────────────────────────────────
routes/auth   routes/cards   routes/admin
     ↓              ↓             ↓
middlewares/auth          middlewares/admin
     ↓              ↓             ↓
controllers/auth  controllers/cards
                  controllers/admin
     ↓              ↓             ↓
 models/user      models/card
     ↓              ↓
        MongoDB Database
Жизненный цикл запроса
1.  Пользователь нажимает кнопку в UI
2.  App вызывает handleAdd / handleEdit / handleDelete
3.  useCards вызывает функцию из cards-api.js
4.  cards-api.js читает токен из localStorage
    и добавляет заголовок Authorization: Bearer TOKEN
5.  fetch отправляет HTTP запрос на сервер
6.  Express — authMiddleware проверяет JWT токен
7.  adminMiddleware проверяет роль если нужно
8.  Controller выполняет операцию с MongoDB
9.  Сервер возвращает JSON ответ
10. Успех — обновляет состояние React и showSuccess
    Ошибка — showError без изменения состояния
11. useSnackbar показывает уведомление пользователю
Разделение ответственности
Файл	Зона ответственности
auth-api.js	HTTP запросы signup signin getMe
cards-api.js	HTTP запросы карточек и JWT заголовок
useAuth.js	Состояние авторизации токен пользователь
useCards.js	Состояние карточек CRUD операции
useSnackbar.js	Состояние и методы уведомлений
useSearch.js	Поиск фильтрация сортировка
use-image-url.js	Валидация URL превью картинки
App	UI состояние диалогов рендер дерева
AuthDialog	Формы входа и регистрации с табами
AddCardDialog	Форма создания и редактирования карточки
Header	Данные пользователя кнопки входа выхода
Card	Карточка с кнопками для авторизованных
CardList	Адаптивная сетка с анимацией Grow
EmptyState	Заглушка пустого списка и пустого поиска
SkeletonList	Заглушки во время загрузки данных
🎨 Тёмная тема
Реализована через CSS переменные в src/index.css. Все компоненты используют переменные через MUI sx проп.
css
Копировать код
:root {
  --bg-main:        #121212;
  --bg-paper:       #1e1e1e;
  --text-primary:   #ffffff;
  --text-secondary: #aaaaaa;
  --border-color:   #333333;
  --accent-main:    #6c63ff;
  --accent-light:   #8b85ff;
}
🛡️ Права доступа
Действие	Гость	Пользователь	Админ
Просматривать карточки	✅	✅	✅
Добавить карточку	❌	✅	✅
Редактировать свою карточку	❌	✅	✅
Редактировать чужую карточку	❌	❌	✅
Удалить свою карточку	❌	✅	✅
Удалить чужую карточку	❌	❌	✅
Список всех пользователей	❌	❌	✅
Удалить пользователя	❌	❌	✅
Изменить роль пользователя	❌	❌	✅
Дефолтные данные для входа
Email:   [jg:email_241]
Пароль:  admin123
Роль:    admin
🔧 Переменные окружения
server/.env
bash
Копировать код
PORT=4000
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=7d
server/.env.example
bash
Копировать код
PORT=4000
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# PORT           — порт на котором запустится сервер
# JWT_SECRET     — секретный ключ для подписи JWT токенов
#                  ОБЯЗАТЕЛЬНО замени на свой уникальный ключ
# JWT_EXPIRES_IN — время жизни токена  7d = 7 дней
Файл .env добавлен в .gitignore и не попадает в репозиторий
📦 Зависимости
Frontend five15698/package.json
json
Копировать код
{
  "name": "five15698",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.x.x",
    "@emotion/styled": "^11.x.x",
    "@mui/icons-material": "^7.x.x",
    "@mui/material": "^7.x.x",
    "react": "^18.x.x",
    "react-dom": "^18.x.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x.x",
    "vite": "^7.x.x"
  }
}
Backend server/package.json
json
Копировать код
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.x.x",
    "express": "^4.x.x",
    "jsonwebtoken": "^9.x.x",
    "mongoose": "^8.x.x"
  },
  "devDependencies": {
    "nodemon": "^3.x.x"
  }
}
✅ Реализованный функционал
Фаза 1 — Базовый CRUD
 Отображение карточек в адаптивной сетке
 Добавление новой карточки через диалог
 Редактирование существующей карточки
 Диалог подтверждения перед удалением
 Все HTTP запросы вынесены в cards-api.js
 Кастомный хук useCards для управления состоянием
 Snackbar уведомления об успехе и ошибках
Фаза 2 — Улучшение UX
 Skeleton загрузка вместо спиннера
 Превью картинки при вводе URL в форму
 Валидация URL изображения с хуком use-image-url
 Placeholder если картинка не загрузилась
 Empty State заглушка когда карточек нет
 Анимации появления карточек через MUI Grow
 Hover эффект подъёма карточки
Фаза 3 — Поиск и сортировка
 Поиск по названию и описанию в реальном времени
 Кнопка очистки поля поиска
 Счётчик найденных результатов
 Сортировка по дате новые первыми
 Сортировка по дате старые первыми
 Сортировка по названию А-Я
 Сортировка по названию Я-А
 Empty State при пустом результате поиска
Фаза 4 — Авторизация и роли
 Регистрация нового пользователя по email и паролю
 Вход в аккаунт с выдачей JWT токена
 Проверка токена при загрузке страницы через getMe
 Хранение токена в localStorage
 Автоматический выход при невалидном токене
 Выход из аккаунта с очисткой токена
 Имя пользователя и иконка в шапке сайта
 Кнопки редактирования скрыты для неавторизованных
 Роли пользователей user и admin
 Поле role хранится в JWT токене
 Привязка карточки к автору через поле owner
 Защита маршрутов на сервере через authMiddleware
 Проверка владельца при PATCH и DELETE
 Администратор может редактировать любые карточки
 Администратор может удалять любые карточки
 Дефолтная учётная запись администратора при старте
 Маршруты управления пользователями для администратора
🗺️ Планы развития
Фаза 5 — Взаимодействие
 Лайки на карточках
 Избранные карточки
 Детальная страница карточки
 Комментарии к карточкам
 Счётчик просмотров
Фаза 6 — Инфраструктура
 React Router — навигация между страницами
 Пагинация или бесконечная прокрутка
 TypeScript — типизация компонентов и хуков
 Тесты — Vitest для фронтенда Supertest для API
 Деплой — Vercel для фронтенда Railway для сервера
 CI/CD — GitHub Actions для автодеплоя
 Загрузка изображений — хранение в Cloudinary
🐛 Возможные проблемы
Порт 4000 уже занят — EADDRINUSE
bash
Копировать код
lsof -i :4000
lsof -ti :4000 | xargs kill -9
npm run dev
Нет карточек после добавления авторизации
bash
Копировать код
mongosh
use mySiteDB
db.cards.deleteMany({})
exit
Ошибка Cannot find module
bash
Копировать код
rm -rf node_modules
npm install
Токен не принимается сервером — ошибка 401
bash
Копировать код
cat server/.env
npm run dev
Ошибка Cannot find module validator
bash
Копировать код
rm -rf server/models
rm -rf server/controllers
rm -rf server/routes
rm -rf server/middlewares
cd server
npm install
npm run dev
🔍 Проверка API через curl
bash
Копировать код
# Регистрация
curl -X POST http://localhost:4000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Evgeny","email":"[jg:email_242]","password":"123456"}'

# Вход
curl -X POST http://localhost:4000/api/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"[jg:email_243]","password":"123456"}'

# Текущий пользователь
curl http://localhost:4000/api/users/me \
  -H "Authorization: Bearer ВАШ_ТОКЕН"

# Все карточки
curl http://localhost:4000/api/cards

# Создать карточку
curl -X POST http://localhost:4000/api/cards \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ВАШ_ТОКЕН" \
  -d '{"name":"Тест","pictures":"https://example.com/img.jpg","description":"Описание"}'

# Обновить карточку
curl -X PATCH http://localhost:4000/api/cards/ID_КАРТОЧКИ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ВАШ_ТОКЕН" \
  -d '{"name":"Новое название","description":"Новое описание"}'

# Удалить карточку
curl -X DELETE http://localhost:4000/api/cards/ID_КАРТОЧКИ \
  -H "Authorization: Bearer ВАШ_ТОКЕН"

# Войти как администратор
curl -X POST http://localhost:4000/api/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"[jg:email_244]","password":"admin123"}'

# Список всех пользователей
curl http://localhost:4000/api/admin/users \
  -H "Authorization: Bearer ТОКЕН_АДМИНА"

# Изменить роль пользователя
curl -X PATCH http://localhost:4000/api/admin/users/ID_ПОЛЬЗОВАТЕЛЯ/role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ТОКЕН_АДМИНА" \
  -d '{"role":"admin"}'

# Удалить пользователя
curl -X DELETE http://localhost:4000/api/admin/users/ID_ПОЛЬЗОВАТЕЛЯ \
  -H "Authorization: Bearer ТОКЕН_АДМИНА"
👤 Автор
Evgeny — GitHub
📄 Лицензия
MIT © 2025 Evgeny