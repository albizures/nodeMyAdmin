'use strict';
const bodyParser = require('body-parser'),
  config = require('./enviroment');

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  if (config.isDev) {
    app.use(config.webpackMiddleware);
    app.use(config.webpackHotMiddleware);
  } else {
    app.use(express.static(config.PUBLIC_PATH));
  }
};
