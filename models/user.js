const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'введите email'],
    unique: true,
    validate: {
      validator: (a) => validator.isEmail(a),
      message: 'Неверный email',
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, 'введите пароль'],
  },
  name: {
    type: String,
    default: 'Ксения',
    minlength: [2, 'минимальное кол-во символов - 2'],
    maxlength: [30, 'максимальное кол-во символов - 30'],
  },
});

module.exports = mongoose.model('User', userSchema);
