//imports from foreign modules
const express = require('express'); 
const bodyParser = require('body-parser'); 
var expressSanitizer = require('express-sanitizer'); 
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy; 
var session = require('express-session'); 








const app = express(); 


//imports from local modules
const userSchema = require('./Modulo_Mongoose/schemas/user.js');

const administracaoRoutes = require("./routes/administracaoRoutes.js");
const assistenteSocialRoutes = require("./routes/assistenteSocialRoutes.js");
const sessionRoutes = require("./routes/sessionRoutes.js");
const {
    mongoManager
} = require('./Modulo_Mongoose/mongoManager.js');

//Initialize mongo Module
let mongoMan = new mongoManager('segsocial');

const User = mongoManager.connect(userSchema, 'users');


//Initialize express


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


app.use(session({
    secret: 'Terronhas',
    resave: false,
    saveUninitialized: false,
    cookie: {}
}));

app.use(passport.initialize());
app.use(passport.session());

//Get routes
app.use('/', assistenteSocialRoutes);
app.use('/', administracaoRoutes);
app.use('/', sessionRoutes);



//Setup passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Middleware to handle URL's that not exists
app.use(function (req, res,next) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    })
    next();
});


//Start
app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});