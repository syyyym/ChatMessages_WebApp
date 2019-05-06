'use strict';
const router = require('express').Router();

//Iterates through thr routes object and mounts the routes
let _registerRoutes = (routes, method) => {
    for (let key in routes) {
        if (typeof routes[key] === 'object' && routes[key] != null && !(routes[key] instanceof Array)) {
            _registerRoutes(routes[key], key);
        } else {
            if (method === 'get') {
                router.get(key, routes[key]);
            } else if (method === 'post') {
                router.post(key, routes[key]);
            }
        }
    }
}
let routeFunc = routesObj => {
    _registerRoutes(routesObj);
    return router;
}
module.exports = {
    route: routeFunc
}