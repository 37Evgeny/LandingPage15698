const mongoose = require('mongoose');

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
    // ✅ Владелец карточки — необязательный для совместимости
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);
