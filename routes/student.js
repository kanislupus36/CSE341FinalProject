const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/student');
const { isAuthenticated } = require("../middleware/authenticate");

router.use('/', require('./swagger'));

router.get('/', controller.getAllStudents);
router.get('/:id', controller.getSingleStudent);
router.post('/', isAuthenticated, controller.createStudent);
router.put('/:id', isAuthenticated, controller.updateStudent);
router.delete('/:id', isAuthenticated, controller.deleteStudent);

module.exports = router;