const User = require('../models/user');
const Card = require('../models/card');

// ✅ Получить всех пользователей
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('Ошибка получения пользователей:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// ✅ Удалить пользователя и его карточки
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Нельзя удалить самого себя
    if (id === req.user._id.toString()) {
      return res.status(400).json({ message: 'Нельзя удалить самого себя' });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // ✅ Удаляем все карточки пользователя
    await Card.deleteMany({ owner: id });

    res.json({ message: 'Пользователь и его карточки удалены', id });
  } catch (err) {
    console.error('Ошибка удаления пользователя:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// ✅ Изменить роль пользователя
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Неверная роль' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (err) {
    console.error('Ошибка изменения роли:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { getUsers, deleteUser, updateUserRole };
