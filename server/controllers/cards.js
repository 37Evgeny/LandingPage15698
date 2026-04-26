const Card = require('../models/card');

// ✅ Получить все карточки — публичный
const getCards = async (req, res) => {
  try {
    const cards = await Card.find().populate('owner', 'name email role');
    res.json(cards);
  } catch (err) {
    console.error('Ошибка получения карточек:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// ✅ Создать карточку — только авторизованные
const createCard = async (req, res) => {
  try {
    const { name, pictures, description } = req.body;

    const card = await Card.create({
      name,
      pictures,
      description,
      owner: req.user._id, // ✅ Привязываем к пользователю
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

// ✅ Обновить карточку — владелец или админ
const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, pictures, description } = req.body;

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }

    // ✅ Админ может редактировать любую карточку
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

// ✅ Удалить карточку — владелец или админ
const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: 'Карточка не найдена' });
    }

    // ✅ Админ может удалять любую карточку
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

module.exports = { getCards, createCard, updateCard, deleteCard };
