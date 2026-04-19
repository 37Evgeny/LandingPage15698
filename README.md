# 🎨 Drawing Contest — Галерея карточек

Веб-приложение для управления карточками с изображениями.
Позволяет добавлять, редактировать, удалять и искать карточки
через удобный интерфейс с тёмной темой.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![MUI](https://img.shields.io/badge/MUI-v7-007FFF?logo=mui)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)

---

## 📸 Возможности

### Карточки
- 🖼️ Отображение карточек в адаптивной сетке
- ➕ Добавление новой карточки (название, картинка, описание)
- ✏️ Редактирование существующей карточки
- 🗑️ Удаление с диалогом подтверждения
- 🔍 Поиск по названию и описанию
- 🔃 Сортировка (новые/старые/А-Я/Я-А)
- 📊 Счётчик найденных результатов

### UX
- 💀 Skeleton загрузка вместо спиннера
- 🖼️ Превью картинки при вводе URL
- ✅ Валидация URL изображения
- 🔔 Snackbar уведомления об операциях
- 📭 Empty State — заглушка если карточек нет
- 🔍 Empty State при пустом поиске
- 🖼️ Placeholder если картинка не загрузилась
- 🎬 Анимации появления карточек
- 🌙 Тёмная тема через CSS переменные
- 📱 Адаптивный дизайн (mobile/tablet/desktop)

---

## 🚀 Стек технологий

### Frontend

| Технология | Версия | Описание |
|-----------|--------|----------|
| React | 18 | UI библиотека |
| Vite | 7 | Сборщик проекта |
| MUI Material | v7 | UI компоненты |
| MUI Icons | v7 | Иконки |
| Emotion | 11 | CSS-in-JS стили |

### Backend

| Технология | Версия | Описание |
|-----------|--------|----------|
| Node.js | 18+ | Среда выполнения |
| Express | 4 | Веб-фреймворк |
| MongoDB | 8 | База данных |
| Mongoose | 8 | ODM для MongoDB |

---

## 📁 Структура проекта

```
DrawingContestFive/
├── five15698/                          # Frontend
│   ├── public/                         # Статические файлы
│   ├── src/
│   │   ├── api/
│   │   │   └── cards-api.js            # Все HTTP запросы к API
│   │   │
│   │   ├── hooks/
│   │   │   ├── useCards.js             # Хук — операции с карточками
│   │   │   ├── useSnackbar.js          # Хук — уведомления
│   │   │   ├── useSearch.js            # Хук — поиск и сортировка
│   │   │   └── use-image-url.js        # Хук — валидация URL картинки
│   │   │
│   │   ├── components/
│   │   │   ├── App/
│   │   │   │   └── app.jsx             # Главный компонент
│   │   │   ├── AddCardDialog/
│   │   │   │   └── add-card-dialog.jsx # Диалог добавления/редактирования
│   │   │   ├── Card/
│   │   │   │   └── card.jsx            # Карточка с кнопками
│   │   │   ├── CardList/
│   │   │   │   └── card-list.jsx       # Сетка карточек
│   │   │   ├── ConfirmDialog/
│   │   │   │   └── confirm-dialog.jsx  # Диалог подтверждения удаления
│   │   │   ├── EmptyState/
│   │   │   │   └── empty-state.jsx     # Заглушка пустого списка
│   │   │   ├── SearchBar/
│   │   │   │   └── search-bar.jsx      # Строка поиска
│   │   │   ├── SortBar/
│   │   │   │   └── sort-bar.jsx        # Сортировка карточек
│   │   │   ├── SkeletonCard/
│   │   │   │   ├── skeleton-card.jsx   # Карточка-заглушка загрузки
│   │   │   │   └── skeleton-list.jsx   # Список заглушек
│   │   │   ├── Snackbar/
│   │   │   │   └── snackbar.jsx        # Уведомления
│   │   │   ├── Header/
│   │   │   │   └── header.jsx
│   │   │   ├── Footer/
│   │   │   │   └── footer.jsx
│   │   │   └── Spinner/
│   │   │       └── spinner.jsx
│   │   │
│   │   ├── index.css                   # Глобальные стили / CSS переменные
│   │   └── main.jsx                    # Точка входа React
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
└── server/                             # Backend
    ├── index.js                        # Точка входа Express
    ├── data.json                       # Данные
    ├── pure.js                         # Вспомогательные функции
    └── package.json
```

---

## ⚙️ Установка и запуск

### Требования

```
Node.js  >= 18
MongoDB  >= 6 (локально или Atlas)
npm      >= 9
```

### 1. Клонируй репозиторий

```bash
git clone git@github.com:37Evgeny/LandingPage15698.git
cd DrawingContestFive
```

### 2. Настрой и запусти Backend

```bash
# Перейди в папку сервера
cd server

# Установи зависимости
npm install

# Создай файл переменных окружения
cp .env.example .env
# Отредактируй .env — укажи свой MongoDB URI

# Запусти сервер
node index.js

# Сервер запустится на:
# http://127.0.0.1:4000
```

### 3. Настрой и запусти Frontend

```bash
# Перейди в папку фронтенда
cd five15698

# Установи зависимости
npm install

# Запусти dev сервер
npm run dev

# Приложение откроется на:
# http://localhost:5173
```

---

## 🔌 API Reference

### Base URL
```
http://127.0.0.1:4000/api
```

### Endpoints

#### Получить все карточки
```http
GET /api/cards
```
**Ответ:**
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Название карточки",
    "pictures": "https://example.com/image.jpg",
    "description": "Описание карточки"
  }
]
```

#### Создать карточку
```http
POST /api/cards
Content-Type: application/json
```
**Тело запроса:**
```json
{
  "name": "Название карточки",
  "pictures": "https://example.com/image.jpg",
  "description": "Описание карточки"
}
```

#### Обновить карточку
```http
PATCH /api/cards/:id
Content-Type: application/json
```
**Тело запроса:**
```json
{
  "name": "Новое название",
  "pictures": "https://example.com/new-image.jpg",
  "description": "Новое описание"
}
```

#### Удалить карточку
```http
DELETE /api/cards/:id
```

### Статусы ответов

| Статус | Описание |
|--------|----------|
| `200` | Успешный запрос |
| `201` | Ресурс создан |
| `400` | Ошибка валидации |
| `404` | Ресурс не найден |
| `500` | Ошибка сервера |

---

## 🧩 Архитектура Frontend

### Разделение ответственности

| Файл | Зона ответственности |
|------|---------------------|
| `cards-api.js` | HTTP запросы, обработка статусов сервера |
| `useCards.js` | Состояние карточек, CRUD операции |
| `useSnackbar.js` | Состояние и методы уведомлений |
| `useSearch.js` | Поиск, фильтрация, сортировка |
| `use-image-url.js` | Валидация URL, состояние превью |
| `App` | UI состояние диалогов, рендер |
| `AddCardDialog` | Состояние формы, валидация полей |
| `ConfirmDialog` | Подтверждение удаления |
| `SearchBar` | Поле поиска с очисткой |
| `SortBar` | Выпадающий список сортировки |
| `SkeletonList` | Заглушки при загрузке |
| `EmptyState` | Пустой список / нет результатов |
| `CardList` | Сетка карточек с анимацией |
| `Card` | Карточка с placeholder и hover |

### Поток данных

```
cards-api.js
     ↑ HTTP запросы
