const router = require("express").Router();
const { celebrate } = require("celebrate");
const auth = require("../middlewares/auth");

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require("../controllers/movies");

const { movieCreate, movieId } = require("../utils/joiSchemes");

router.get("/movies", auth, getMovies); // возвращает все сохранённые пользователем фильмы
router.post("/movies", auth, celebrate(movieCreate), createMovie); // создаёт фильм
router.delete("/movies/:id", auth, celebrate(movieId), deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;
