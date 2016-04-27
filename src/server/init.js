'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const cluster = require('cluster');

if (cluster.isMaster) {
  require('./master.js');
} else {
  let server = require('./server.js');
  process.on('message', function (msg) {
    if ('server:close' == msg) {
      server.on('close', function () {
        console.log('close event');
      });
      server.close(function () {
        console.log('close callback');
      });
    }
  });
}
