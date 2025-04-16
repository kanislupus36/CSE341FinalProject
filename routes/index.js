const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.get('/', (req, res) => {res.send('Welcome!');});

router.use('/student', require('./student'));
router.use('/course', require('./course'));
router.use('/teacher', require('./teacher'));
router.use('/major', require('./major'));


router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err); }
        res.redirect('/');
    });
});

module.exports = router;