const { Segments, Joi } = require('celebrate');
const validUrl = require('valid-url');

const movieCreate = {
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required().messages({
      'string.base': 'Поле "country" должно быть строкой',
      'string.empty': 'Поле "country" должно быть заполнено',
      'any.required': 'Поле "country" должно быть заполнено',
    }),
    director: Joi.string().required().messages({
      'string.base': 'Поле "director" должно быть строкой',
      'string.empty': 'Поле "director" должно быть заполнено',
      'any.required': 'Поле "director" должно быть заполнено',
    }),
    duration: Joi.number().required().messages({
      'number.base': 'Поле "duration" должно быть числом',
      'number.empty': 'Поле "duration" должно быть заполнено',
      'any.required': 'Поле "duration" должно быть заполнено',
    }),
    year: Joi.string().required().messages({
      'string.base': 'Поле "year" должно быть строкой',
      'string.empty': 'Поле "year" должно быть заполнено',
      'any.required': 'Поле "year" должно быть заполнено',
    }),
    description: Joi.string().required().messages({
      'string.base': 'Поле "description" должно быть строкой',
      'string.empty': 'Поле "description" должно быть заполнено',
      'any.required': 'Поле "description" должно быть заполнено',
    }),
    image: Joi.string()
      .custom((value, helpers) => {
        if (!validUrl.isWebUri(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      })
      .messages({
        'string.base': 'Поле "image" должно быть строкой',
        'string.empty': 'Поле "image" должно быть заполнено',
        'any.required': 'Поле "image" должно быть заполнено',
        'string.uri': 'Поле "image" должно быть допустимым URL-адресом',
      }),
    trailerLink: Joi.string()
      .custom((value, helpers) => {
        if (!validUrl.isWebUri(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      })
      .messages({
        'string.base': 'Поле "trailerLink" должно быть строкой',
        'string.empty': 'Поле "trailerLink" должно быть заполнено',
        'any.required': 'Поле "trailerLink" должно быть заполнено',
        'string.uri': 'Поле "trailerLink" должно быть допустимым URL-адресом',
      }),
    thumbnail: Joi.string()
      .custom((value, helpers) => {
        if (!validUrl.isWebUri(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      })
      .messages({
        'string.base': 'Поле "thumbnail" должно быть строкой',
        'string.empty': 'Поле "thumbnail" должно быть заполнено',
        'any.required': 'Поле "thumbnail" должно быть заполнено',
        'string.uri': 'Поле "thumbnail" должно быть допустимым URL-адресом',
      }),
    movieId: Joi.number().required().messages({
      'number.base': 'Поле "movieId" должно быть числом',
      'number.empty': 'Поле "movieId" должно быть заполнено',
      'any.required': 'Поле "movieId" должно быть заполнено',
    }),
    nameRU: Joi.string().required().messages({
      'string.base': 'Поле "nameRU" должно быть строкой',
      'string.empty': 'Поле "nameRU" должно быть заполнено',
      'any.required': 'Поле "nameRU" должно быть заполнено',
    }),
    nameEN: Joi.string().required().messages({
      'string.base': 'Поле "nameEN" должно быть строкой',
      'string.empty': 'Поле "nameEN" должно быть заполнено',
      'any.required': 'Поле "nameEN" должно быть заполнено',
    }),
  }),
};

const movieId = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().length(24).hex()
      .messages({
        'string.base': 'Поле "movieId" должно быть строкой',
        'string.empty': 'Поле "movieId" должно быть заполнено',
        'string.length': 'Поле "movieId" должно быть длиной 24 символа',
        'string.hex':
        'Поле "movieId" должно содержать только шестнадцатеричные символы',
      }),
  }),
};

const userCreateValidation = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).messages({
      'string.base': 'Поле "name" должно быть строкой',
      'string.empty': 'Поле "name" должно быть заполнено',
      'string.min': 'Минимальная длина поля "name" - 2',
      'string.max': 'Максимальная длина поля "name" - 30',
      'any.required': 'Поле "name" должно быть заполнено',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'Поле "email" должно быть строкой',
      'string.empty': 'Поле "email" должно быть заполнено',
      'string.email': 'Некорректный Email',
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().min(8).required().messages({
      'string.base': 'Поле "password" должно быть строкой',
      'string.empty': 'Поле "password" должно быть заполнено',
      'string.min': 'Минимальная длина поля "password" - 8',
      'any.required': 'Поле "password" должно быть заполнено',
    }),
  }),
};

const userValidation = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).messages({
      'string.base': 'Поле "name" должно быть строкой',
      'string.empty': 'Поле "name" должно быть заполнено',
      'string.min': 'Минимальная длина поля "name" - 2',
      'string.max': 'Максимальная длина поля "name" - 30',
      'any.required': 'Поле "name" должно быть заполнено',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'Поле "email" должно быть строкой',
      'string.empty': 'Поле "email" должно быть заполнено',
      'string.email': 'Некорректный Email',
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().min(8).required().messages({
      'string.base': 'Поле "password" должно быть строкой',
      'string.empty': 'Поле "password" должно быть заполнено',
      'string.min': 'Минимальная длина поля "password" - 8',
      'any.required': 'Поле "password" должно быть заполнено',
    }),
  }),
};

const userUpdateValidation = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).messages({
      'string.base': 'Поле "name" должно быть строкой',
      'string.empty': 'Поле "name" должно быть заполнено',
      'string.min': 'Минимальная длина поля "name" - 2',
      'string.max': 'Максимальная длина поля "name" - 30',
      'any.required': 'Поле "name" должно быть заполнено',
    }),
  }),
};

module.exports = {
  movieCreate,
  movieId,
  userCreateValidation,
  userValidation,
  userUpdateValidation,
};
