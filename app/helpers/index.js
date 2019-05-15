'use strict';
const router = require('express').Router();
const db = require('../db'); 

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

// Find a single user(document) in database based on profileId
let findOne = profileID => {
	return db.userModel.findOne({ 
		'profileId': profileID 
	}); //returns a promise
}

// Create a new user in database and return that instance
let createNewUser = profile => {
    return new Promise((resolve, reject) => {
        let newchatUser = new db.userModel({
            profileId: profile.id, 
			fullName: profile.displayName,
			profilePic: profile.photos[0].value || '' 
        });
        newchatUser.save( error => {
            if(error){
                reject(error);
            } else {
                console.log('New user create in db');
                resolve(newchatUser);
            }
        })
    });
}

// Find and fetch the user(document) from the collection based on the unique id 
let findById = id => {
	return new Promise((resolve, reject) => {
		db.userModel.findById(id, (error, user) => { 
			if(error) {
                console.log('Fetch user error');
				reject(error);
			} else {
                console.log('User fetched by id');
				resolve(user);
			}
		});
	});
}

let routeFunc = routesObj => {
    _registerRoutes(routesObj);
    return router;
}

module.exports = {
    route: routeFunc,
    findOne,
    createNewUser,
    findById
}