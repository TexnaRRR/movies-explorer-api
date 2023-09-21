const router = require('express').Router();

const userRouter = require('./users');
const moviesRouter = require('./movies');
const Error404 = require('../errors/404');

router.use(userRouter);
router.use(moviesRouter);
router.use((req, res, next) => {
  next(new Error404('несуществующий адрес'));
});

module.exports = router;
