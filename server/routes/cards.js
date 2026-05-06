const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const {
  getCards,
  getCardById,  // ✅ добавлен
  createCard,
  updateCard,
  deleteCard,
  toggleLike,
} = require('../controllers/cards');

/** GET /api/cards — все карточки (публичный) */
router.get('/', getCards);

/**
 * GET /api/cards/:id — одна карточка (публичный).
 * Должен быть ПОСЛЕ PUT /:id/likes и ПОСЛЕ GET /
 * чтобы не перехватывал другие маршруты.
 */
router.get('/:id', getCardById);

/**
 * PUT /api/cards/:id/likes — toggle лайк (авторизованный).
 * Должен быть ДО GET /:id и PATCH /:id
 */
router.put('/:id/likes', authMiddleware, toggleLike);

/** POST /api/cards — создать (авторизованный) */
router.post('/', authMiddleware, createCard);

/** PATCH /api/cards/:id — обновить (владелец или админ) */
router.patch('/:id', authMiddleware, updateCard);

/** DELETE /api/cards/:id — удалить (владелец или админ) */
router.delete('/:id', authMiddleware, deleteCard);

module.exports = router;
