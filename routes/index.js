const router = require('express').Router();
//const passport = require('passport');
//const { isAuthenticated } = require("../middleware/authenticate");

router.use('/', require('./swagger'));
router.get('/', (req, res) => {res.send('Welcome!');});

router.use('/student', require('./student'));


// router.get('/login', passport.authenticate('github'), (req, res) => {});
// router.get('/logout', function(req, res, next) {
//     req.logout(function(err) {
//         if (err) {return next(err); }
//         res.redirect('/');
//     });
// });

module.exports = router;