'use strict';
const express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  port = 3000;

require('./config/express.js')(app);

server.listen(port, function () {
  console.log('Express server listening on ' + port);
});
module.exports = server;
