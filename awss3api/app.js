// Config
const config = require('./config/config');
// Necessery modules
const express = require('express');
const bodyParser = require('body-parser');
// Logger
var logger = require('morgan');
// Routes
const apiroutes = require('./routes/api.route');

const app = express();
//don't show the log when it is test
if(config.environment !== 'testing') {
    //use morgan to log at command line
    app.use(logger('dev'));
}

app.get('/', (req, res) => {
  res.send('awss3api');
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api', apiroutes);

app.listen(config.port, () => {
    console.log('Server is up and running on port ' + config.port);
});
