'use strict'
const express = require('express');
const app = express();
const chatApp = require('./app');
const passport = require('passport');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(chatApp.session);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', chatApp.router);

chatApp.ioServer(app).listen(app.get('port'), () => {
    console.log("Chat Application running on port 3000")
});
