const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');
const { getUsers, deleteUser, updateUserRole } = require('../controllers/admin');

// Все маршруты защищены — нужен токен + роль admin
router.use(authMiddleware);
router.use(adminMiddleware);

// GET /api/admin/users — список всех пользователей
router.get('/users', getUsers);

// DELETE /api/admin/users/:id — удалить пользователя
router.delete('/users/:id', deleteUser);

// PATCH /api/admin/users/:id/role — изменить роль
router.patch('/users/:id/role', updateUserRole);

module.exports = router;
