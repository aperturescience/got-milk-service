'use strict';

var hue        = require('node-hue-api');
var HueApi     = hue.HueApi;
var lightState = hue.lightState;

var lightId = '2',
    userId  = '58a6c323a7f27d73f68164e3bd9e403';

var _hue = module.exports = {};

var api;

_hue.connect = function() {

  hue.nupnpSearch(function(err, result) {
    if (err) throw err;

    var hostname = result[0].ipaddress,
    username = userId;

    api = new HueApi(hostname, username);

    // var state = lightState.create().on().white(500, 100);
    // api.setLightState(lightId, state, function(err, lights) {
    //   if (err) throw err;

    //   console.log('Set light state');
    // });
  });

_hue.setRed = function() {
  var state = lightState.create().on().bri(1).rgb(255, 0, 0);
  api.setLightState(lightId, state, function(err, lights) {
    if (err) throw err;

    console.log('Set to red');
  });
};

_hue.setYellow = function() {
  var state = lightState.create().on().bri(1).rgb(255, 255, 0);
  api.setLightState(lightId, state, function(err, lights) {
    if (err) throw err;

    console.log('Set to yellow');
  });
};

_hue.setGreen = function() {
  var state = lightState.create().on().bri(1).rgb(0, 255, 0);
  api.setLightState(lightId, state, function(err, lights) {
    if (err) throw err;

    console.log('Set to green');
  });
};

};