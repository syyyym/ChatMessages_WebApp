'use strict';
const winston = require('winston');
let logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'chatDebug.log',
      level: 'debug',
      handleExceptions: true
    }),
    new (winston.transports.Console)({
      level: 'debug',
      json: true,
      handleExceptions: true
    })
  ],
  exitOnError: false,
});

module.exports = logger;