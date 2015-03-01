'use strict';

var EventEmitter = require('events').EventEmitter;

var app = require('express')();

var port = process.env.PORT || 3001;

app.use(require('morgan')('dev'));
app.use(require('body-parser').json());

// eventemitter
global.emitter = new EventEmitter();

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', function(req, res) {
  res.status(200).send('Mooooo!');
});

app.get('/stream', require('./stream'));
app.post('/consumer', require('./consumer'));

var server = app.listen(port, function() {
  var host = server.address().address;
  console.log('started SSE server on http://%s:%s', host, port);
});
