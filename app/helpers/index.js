'use strict';
const router = require('express').Router();
const db = require('../db'); 
const crypto = require('crypto'); 

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

//Check if the user is logged in, redirect to login if not
let isAuthenticated = (req, res, next) => {
	if(req.isAuthenticated()) {
		next(); 
	} else {
		res.redirect('/'); 
	}
}

// Find a chatroom by a given name
let findRoomByName = (allrooms, room) => {
	let findRoom = allrooms.findIndex((element, index, array) => { 
		if(element.room === room) { 
			return true;
		} else {
			return false; 
		}
	});
	return findRoom > -1 ? true : false; 
}

// A function that generates a unique roomID
let randomHex = () => {
	return crypto.randomBytes(24).toString('hex'); 
}

// Find a chatroom with a given ID
let findRoomById = (allrooms, roomID) => {
	return allrooms.find((element, index, array) => {
		if(element.roomID === roomID) {  
			return true; 
		} else {
			return false; 
		}
	});
}

// Add a user to a chatroom 
let addUserToRoom = (allrooms, data, socket) => {
	// Get the room object
	let getRoom = findRoomById(allrooms, data.roomID); 
	if(getRoom !== undefined) {
		// Get the active user's ID (ObjectID as used in session)
        let userID = socket.request.session.passport.user; 
		// Check if this user already exists in the chatroom 
		let checkUserIndex = getRoom.users.findIndex((element, index, array) => {
			if(element.userID === userID) { 
				return true; 
			} else {
				return false; 
			}
		});
        //If the user is already present in the room, remove him first
		if(checkUserIndex > -1) {
			getRoom.users.splice(checkUserIndex, 1); 
        }
        //Push the user into the room's users array
		getRoom.users.push({
			socketID: socket.id, 
			userID,
			user: data.userName,
			userPic: data.userPic
        });
        // User joins the room channel
		socket.join(data.roomID); 
		return getRoom;
	}
}

// Find and remove the user from room when a socket disconnects
let removeUserFromRoom = (allrooms, socket) => {
	for (let room of allrooms) {
		let findUserIndex = room.users.findIndex((element, index, array) => {
			return element.socketID === socket.id ? true : false;
		});
		if (findUserIndex > -1) {
			socket.leave(room.roomID);
			room.users.splice(findUserIndex, 1);
			return room;
		}
	}
}

let routeFunc = routesObj => {
    _registerRoutes(routesObj);
    return router;
}

module.exports = {
    route: routeFunc,
    findOne,
    createNewUser,
    findById,
    isAuthenticated,
    findRoomByName,
    randomHex,
    findRoomById,
	addUserToRoom,
	removeUserFromRoom
}