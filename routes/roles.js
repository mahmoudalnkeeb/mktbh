const rolesController = require('../controllers/rolesController');
const auth = require('../middlewares/authorize');
const router = require('express').Router();

router.get('/', auth('ROLES.GET').authorize, rolesController.getRoles);
router.get('/create', auth('ROLES.CREATE').authorize, rolesController.createRole);
router.get('/rename', auth('ROLES.UPDATE').authorize, rolesController.updateRoleName);
router.get('/delete', auth('ROLES.DELETE').authorize, rolesController.deleteRole);

module.exports = router;
