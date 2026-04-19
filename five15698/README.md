# 🎨 Drawing Contest — Галерея карточек

Веб-приложение для управления карточками с изображениями.
Позволяет добавлять, редактировать и удалять карточки через удобный интерфейс с тёмной темой.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![MUI](https://img.shields.io/badge/MUI-v7-007FFF?logo=mui)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)

---

## 📸 Возможности

- 🖼️ Отображение карточек в адаптивной сетке
- ➕ Добавление новой карточки (название, картинка, описание)
- ✏️ Редактирование существующей карточки
- 🗑️ Удаление с диалогом подтверждения
- 💀 Skeleton загрузка вместо спиннера
- 🌙 Тёмная тема через CSS переменные
- 📱 Адаптивный дизайн (mobile / tablet / desktop)

---

## 🚀 Стек технологий

### Frontend
| Технология | Версия | Описание |
|-----------|--------|----------|
| React | 18 | UI библиотека |
| Vite | 7 | Сборщик проекта |
| MUI Material | v7 | UI компоненты |
| MUI Icons | v7 | Иконки |

### Backend
| Технология | Описание |
|-----------|----------|
| Node.js | Среда выполнения |
| Express | Веб-фреймворк |
| MongoDB | База данных |
| Mongoose | ODM для MongoDB |

---

## 📁 Структура проекта

```
DrawingContestFive/
├── five15698/                      # Frontend
│   ├── public/                     # Статические файлы
│   ├── src/
│   │   ├── api/
│   │   │   └── cards-api.js        # Все HTTP запросы к API
│   │   ├── components/
│   │   │   ├── App/
│   │   │   │   └── app.jsx         # Главный компонент
│   │   │   ├── AddCardDialog/
│   │   │   │   └── add-card-dialog.jsx  # Диалог добавления/редактирования
│   │   │   ├── Card/
│   │   │   │   └── card.jsx        # Карточка с кнопками
│   │   │   ├── CardList/
│   │   │   │   └── card-list.jsx   # Сетка карточек
│   │   │   ├── ConfirmDialog/
│   │   │   │   └── confirm-dialog.jsx  # Диалог подтверждения удаления
│   │   │   ├── SkeletonCard/
│   │   │   │   ├── skeleton-card.jsx   # Одна карточка-заглушка
│   │   │   │   └── skeleton-list.jsx   # Список заглушек
│   │   │   ├── Header/
│   │   │   │   └── header.jsx
│   │   │   ├── Footer/
│   │   │   │   └── footer.jsx
│   │   │   └── Spinner/
│   │   │       └── spinner.jsx
│   │   ├── hooks/
│   │   │   └── useCards.js         # Кастомный хук карточек
│   │   ├── index.css               # Глобальные стили / CSS переменные
│   │   └── main.jsx                # Точка входа React
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── server/                         # Backend
    ├── index.js                    # Точка входа Express сервера
    ├── data.json                   # Данные
    └── package.json
```

---

## ⚙️ Установка и запуск

### Требования
- Node.js >= 18
- MongoDB (локально или Atlas)
- npm >= 9

### 1. Клонируй репозиторий

```bash
git clone git@github.com:37Evgeny/LandingPage15698.git
cd DrawingContestFive
```

### 2. Запусти Backend

```bash
# Перейди в папку сервера
cd server

# Установи зависимости
npm install

# Запусти сервер
node index.js

# Сервер запустится на:
# http://127.0.0.1:4000
```

### 3. Запусти Frontend

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

## 🔌 API endpoints

| Метод | Endpoint | Описание | Body |
|-------|----------|----------|------|
| `GET` | `/api/cards` | Получить все карточки | — |
| `POST` | `/api/cards` | Создать карточку | `{ name, pictures, description }` |
| `PATCH` | `/api/cards/:id` | Обновить карточку | `{ name, pictures, description }` |
| `DELETE` | `/api/cards/:id` | Удалить карточку | — |

### Пример карточки

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Название карточки",
  "pictures": "https://example.com/image.jpg",
  "description": "Описание карточки"
}
```

---

## 🧩 Архитектура Frontend

### Разделение ответственности

| Файл | Зона ответственности |
|------|---------------------|
| `cards-api.js` | Все HTTP запросы, обработка статусов |
| `useCards.js` | Состояние карточек, бизнес-логика |
| `App` | UI состояние, рендер компонентов |
| `AddCardDialog` | Состояние формы, валидация полей |
| `ConfirmDialog` | Подтверждение удаления |
| `SkeletonList` | Отображение загрузки |
| `CardList` | Сетка карточек |
| `Card` | Отображение одной карточки |

### Поток данных

```
cards-api.js         # HTTP запросы
     ↑
useCards.js          # Хук — состояние и логика
     ↑
App.jsx              # UI состояние, диалоги
     ↑
CardList → Card      # Отображение карточек
```

---

## 🎨 Тёмная тема

Тема реализована через CSS переменные в `index.css`:

```css
:root {
  --bg-paper: #1e1e1e;        /* Фон карточек */
  --text-primary: #ffffff;    /* Основной текст */
  --text-secondary: #aaaaaa;  /* Второстепенный текст */
  --border-color: #333333;    /* Цвет рамок */
  --accent-main: #6c63ff;     /* Акцентный цвет */
  --accent-light: #8b85ff;    /* Светлый акцент */
}
```

---

## ✅ Реализованный функционал

- [x] Отображение карточек в адаптивной сетке
- [x] Добавление новой карточки
- [x] Редактирование существующей карточки
- [x] Диалог подтверждения перед удалением
- [x] Skeleton загрузка вместо спиннера
- [x] Тёмная тема через CSS переменные
- [x] Все запросы вынесены в `cards-api.js`
- [x] Кастомный хук `useCards`
- [x] Валидация формы
- [x] Адаптивный дизайн
- [x] Иконки MUI

---

## 🔧 Переменные окружения

Создай файл `.env` в папке `server`:

```bash
PORT=4000
MONGODB_URI=mongodb://localhost:27017/cards
```

---

## 📦 Зависимости Frontend

```json
{
  "@mui/material": "^7.x.x",
  "@mui/icons-material": "^7.x.x",
  "@emotion/react": "^11.x.x",
  "@emotion/styled": "^11.x.x",
  "react": "^18.x.x",
  "react-dom": "^18.x.x"
}
```

## 📦 Зависимости Backend

```json
{
  "express": "^4.x.x",
  "mongoose": "^8.x.x",
  "cors": "^2.x.x"
}
```

---

## 👤 Автор

**Evgeny** — [GitHub](https://github.com/37Evgeny)

---

## 📄 Лицензия

MIT
