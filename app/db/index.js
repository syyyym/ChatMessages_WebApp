'use strict';
const config = require('../config');
const mongoose = require('mongoose');
mongoose.connect(config.dbURI, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', error => console.error('Database connection error', error));
db.once('open', function () {
  console.log('Database connection successful')
});

module.exports = {
  mongoose
}