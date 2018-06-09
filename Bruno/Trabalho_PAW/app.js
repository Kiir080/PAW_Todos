//imports from foreign modules
const express = require('express');
const bodyParser = require('body-parser');
var expressSanitizer = require('express-sanitizer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
//var flash = require('connect-flash');

//imports from local modules
const userSchema = require('./Modulo_Mongoose/schemas/user.js');
const rececaoRoutes = require('./routes/rececaoRoutes.js');
const sessionRoutes = require("./routes/sessionRoutes.js");
const teste = require("./routes/Teste.js");
const {
    mongoManager
} = require('./Modulo_Mongoose/mongoManager.js');

//Initialize mongo Module
let mongoMan = new mongoManager('hospital');

const User = mongoManager.connect(userSchema, 'users');

//Initialize express
const app = express();

//Setup view engine
app.set('view engine', 'pug');
app.set('views', './views');








app.use(express.static(__dirname + '/views')); //ver ficha 7 caso precise


//Middleware to handle POST requests
app.use(bodyParser.urlencoded({
    extended: true
}));

//Middleware to sanitize data
app.use(expressSanitizer());

//app.use(flash());

app.use(session({
    secret: 'Terronhas',
    resave: false,
    saveUninitialized: false,
    cookie: {}
}));

app.use(passport.initialize());
app.use(passport.session());

//Get routes
app.use('/', sessionRoutes);
app.use('/', rececaoRoutes);
app.use('/', teste);

//Setup passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



/* app.all('*', (req, res, next) => {
    if (!req.session.logedIn) {
        console.log("you aren't logedIn");
        res.status(200).redirect('/');
    }
    next();
}); */

//Middleware to handle URL's that not exists
app.use(function (req, res) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
});

//Start
app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});