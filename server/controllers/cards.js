const Card = require('../models/card');

/**
 * Получить все карточки с пагинацией.
 * GET /api/cards?page=1&limit=12
 *
 * @param {object} req - req.query.page, req.query.limit
 * @param {object} res - { cards, total, page, totalPages, hasMore }
 */
const getCards = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 12);
    const skip  = (page - 1) * limit;

    const [total, cards] = await Promise.all([
      Card.countDocuments(),
      Card.find()
        .populate('owner', 'name email role')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      cards,
      total,
      page,
      totalPages,
      hasMore: page < totalPages,
    });
  } catch (err) {
    console.error('Ошибка получения карточек:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

/**
 * Получить одну карточку по ID.
 * GET /api/cards/:id
 * Публичный маршрут.
 *
 * @param {object} req - req.params.id
 * @param {object} res - карточка или 404
 */
const getCardById = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await Card.findById(id)
      .populate('owner', 'name email role');

    if (!card) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }

    res.json(card);
  } catch (err) {
    console.error('Ошибка получения карточки:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

/**
 * Создать карточку.
 * POST /api/cards
 * Только авторизованные.
 *
 * @param {object} req - req.body { name, pictures, description }, req.user._id
 * @param {object} res - созданная карточка с populate owner
 */
const createCard = async (req, res) => {
  try {
    const { name, pictures, description } = req.body;

    const card = await Card.create({
      name,
      pictures,
      description,
      owner: req.user._id,
    });

    const populatedCard = await card.populate('owner', 'name email role');
    res.status(201).json(populatedCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error('Ошибка создания карточки:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

/**
 * Обновить карточку.
 * PATCH /api/cards/:id
 * Владелец или админ.
 *
 * @param {object} req - req.params.id, req.body, req.user
 * @param {object} res - обновлённая карточка или ошибка
 */
const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, pictures, description } = req.body;

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }

    const isAdmin = req.user.role === 'admin';
    const isOwner =
      card.owner && card.owner.toString() === req.user._id.toString();

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Нет прав для редактирования' });
    }

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { name, pictures, description },
      { new: true, runValidators: true }
    ).populate('owner', 'name email role');

    res.json(updatedCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    console.error('Ошибка обновления карточки:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

/**
 * Удалить карточку.
 * DELETE /api/cards/:id
 * Владелец или админ.
 *
 * @param {object} req - req.params.id, req.user
 * @param {object} res - { message, id }
 */
const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }

    const isAdmin = req.user.role === 'admin';
    const isOwner =
      card.owner && card.owner.toString() === req.user._id.toString();

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Нет прав для удаления' });
    }

    await Card.findByIdAndDelete(id);
    res.json({ message: 'Карточка удалена', id });
  } catch (err) {
    console.error('Ошибка удаления карточки:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

/**
 * Переключить лайк на карточке.
 * PUT /api/cards/:id/likes
 * Только авторизованные.
 *
 * Toggle логика:
 * - уже лайкнул → $pull (убрать)
 * - не лайкнул  → $addToSet (добавить уникально)
 *
 * @param {object} req - req.params.id, req.user._id
 * @param {object} res - обновлённая карточка с актуальным likes[]
 */
const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }

    const alreadyLiked = card.likes.some(
      (likeId) => likeId.toString() === userId.toString()
    );

    const updateQuery = alreadyLiked
      ? { $pull:    { likes: userId } }
      : { $addToSet: { likes: userId } };

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      updateQuery,
      { new: true }
    ).populate('owner', 'name email role');

    res.json(updatedCard);
  } catch (err) {
    console.error('Ошибка лайка:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// ✅ Один module.exports — все шесть функций
module.exports = {
  getCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  toggleLike,
};
