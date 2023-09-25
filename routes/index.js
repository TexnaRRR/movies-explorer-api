const router = require('express').Router();

const userRouter = require('./users');
const moviesRouter = require('./movies');
const Error404 = require('../errors/404');
const errors = require('../lang/ru/errors');

router.use(userRouter);
router.use(moviesRouter);
router.use((req, res, next) => {
  next(new Error404(errors.addressNotExist));
});

module.exports = router;
