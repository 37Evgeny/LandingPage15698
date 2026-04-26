const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const {
  getCards,
  createCard,
  updateCard,
  deleteCard,
} = require('../controllers/cards');

// GET /api/cards — все карточки (публичный)
router.get('/', getCards);

// POST /api/cards — создать (защищённый)
router.post('/', authMiddleware, createCard);

// PATCH /api/cards/:id — обновить (владелец или админ)
router.patch('/:id', authMiddleware, updateCard);

// DELETE /api/cards/:id — удалить (владелец или админ)
router.delete('/:id', authMiddleware, deleteCard);

module.exports = router;
