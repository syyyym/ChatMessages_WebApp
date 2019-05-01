'use strict'
const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3000);

let helloMiddleware = (req, res, next) => {
    req.hello = "Hello middleware";
    next();
}

app.use(helloMiddleware);
//app.use('/dashboard', helloMiddleware);

app.get('/', (req, res, next) => {
    res.send('<h1>Hello Express! </h1>');
    console.log(req.hello);
});
app.get('/dashboard', (req, res, next) => {
    res.send('<h1>This is the dashboard page. ' + req.hello + '</h1>');
});
app.listen(app.get('port'), () => {
    console.log("Chat Application running on port 3000")
});