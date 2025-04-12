const router = require('express').Router();
//const passport = require('passport');
const controller = require('../controllers/student');
//const { isAuthenticated } = require("../middleware/authenticate");

router.use('/', require('./swagger'));

router.get('/student', controller.getAllStudents);
router.get('/student/:id', controller.getSingleStudent);
router.post('/student', controller.createStudent);
router.put('/student/:id', controller.updateStudent);
router.delete('/student/:id', controller.deleteStudent);

// router.get('/login', passport.authenticate('github'), (req, res) => {});
// router.get('/logout', function(req, res, next) {
//     req.logout(function(err) {
//         if (err) {return next(err); }
//         res.redirect('/');
//     });
// });

module.exports = router;