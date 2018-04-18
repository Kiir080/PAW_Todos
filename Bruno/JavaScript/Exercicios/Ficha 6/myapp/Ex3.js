'use-strict';
const express = require('express');
const app=express();
const bodyParser = require('body-parser');
const fs = require('fs');
const expressSanitizer = require('express-sanitizer'); //Para retirar comandos JS dos pedidos (impedir SQL injection etc...)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressSanitizer());
app.use(express.static(__dirname + '/views'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/views/form.html');
});

app.use(checkData);

function checkData(req,res,next){
    if((req.body.password.length > 6 || /\d/.test(req.body.password)) 
        && req.body.password===req.body.confirmarPassword && req.body.nome !== ""){ 
        
            fs.writeFile('xptoPost.json',JSON.stringify(req.body), function (err) {
                if (err) throw err;
                console.log('Saved!');
            });

            res.send('Formulario guardado');
    }else{
        res.status(401).send('Error');
    }

    next();
}

app.post('/submit',(req,res)=>{
    
});



app.listen(8000,() => {
    console.log('Servidor ativo na porta 8000');
});