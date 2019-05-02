'use strict'
const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res, next) => {
    res.sendFile( __dirname + '/views/login.htm')
});

app.listen(app.get('port'), () => {
    console.log("Chat Application running on port 3000")
});
