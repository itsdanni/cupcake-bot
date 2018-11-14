const router = require('express').Router();
module.exports = router;

router.use('/events', require('./events'));
router.use('/oauth', require('./oauth'));

router.use((req, res, next) => {
  res.status(404).send('Not found');
});