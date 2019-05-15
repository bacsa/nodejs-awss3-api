const config = require('../config/config');
const mongoose = require('mongoose');

mongoose.connect(config.mongoDB, config.dbOptions);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));