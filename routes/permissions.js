const permissionsController = require('../controllers/permissionsController');
const auth = require('../middlewares/authorize');
const router = require('express').Router();

router.get('/permissions', auth('ADMINSTRATOR').authorize, permissionsController.getPermissions);

module.exports = router;
