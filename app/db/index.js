'use strict';
const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.dbURI, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', error => console.error('Database connection error', error));
db.once('open', function () {
  console.log('Database connection successful')
});

// Create a Schema for user authenticating with fb or twitter
const chatUserSchema = new mongoose.Schema({ 
	profileId: String, 
	fullName: String,
	profilePic: String
});
// Turn schema into model - 'chatusers' collection in db
let userModel = mongoose.model('chatUser', chatUserSchema); 

module.exports = {
  mongoose,
  userModel
}