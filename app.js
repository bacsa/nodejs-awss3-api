// Config
const config = require('./config/config');
// Necessery modules
const express = require('express');
const bodyParser = require('body-parser');
// DB connections
const mongoConnection = require('./db/mongodb.connection');
// Routes
const apiroutes = require('./routes/api.route');
const frontendroutes = require('./routes/frontend.route');
const productroutes = require('./routes/product.route');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/', frontendroutes);
app.use('/api', apiroutes);
app.use('/products', productroutes);

app.listen(config.port, () => {
    console.log('Server is up and running on port ' + config.port);
});