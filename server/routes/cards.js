const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const {
  getCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  toggleLike,
} = require('../controllers/cards');

/** GET /api/cards?page=1&limit=12 — все карточки с пагинацией (публичный) */
router.get('/', getCards);

/** POST /api/cards — создать карточку (авторизованный) */
router.post('/', authMiddleware, createCard);

/**
 * PUT /api/cards/:id/likes — toggle лайк (авторизованный).
 * Стоит ДО GET /:id — иначе Express примет "likes" как id.
 */
router.put('/:id/likes', authMiddleware, toggleLike);

/** GET /api/cards/:id — одна карточка (публичный) */
router.get('/:id', getCardById);

/** PATCH /api/cards/:id — обновить (владелец или админ) */
router.patch('/:id', authMiddleware, updateCard);

/** DELETE /api/cards/:id — удалить (владелец или админ) */
router.delete('/:id', authMiddleware, deleteCard);

module.exports = router;
