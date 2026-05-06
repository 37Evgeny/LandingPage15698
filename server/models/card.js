const mongoose = require('mongoose');

/**
 * Схема карточки.
 * Добавлено поле likes — массив ID пользователей которые лайкнули.
 */
const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Название обязательно'],
      trim: true,
    },
    pictures: {
      type: String,
      required: [true, 'Ссылка на картинку обязательна'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    /** Владелец карточки — ссылка на User */
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
    },
    /**
     * Массив ID пользователей которые лайкнули карточку.
     * Каждый пользователь может лайкнуть только один раз.
     * Повторный PUT — убирает лайк (toggle).
     */
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);
