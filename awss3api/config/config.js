require('dotenv').config();

const config = require('./config.json');
const environment = process.env.NODE_ENV || 'development';

module.exports = {
  environment: process.env.NODE_ENV || environment,
  api_url: process.env.API_URL || config[environment].api_url,
  port: process.env.NODE_PORT || config[environment].node_port,
  appName: process.env.APP_NAME || config[environment].app_name
};