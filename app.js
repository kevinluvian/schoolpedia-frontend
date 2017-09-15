// get all required items
var express = require('express');
var engines = require('consolidate');
var bodyParser = require('body-parser');
var assert = require('assert');
var logger = require('morgan');
var path = require('path');
var port = process.env.PORT || 8080;
var serveIndex = require('serve-index')

var app = express();


// configure our server
app.use(logger('dev'));
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'src')));

app.use('/', serveIndex(__dirname + '/src'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port, function() {
    console.log('Server listening on port localhost:8080');
});