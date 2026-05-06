const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const {
  getCards,
  createCard,
  updateCard,
  deleteCard,
  toggleLike,
} = require('../controllers/cards');

/** GET /api/cards — все карточки (публичный) */
router.get('/', getCards);

/** POST /api/cards — создать (авторизованный) */
router.post('/', authMiddleware, createCard);

/**
 * PUT /api/cards/:id/likes — toggle лайк (авторизованный)
 * Должен быть ДО маршрута /:id чтобы не перехватился как id = "likes"
 */
router.put('/:id/likes', authMiddleware, toggleLike);

/** PATCH /api/cards/:id — обновить (владелец или админ) */
router.patch('/:id', authMiddleware, updateCard);

/** DELETE /api/cards/:id — удалить (владелец или админ) */
router.delete('/:id', authMiddleware, deleteCard);

module.exports = router;
