'use strict';
const helper = require('../helpers');

module.exports = () => {
    let routesObj = {
        'get': {
            '/': (req, res, next) => {
                res.render('login');
            },
            '/rooms': (req, res, next) => {
                res.render('rooms');
            },
            '/chat': (req, res, next) => {
                res.render('chatroom');
            }
        },
        'post': {
        }
    }
    return helper.route(routesObj);
}