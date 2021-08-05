const router = require('express').Router();

const apiRoutes = require('./apiRoutes');
const homeRoutes = require('./htmlRoutes');

router.use('/api', apiRoutes);

router.use('/', homeRoutes);


module.exports = router;