'use strict';

const express = require('express');
const app=express();

app.set('view engine','jade');
app.set('views','./views');


app.get('/',(req,res)=>{
    res.send('Hello World!');
});


app.get('/jade',(req,res)=>{
    res.render('index', {
        title: 'CLASSICO',
        messageTitle: 'PORTO',
        messageText: 'SPORTING'
    })
});

app.listen(8000,() => {
    console.log('Servidor ativo na porta 8000');
});