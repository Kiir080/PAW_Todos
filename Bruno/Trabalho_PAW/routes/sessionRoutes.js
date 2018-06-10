const express = require('express');
const router = express.Router();
var passport = require('passport');
var ExpressPermissions = require('express-permission-rules');

const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager.js');
const userSchema = require('../Modulo_Mongoose/schemas/user');
const User = mongoManager.connect(userSchema, 'users');


router.get('/', function (req, res) {
    res.render('login');
});

router.post('/signUp', function (req, res) {
    User.register(new User({
            username: req.sanitize(req.body.username),
            email: req.sanitize(req.body.email),
            departamento: req.sanitize(req.body.departamento)
        }),
        req.sanitize(req.body.password),
        function (err, user) {
            if (err) {
                console.log(err);
            }

            passport.authenticate('local')(req, res, function () {
                res.status(200).redirect('/');
            });
        });
});

router.post('/signIn', function (req, res, next) {
  
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/');
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect(`/${req.user.departamento}`);
            });
        })(req, res, next);
});



router.post('/logOut', function (req, res) {
    req.logout();
    res.redirect('/');
})

module.exports = router;