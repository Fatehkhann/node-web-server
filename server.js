const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

app.set('view engine', 'hbs');

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} | ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n' )
    next();
});
/*
app.use((req, res, next)=>{
    res.render('maintinance.hbs');
});
*/
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to Aorta'
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});


app.get('/bad', (req, res)=>{
    res.send({
        'Error': 'Page not found',
        'Error Code': 404
    });
});

app.listen(3000, () =>{
    console.log('Server started on 3000!');
});