const adminController = require('../controllers/adminPanelController');
const auth = require('../middlewares/authorize');
const { validateLogin, validateSignup } = require('../middlewares/validateAuth');

const router = require('express').Router();

// auth
router.post('/login', validateLogin, adminController.login); //validateLogin,
router.post('/signup', validateSignup, auth('ADMINSTRATOR').authorize, adminController.signup);

// users
router.get('/users', auth('ADMINSTRATOR').authorize, adminController.getUsers);
router.put('/users/:id', auth('ADMINSTRATOR').authorize, adminController.updateUser);
router.delete('/users/:id', auth('ADMINSTRATOR').authorize, adminController.deleteUser);

// admin panel

router.get('/roles/permissions/:id', auth('ADMINSTRATOR').authorize, adminController.getRolePermissions);
router.get('/users/roles/:id', auth('ADMINSTRATOR').authorize, adminController.getUserRoles);
// router.get('/users/permissions', auth('ADMINSTRATOR').authorize , adminController.getUserPermissions) ;
router.post('/users/roles/', auth('ADMINSTRATOR').authorize, adminController.createUserRole);
router.post('/roles/permissions', auth('ADMINSTRATOR').authorize, adminController.createRolePermission);

module.exports = router;
