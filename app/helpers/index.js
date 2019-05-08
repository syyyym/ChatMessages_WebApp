'use strict';
const router = require('express').Router();

//Iterates through thr routes object and mounts the routes
let _registerRoutes = (routesObj, method) => {
    for (let key in routesObj) {
        if (typeof routesObj[key] === 'object' && routesObj[key] != null && !(routesObj[key] instanceof Array)) {
            _registerRoutes(routesObj[key], key);
        } else {
            if (method === 'get') {
                router.get(key, routesObj[key]);
            } else if (method === 'post') {
                router.post(key, routesObj[key]);
            } else {
                router.use(routesObj[key]);
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