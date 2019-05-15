'use strict';
const helper = require('../helpers');
const passport = require('passport');

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
            },
            // '/getsession': (req, res, next) => {
            //     res.send("Session color: " + req.session.sessionColor);
            // },
            // '/setsession': (req, res, next) => {
            //     req.session.sessionColor = "Mycolor";
            //     res.send("Session color set ");
            // },
            '/auth/facebook': passport.authenticate('facebook'),
            '/auth/facebook/callback': passport.authenticate('facebook', {
                successRedirect: '/rooms',
                failureRedirect: '/'
            })
        },
        'post': {
        },
        'NA': (req, res, next) => {
            res.status(404).sendFile(process.cwd() + '/views/404.htm');
        }          
    }
    return helper.route(routesObj);
}
