'use strict';
const router = require('express').Router();
router.get('/', (req, res, next) => {
    res.render('login', {
        pageTitle: 'My Login Page'
    });
});
router.get('/info', (req,res, next) => {
    res.send('<h1>Info </h1>');
});

module.exports = {
    router: router
}