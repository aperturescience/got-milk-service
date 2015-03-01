'use strict';

var hue = require('./lib/hue');
hue.connect();

module.exports = function(req, res) {
  var data = req.body;

  var weight = data.weight;

  if (weight > 0 && weight < 333) {
    hue.setRed();
  } else if (weight > 333 && weight < 666) {
    hue.setYellow();
  } else if (weight > 666 && weight <= 1000) {
    hue.setGreen();
  }

  global.emitter.emit('message', data);

  res.end();
};