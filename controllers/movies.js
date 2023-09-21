const Movie = require("../models/movie");
const Error404 = require("../errors/404");
const Error403 = require("../errors/403");
const Error400 = require("../errors/400");

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
    } = req.body;

    const movie = await Movie.create({
      country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: req.user._id,
    });

    if (!movie) {
      throw new Error404("Фильм не создан");
    } else {
      res.status(201).send(movie);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new Error400('Некоррекные данные'));
    } else {}
    console.log(err)
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    console.log(id)
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new Error404("Фильм не найден");
    }

    if (movie.owner.toString() !== userId) {
      throw new Error403("Нет прав на удаление фильма");
    }

    await Movie.findByIdAndRemove(movie._id);

    res.send({ message: "Фильм удален" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
