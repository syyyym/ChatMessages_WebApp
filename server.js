'use strict'
const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    //res.sendFile( __dirname + '/views/login.htm')
    res.render('login', {
        pageTitle: 'My Login Page'
    });
});

app.listen(app.get('port'), () => {
    console.log("Chat Application running on port 3000")
});