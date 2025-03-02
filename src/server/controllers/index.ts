const router = require('express').Router();

const homeRoutes = require("./HomeController");
const plantRoutes = require('./plantController');

router.use('/', homeRoutes);
router.use('/plants', plantRoutes);

module.exports = router;

