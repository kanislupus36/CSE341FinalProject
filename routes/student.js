const router = require('express').Router();
//const passport = require('passport');
const controller = require('../controllers/student');
//const { isAuthenticated } = require("../middleware/authenticate");

router.use('/', require('./swagger'));

router.get('/', controller.getAllStudents);
router.get('/:id', controller.getSingleStudent);
router.post('/', controller.createStudent);
router.put('/:id', controller.updateStudent);
router.delete('/:id', controller.deleteStudent);

// router.get('/login', passport.authenticate('github'), (req, res) => {});
// router.get('/logout', function(req, res, next) {
//     req.logout(function(err) {
//         if (err) {return next(err); }
//         res.redirect('/');
//     });
// });

module.exports = router;