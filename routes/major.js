const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/major');
const { isAuthenticated } = require("../middleware/authenticate");

router.use('/', require('./swagger'));

router.get('/', controller.getAllMajors);
router.get('/:id', controller.getSingleMajor);
router.post('/', isAuthenticated, controller.createMajor);
router.put('/:id', isAuthenticated, controller.updateMajor);
router.delete('/:id', isAuthenticated, controller.deleteMajor);

module.exports = router;