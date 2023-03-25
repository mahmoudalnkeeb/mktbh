const router = require('express').Router();
const adminPanelRouter = require('./adminPanel');
const permRouter = require('./permissions');
const rolesRouter = require('./roles');

router.get('/', (req, res) => res.status(200).json({ message: 'Hello World!' }));
router.get('/test', (req, res) => res.status(200).json({ message: 'working' }));
router.use('/panel', adminPanelRouter);
router.use('/perms', permRouter);
router.use('/panel/roles', rolesRouter);

module.exports = router;
