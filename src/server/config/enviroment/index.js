'use strict'
const path = require('path'),
  _ = require('lodash'),
  ROOT_PATH = path.join(__dirname, '..', '..', '..', '..'),
  PUBLIC_PATH = path.join(ROOT_PATH, 'public'),
  MODULES_PATH = path.join(ROOT_PATH, 'node_modules'),
  SOURCE_PATH = path.join(ROOT_PATH, 'src'),
  CLIENT_PATH = path.join(SOURCE_PATH, 'client'),
  APP_CLIENT_PATH = path.join(CLIENT_PATH, 'init.js'),
  ASSETS_PATH = path.join(CLIENT_PATH, 'assets'),
  TEMPLATE_PATH = path.join(CLIENT_PATH, 'template');

let common = {
  ROOT_PATH,
  PUBLIC_PATH,
  MODULES_PATH,
  SOURCE_PATH,
  CLIENT_PATH,
  APP_CLIENT_PATH,
  ASSETS_PATH,
  TEMPLATE_PATH,
  isDev : process.env.NODE_ENV === 'development'
};

module.exports = _.merge(
  common,
  require('./' + process.env.NODE_ENV + '.js')(common)
);
