'use strict';
const passport = require('passport');
const config = require('../config');
const helper = require('../helpers');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
	let authProcessor = (accessToken, refreshToken, profile, done) => {
		helper.findOne(profile.id)
			.then(result => {
				if (result) {
					done(null, result);
				} else {
					helper.createNewUser(profile)
						.then(createNewUser => done(null, createNewUser))
						.catch(error => console.log('Error creating a new user in the db', error))
				}
			});
	}
	passport.use(new FacebookStrategy(config.fb, authProcessor));
}