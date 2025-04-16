const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/teacher');
const { isAuthenticated } = require("../middleware/authenticate");

router.use('/', require('./swagger'));

router.get('/', controller.getAllTeachers);
router.get('/:id', controller.getSingleTeacher);
router.post('/', isAuthenticated, controller.createTeacher);
router.put('/:id', isAuthenticated, controller.updateTeacher);
router.delete('/:id', isAuthenticated, controller.deleteTeacher);

module.exports = router;