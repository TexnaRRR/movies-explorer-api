const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Error400 = require('../errors/400');
const Error401 = require('../errors/401');
const Error404 = require('../errors/404');
const Error409 = require('../errors/409');
const JWT_DEV = require('../utils/jwtDev');
const errors = require('../lang/ru/errors');

const { NODE_ENV } = process.env;
const JWT_KEY = process.env.JWT_SECRET;

const getAboutMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error404(errors.userNotFound);
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new Error404(errors.userNotUpdated);
    } else {
      res.send(user);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new Error400(errors.incorrectData));
    } else {
      next(err);
    }
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      name, email, password
    } = req.body;

    const hashPass = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashPass,
    });

    res.status(201).send({
      name,
      email,
    });
  } catch (err) {
    if (err.code === 11000) {
      const conflict = new Error409(errors.emailExists);
      next(conflict);
    }
    if (err.name === 'ValidationError') {
      next(new Error400(errors.incorrectData));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error401(errors.incorrectEmailPassword);
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_KEY : JWT_DEV,
      { expiresIn: '7d' },
    );

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.send({ message: 'Успех успешный' });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: 'Вы успешно вышли из аккаунта' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAboutMe,
  updateUser,
  createUser,
  login,
  logout,
};
