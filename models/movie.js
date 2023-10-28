const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'заполните поле'],
  },

  director: {
    type: String,
    required: [true, 'заполните поле'],
  },
  duration: {
    type: Number,
    required: [true, 'заполните поле'],
  },
  year: {
    type: String,
    required: [true, 'заполните поле'],
  },
  description: {
    type: String,
    required: [true, 'заполните поле'],
  },
  image: {
    type: String,
    required: [true, 'заполните поле'],
    validate: {
      validator: (a) => validator.isURL(a),
      message: 'Укажите адрес',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'заполните поле'],
    validate: {
      validator: (a) => validator.isURL(a),
      message: 'Укажите адрес',
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (a) => validator.isURL(a),
      message: 'Вставьте ссылку на изображение',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'заполните поле'],
  },
  movieId: {
    type: Number,
    required: [true, 'заполните поле'],
  },
  nameRU: {
    type: String,
    required: [true, 'заполните поле'],
  },
  nameEN: {
    type: String,
    required: [true, 'заполните поле'],
  },
});

module.exports = mongoose.model('Movie', movieSchema);
