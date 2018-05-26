'use-strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer'); //Para retirar comandos JS dos pedidos (impedir SQL injection etc...)

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.static(__dirname + '/views'));

const {
    mongoManager
} = require('../Modulo_Mongoose/mongoManager');
let mongoM = new mongoManager('testeM', 'users');


// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/views/form.html');
// });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/formLogin.html');
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(expressSanitizer());

app.get('/x', (req, res) => {
    mongoM.findDocument({
        Email: "a"
    }, function (x) {
        x.forEach(element => {
            console.log(element);
        });
    });

});


app.post('/submit', (req, res) => {
    const s = require('./signUp');

    s.signUp(req.body);
    res.status(200).send("a");
    
});

app.post('/submitL', (req, res) => {
    const s = require('./signUp');

    s.signIn(req.body,res);
    
});




app.listen(8000, () => {
    console.log('Servidor ativo na porta 8000');
});