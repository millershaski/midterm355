const router = require('express').Router();

const plantRoutes = require('./plantController');

router.use('/plants', plantRoutes);

module.exports = router;

