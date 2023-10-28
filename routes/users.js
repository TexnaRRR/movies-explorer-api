const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getAboutMe,
  createUser,
  updateUser,
  login,
  logout,
} = require('../controllers/users');

const {
  userValidation,
  userUpdateValidation,
  userCreateValidation,
} = require('../utils/joiSchemes');

router.get('/users/me', auth, getAboutMe); // возвращает информацию о пользователе (email и имя)
router.patch('/users/me', auth, celebrate(userUpdateValidation), updateUser); // обновляет информацию о пользователе (email и имя)
router.post('/signup', celebrate(userCreateValidation), createUser); // создаёт пользователя с переданными в теле email, password и name
router.post('/signin', celebrate(userValidation), login); // проверяет переданные в теле почту, пароль и возвращает JWT
router.post('/signout', logout); // разлогирование

module.exports = router;
