require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const cardRoutes = require('./routes/cards');
const adminRoutes = require('./routes/admin');
const User = require('./models/user');

const app = express();

/**
 * Порт сервера — берётся из .env или дефолтный 4000.
 * @constant {number}
 */
const PORT = process.env.PORT || 4000;

// ===========================
// MIDDLEWARE
// ===========================

/**
 * CORS — разрешаем запросы с любого origin для разработки.
 * В production заменить '*' на конкретный домен фронтенда.
 */
app.use(cors({ origin: '*' }));

/** Парсинг JSON тела запроса */
app.use(express.json());

/**
 * Логирование всех входящих запросов.
 * Помогает отлаживать какие маршруты вызываются.
 */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ===========================
// ТЕСТОВЫЙ МАРШРУТ
// ===========================

/**
 * GET /ping
 * Проверка что сервер живой — не требует авторизации.
 */
app.get('/ping', (req, res) => {
  res.send('PONG - СЕРВЕР ЖИВОЙ!');
});

// ===========================
// РОУТЫ
// ===========================

/** Маршруты авторизации: /api/signup, /api/signin, /api/users/me */
app.use('/api', authRoutes);

/** Маршруты карточек: /api/cards */
app.use('/api/cards', cardRoutes);

/** Маршруты администратора: /api/admin/users */
app.use('/api/admin', adminRoutes);

// ===========================
// ОБРАБОТКА ОШИБОК
// ===========================

/**
 * 404 — маршрут не найден.
 * Срабатывает если ни один роут не обработал запрос.
 */
app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

/**
 * Глобальный обработчик ошибок Express.
 * Ловит все ошибки переданные через next(err).
 *
 * @param {Error} err - объект ошибки
 * @param {object} req - объект запроса
 * @param {object} res - объект ответа
 * @param {function} next - следующий middleware
 */
app.use((err, req, res, next) => {
  console.error('❌ Глобальная ошибка:', err.stack);
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

// ===========================
// СОЗДАНИЕ АДМИНА
// ===========================

/**
 * Создаёт дефолтного администратора при первом запуске.
 * Если админ уже существует — пропускает создание.
 * Вызывается после успешного подключения к MongoDB.
 */
const createAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log(`✅ Админ создан: ${adminEmail} / ${adminPassword}`);
    } else {
      console.log('✅ Админ уже существует');
    }
  } catch (err) {
    console.error('❌ Ошибка создания админа:', err);
  }
};

// ===========================
// ПОДКЛЮЧЕНИЕ К БД И ЗАПУСК
// ===========================

/**
 * URI подключения к MongoDB.
 * Берётся из .env переменной MONGO_URI.
 * Дефолтное значение для локальной разработки.
 * @constant {string}
 */
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mySiteDB';

/**
 * Подключаемся к MongoDB, затем запускаем сервер.
 * Порядок важен — сначала БД, потом listen.
 * Это гарантирует что сервер не принимает запросы
 * пока база данных не готова.
 */
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('✅ БД подключена!');

    // Создаём админа после подключения к БД
    await createAdmin();

    /**
     * ✅ ИСПРАВЛЕНО: убрали HOST параметр из listen.
     * Без HOST сервер слушает на 0.0.0.0 — все интерфейсы.
     * Это решает проблему Safari где localhost → ::1 (IPv6),
     * а 127.0.0.1 это только IPv4.
     */
    app.listen(PORT, () => {
      console.log(`🚀 Сервер работает на http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Ошибка подключения к БД:', err.message);
    // Завершаем процесс если БД недоступна
    process.exit(1);
  });
