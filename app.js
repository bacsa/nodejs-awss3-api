// Config
const config = require('./config/config');
// Necessery modules
const express = require('express');
const bodyParser = require('body-parser');
// Logger
var logger = require('morgan');
// DB connections
const mongoConnection = require('./db/mongodb.connection');
// Routes
const apiroutes = require('./routes/api.route');
const frontendroutes = require('./routes/frontend.route');
const productroutes = require('./routes/product.route');


const app = express();
app.use(logger('dev'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/', frontendroutes);
app.use('/api', apiroutes);
app.use('/products', productroutes);

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/



app.listen(config.port, () => {
    console.log('Server is up and running on port ' + config.port);
});