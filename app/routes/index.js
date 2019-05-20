'use strict';
const helper = require('../helpers');
const passport = require('passport');

module.exports = () => {
    let routesObj = {
        'get': {
            '/': (req, res, next) => {
                res.render('login');
            },
            '/rooms': [
                helper.isAuthenticated,
                (req, res, next) => {
                    //console.log('User', req.user);
                    res.render('rooms', {
                        user: req.user
                    });
                }],
            '/chat': [
                helper.isAuthenticated,
                (req, res, next) => {
                    res.render('chatroom', {
                        user: req.user
                    });
                }],
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
            }),
            '/logout': (req, res, next) => {
                req.logout();
                res.redirect('/');
            }
        },
        'post': {
        },
        'NA': (req, res, next) => {
            res.status(404).sendFile(process.cwd() + '/views/404.htm');
        }
    }
    return helper.route(routesObj);
}
