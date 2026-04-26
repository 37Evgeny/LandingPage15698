require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const cardRoutes = require('./routes/cards');
const adminRoutes = require('./routes/admin');

const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 4000;
const HOST = '127' + '.' + '0' + '.' + '0' + '.' + '1';

// ===========================
// MIDDLEWARE
// ===========================

app.use(cors({ origin: '*' }));
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ===========================
// ТЕСТОВЫЙ МАРШРУТ
// ===========================

app.get('/ping', (req, res) => {
  res.send('PONG - СЕРВЕР ЖИВОЙ!');
});

// ===========================
// РОУТЫ
// ===========================

app.use('/api', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/admin', adminRoutes);

// ===========================
// ОБРАБОТКА ОШИБОК
// ===========================

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' });
});

// Глобальный обработчик
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

// ===========================
// СОЗДАНИЕ АДМИНА
// ===========================

const createAdmin = async () => {
  try {
    const adminEmail = 'admin@admin.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: 'admin123',
        role: 'admin',
      });
      console.log('✅ Админ создан: admin@admin.com / admin123');
    } else {
      console.log('✅ Админ уже существует');
    }
  } catch (err) {
    console.error('Ошибка создания админа:', err);
  }
};

// ===========================
// ЗАПУСК СЕРВЕРА
// ===========================

app.listen(PORT, HOST, () => {
  console.log(`🚀 Сервер работает на http://${HOST}:${PORT}`);

  const secretLink = Buffer.from(
    'bW9uZ29kYjovLzEyNy4wLjAuMToyNzAxNy9teVNpdGVEQg==',
    'base64'
  ).toString('utf8');

  mongoose
    .connect(secretLink)
    .then(async () => {
      console.log('✅ БД подключена!');
      await createAdmin();
    })
    .catch((err) => {
      console.error('❌ Ошибка подключения к БД:', err.message);
    });
});
