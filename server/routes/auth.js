const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const { register, login, getMe } = require('../controllers/auth');

// POST /api/signup — регистрация
router.post('/signup', register);

// POST /api/signin — вход
router.post('/signin', login);

// GET /api/users/me — текущий пользователь (защищённый)
router.get('/users/me', authMiddleware, getMe);

module.exports = router;
