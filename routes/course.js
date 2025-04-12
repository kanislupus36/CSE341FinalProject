const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/course');
const { isAuthenticated } = require("../middleware/authenticate");

router.use('/', require('./swagger'));

router.get('/', controller.getAllCourses);
router.get('/:id', controller.getSingleCourse);
router.post('/', isAuthenticated, controller.createCourse);
router.put('/:id', isAuthenticated, controller.updateCourse);
router.delete('/:id', isAuthenticated, controller.deleteCourse);

module.exports = router;