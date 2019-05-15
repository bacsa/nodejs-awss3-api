require('dotenv').config();

const config = require('./config.json');
const environment = process.env.NODE_ENV || 'development';

const dev_db_url = 'mongodb://' + config[environment].mdbOptions.dbUser + ':' + config[environment].mdbOptions.dbPass + '@' + config[environment].mdbOptions.dbHost + ':' + config[environment].mdbOptions.dbPort + '/' + config[environment].mdbOptions.dbName;

module.exports = {
  environment: process.env.NODE_ENV || environment,
  port: process.env.NODE_PORT || config[environment].node_port,
  dbUser: process.env.DB_USER || config[environment].dbUser,
  dbPass: process.env.DB_PASS || config[environment].dbPass,
  dbName: process.env.DB_NAME || config[environment].dbName,
  appName: process.env.APP_NAME || config[environment].app_name,
  dbOptions: process.env.DB_OPTIONS || config[environment].dbOptions,
  pgOptions: process.env.PG_OPTIONS || config[environment].pgOptions,
  mongoDB: process.env.MONGODB_URI || dev_db_url
};