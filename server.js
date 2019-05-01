'use strict'
const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.send('<h1>Hello Express!</h1>');
});
app.get('/dashboard', (req, res, next) => {
    res.send('<h1>This is the dashboard page</h1>');
});
app.listen(3000, () => {
    console.log("Chat App running on port 3000")
});