useCards.js  ←→  useSnackbar.js
     ↑                ↑
     └──────  App  ───┘
              ↑
     useSearch.js (фильтрация)
              ↑
         CardList
         ↑       ↑
      Card    EmptyState
```

### Жизненный цикл запроса

```
Пользователь нажимает кнопку
         ↓
App вызывает handleAdd/handleEdit/handleDelete
         ↓
useCards вызывает cardsApi
         ↓
cardsApi делает fetch запрос
         ↓
Успех → обновляет состояние + showSuccess()
Ошибка → showError() + throw err
         ↓
useSnackbar показывает уведомление
```

---

## 🎨 Тёмная тема

Реализована через CSS переменные в `index.css`:

```css
:root {
  --bg-main:        #121212;   /* Основной фон */
  --bg-paper:       #1e1e1e;   /* Фон карточек и диалогов */
  --text-primary:   #ffffff;   /* Основной текст */
  --text-secondary: #aaaaaa;   /* Второстепенный текст */
  --border-color:   #333333;   /* Цвет рамок */
  --accent-main:    #6c63ff;   /* Акцентный цвет */
  --accent-light:   #8b85ff;   /* Светлый акцент (hover) */
}
```

---

## 🔧 Переменные окружения

### `server/.env`

```bash
PORT=4000
MONGODB_URI=mongodb://localhost:27017/cards
```

### `server/.env.example`

```bash
PORT=4000
MONGODB_URI=mongodb://localhost:27017/cards
# Для MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/cards
```

---

## 📦 Зависимости

### Frontend `five15698/package.json`

```json
{
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
```

### Backend `server/package.json`

```json
{
  "dependencies": {
    "cors": "^2.x.x",
    "express": "^4.x.x",
    "mongoose": "^8.x.x"
  }
}
```

---

## ✅ Реализованный функционал

### Фаза 1 — Базовый CRUD
- [x] Отображение карточек в адаптивной сетке
- [x] Добавление новой карточки
- [x] Редактирование существующей карточки
- [x] Диалог подтверждения перед удалением
- [x] Все запросы вынесены в `cards-api.js`
- [x] Кастомный хук `useCards`
- [x] Snackbar уведомления

### Фаза 2 — Улучшение UX
- [x] Skeleton загрузка
- [x] Превью картинки в форме
- [x] Валидация URL изображения
- [x] Placeholder если картинка не загрузилась
- [x] Empty State — нет карточек
- [x] Анимации появления карточек
- [x] Hover эффект на карточках

### Фаза 3 — Поиск и сортировка
- [x] Поиск по названию и описанию
- [x] Кнопка очистки поиска
- [x] Счётчик результатов поиска
- [x] Сортировка по дате (новые/старые)
- [x] Сортировка по названию (А-Я/Я-А)
- [x] Empty State при пустом поиске

---

## 🗺️ Планы развития

### Фаза 4 — Авторизация
- [ ] Регистрация и вход (JWT)
- [ ] Защита маршрутов
- [ ] Профиль пользователя
- [ ] Привязка карточек к автору

### Фаза 5 — Взаимодействие
- [ ] Лайки на карточках
- [ ] Избранное
- [ ] Детальная страница карточки

### Фаза 6 — Инфраструктура
- [ ] React Router
- [ ] Пагинация
- [ ] TypeScript
- [ ] Деплой (Vercel + Railway)
- [ ] Тесты (Vitest)

---

## 👤 Автор

**Evgeny** — [GitHub](https://github.com/37Evgeny)

---

## 📄 Лицензия

MIT © 2025 Evgeny
